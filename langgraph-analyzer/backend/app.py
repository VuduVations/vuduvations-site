# ============================================================================
# FILE 1: app.py
# ============================================================================
# Save this as: vuduvations-site/langgraph-analyzer/backend/app.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any, TypedDict, Annotated
import time
import json
import re
import os
from datetime import datetime, timezone
from operator import add
import anthropic
from openai import OpenAI
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class TranscriptRequest(BaseModel):
    transcript: str = Field(..., min_length=100)
    stream: Optional[bool] = Field(False)

class ClassificationResult(BaseModel):
    industry: str
    complexity: str
    deal_size_category: str
    urgency: str
    confidence: float
    key_topics: List[str]

class PainPoint(BaseModel):
    category: str
    title: str
    description: str
    impact: str
    evidence: List[str]
    estimated_cost: str

class Opportunity(BaseModel):
    type: str
    title: str
    description: str
    estimated_value: str
    timeframe: str
    requirements: List[str]

class Stakeholder(BaseModel):
    name: str
    role: str
    influence: str
    concerns: List[str]
    motivations: List[str]

class TechnicalRequirements(BaseModel):
    current_state: str
    gaps: List[str]
    must_haves: List[str]
    nice_to_haves: List[str]

class NextStep(BaseModel):
    action: str
    owner: str
    timeline: str
    priority: str

class RiskFactor(BaseModel):
    risk: str
    severity: str
    mitigation: str

class ProcessingMetadata(BaseModel):
    tiers_used: List[int]
    classification: ClassificationResult
    processing_time: Dict[str, float]
    cost_breakdown: Dict[str, float]
    total_cost: float
    total_time: float
    validation_score: float
    graph_path: List[str]
    timestamp: str

class DiscoveryResponse(BaseModel):
    company: str
    industry: str
    executive_summary: Dict[str, Any]
    pain_points: List[PainPoint]
    opportunities: List[Opportunity]
    stakeholders: List[Stakeholder]
    technical_requirements: TechnicalRequirements
    next_steps: List[NextStep]
    risk_factors: List[RiskFactor]
    metadata: ProcessingMetadata

# ============================================================================
# LANGGRAPH STATE
# ============================================================================

class AnalysisState(TypedDict):
    transcript: str
    classification: Optional[Dict]
    analysis: Optional[Dict]
    enhanced_analysis: Optional[Dict]
    tier3_attempted: bool
    tier3_success: bool
    tiers_used: Annotated[List[int], add]
    processing_time: Dict[str, float]
    cost_breakdown: Dict[str, float]
    graph_path: Annotated[List[str], add]
    errors: Annotated[List[str], add]
    validation_score: float
    timestamp: str

# ============================================================================
# API CLIENT INITIALIZATION
# ============================================================================

# Get API keys from environment variables
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

anthropic_client = None
openai_client = None

if ANTHROPIC_API_KEY:
    anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    print("✅ Anthropic client initialized")

if OPENAI_API_KEY:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    print("✅ OpenAI client initialized")

# ============================================================================
# TIER CONFIGURATION
# ============================================================================

TIER_CONFIG = {
    "tier1": {
        "model": "gpt-4o-mini",
        "cost_per_1k_input": 0.00015,
        "cost_per_1k_output": 0.0006,
        "max_tokens": 1000
    },
    "tier2": {
        "model": "gpt-4o-mini",
        "cost_per_1k_input": 0.00015,
        "cost_per_1k_output": 0.0006,
        "max_tokens": 4000
    },
    "tier3": {
        "model": "claude-3-5-sonnet-20241022",
        "cost_per_1k_input": 0.003,
        "cost_per_1k_output": 0.015,
        "max_tokens": 8000
    }
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def calculate_quality_score(analysis: Dict) -> float:
    """Calculate quality score with robust type checking"""
    score = 0.0
    checks = 6
    
    try:
        exec_summary = analysis.get("executive_summary", {})
        if isinstance(exec_summary, dict):
            overview = exec_summary.get("overview", "")
            if isinstance(overview, str) and len(overview) > 100:
                score += 1
    except: 
        pass
    
    try:
        pain_points = analysis.get("pain_points", [])
        if pain_points and isinstance(pain_points, list):
            total_len = 0
            count = 0
            for p in pain_points:
                if isinstance(p, dict):
                    desc = p.get("description", "")
                    if isinstance(desc, str):
                        total_len += len(desc)
                        count += 1
            if count > 0 and total_len / count > 150:
                score += 1
    except: 
        pass
    
    try:
        opportunities = analysis.get("opportunities", [])
        if opportunities and isinstance(opportunities, list):
            detailed = 0
            for o in opportunities:
                if isinstance(o, dict):
                    desc = o.get("description", "")
                    if isinstance(desc, str) and len(desc) > 100:
                        detailed += 1
            if detailed >= len(opportunities) * 0.7:
                score += 1
    except: 
        pass
    
    try:
        stakeholders = analysis.get("stakeholders", [])
        if stakeholders and isinstance(stakeholders, list):
            detailed = 0
            for s in stakeholders:
                if isinstance(s, dict):
                    concerns = s.get("concerns", [])
                    if isinstance(concerns, list) and len(concerns) > 0:
                        detailed += 1
            if detailed >= len(stakeholders) * 0.5:
                score += 1
    except: 
        pass
    
    try:
        next_steps = analysis.get("next_steps", [])
        if isinstance(next_steps, list) and len(next_steps) >= 3:
            score += 1
    except: 
        pass
    
    try:
        risks = analysis.get("risk_factors", [])
        if isinstance(risks, list) and len(risks) >= 2:
            score += 1
    except: 
        pass
    
    return round(score / checks, 2)

# ============================================================================
# LANGGRAPH NODES
# ============================================================================

def tier1_classify_node(state: AnalysisState) -> AnalysisState:
    """Tier 1: Fast classification with GPT-4o-mini"""
    print("🏷️  [TIER 1] Fast Classification (GPT-4o-mini)")
    start_time = time.time()
    
    prompt = f"""Classify this sales transcript. Return ONLY valid JSON with this exact structure:

{{"industry": "healthcare|finance|manufacturing|technology|retail|other", "complexity": "low|medium|high", "deal_size_category": "<$100K|$100K-$1M|$1M-$5M|$5M+", "urgency": "low|medium|high|critical", "confidence": 0.85, "key_topics": ["topic1", "topic2"]}}

Transcript: {state['transcript'][:2000]}"""
    
    try:
        response = openai_client.chat.completions.create(
            model=TIER_CONFIG["tier1"]["model"],
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=TIER_CONFIG["tier1"]["max_tokens"],
            response_format={"type": "json_object"}
        )
        
        classification = json.loads(response.choices[0].message.content)
        cost = (response.usage.prompt_tokens / 1000 * TIER_CONFIG["tier1"]["cost_per_1k_input"] + 
                response.usage.completion_tokens / 1000 * TIER_CONFIG["tier1"]["cost_per_1k_output"])
        elapsed = time.time() - start_time
        
        print(f"   ✓ Industry: {classification['industry']}, Complexity: {classification['complexity']}")
        print(f"   ✓ Time: {elapsed:.2f}s | Cost: ${cost:.4f}\n")
        
        return {
            "classification": classification,
            "tiers_used": [1],
            "processing_time": {"tier1_classification": round(elapsed, 2)},
            "cost_breakdown": {"tier1": round(cost, 4)},
            "graph_path": ["tier1_classify"],
            "errors": [],
            "tier3_attempted": False,
            "tier3_success": False
        }
        
    except Exception as e:
        print(f"   ✗ Error: {str(e)}\n")
        return {"errors": [f"Tier 1 error: {str(e)}"]}

def tier2_analyze_node(state: AnalysisState) -> AnalysisState:
    """Tier 2: Main analysis with GPT-4o-mini"""
    print("📊 [TIER 2] Main Analysis (GPT-4o-mini)")
    start_time = time.time()
    
    classification = state['classification']
    
    prompt = f"""You are an expert sales consultant. Analyze this transcript.

Industry: {classification['industry']}, Complexity: {classification['complexity']}
Transcript: {state['transcript']}

Return EXACT JSON:
{{"company": "Company Name", "industry": "{classification['industry']}", "executive_summary": {{"overview": "2-3 sentence overview", "critical_findings": ["finding1", "finding2"], "recommended_approach": "Strategic recommendation"}}, "pain_points": [{{"category": "Operational", "title": "Pain point title", "description": "Detailed description", "impact": "high", "evidence": ["quote"], "estimated_cost": "Cost if not addressed"}}], "opportunities": [{{"type": "Quick Win", "title": "Opportunity title", "description": "What this enables", "estimated_value": "Potential value", "timeframe": "Timeline", "requirements": ["req1"]}}], "stakeholders": [{{"name": "Name", "role": "Title", "influence": "high", "concerns": ["concern1"], "motivations": ["motivation1"]}}], "technical_requirements": {{"current_state": "Description", "gaps": ["gap1"], "must_haves": ["requirement1"], "nice_to_haves": ["feature1"]}}, "next_steps": [{{"action": "Action to take", "owner": "Who", "timeline": "When", "priority": "high"}}], "risk_factors": [{{"risk": "Risk description", "severity": "high", "mitigation": "How to address"}}]}}"""
    
    try:
        response = openai_client.chat.completions.create(
            model=TIER_CONFIG["tier2"]["model"],
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=TIER_CONFIG["tier2"]["max_tokens"],
            response_format={"type": "json_object"}
        )
        
        analysis = json.loads(response.choices[0].message.content)
        cost = (response.usage.prompt_tokens / 1000 * TIER_CONFIG["tier2"]["cost_per_1k_input"] + 
                response.usage.completion_tokens / 1000 * TIER_CONFIG["tier2"]["cost_per_1k_output"])
        elapsed = time.time() - start_time
        quality_score = calculate_quality_score(analysis)
        
        print(f"   ✓ Company: {analysis['company']}, Pain Points: {len(analysis['pain_points'])}")
        print(f"   ✓ Quality: {quality_score:.2f} | Time: {elapsed:.2f}s | Cost: ${cost:.4f}\n")
        
        return {
            "analysis": analysis,
            "tiers_used": [2],
            "processing_time": {"tier2_analysis": round(elapsed, 2)},
            "cost_breakdown": {"tier2": round(cost, 4)},
            "validation_score": quality_score,
            "graph_path": ["tier2_analyze"],
            "errors": []
        }
        
    except Exception as e:
        print(f"   ✗ Error: {str(e)}\n")
        return {"errors": [f"Tier 2 error: {str(e)}"]}

def tier3_enhance_node(state: AnalysisState) -> AnalysisState:
    """Tier 3: Claude deep enhancement with robust JSON extraction"""
    print("🧠 [TIER 3] Deep Enhancement (Claude 3.5 Sonnet)")
    start_time = time.time()
    
    try:
        tier2_result = state["analysis"]
        
        prompt = f"""You are a JSON-only response system. Return ONLY valid JSON, no other text.

Enhance this sales analysis with deeper insights. Return this EXACT structure:

{{
  "company": "string",
  "industry": "string",
  "executive_summary": {{"overview": "...", "critical_findings": [...], "recommended_approach": "..."}},
  "pain_points": [{{"category": "...", "title": "...", "description": "...", "impact": "...", "evidence": [...], "estimated_cost": "..."}}],
  "opportunities": [{{"type": "...", "title": "...", "description": "...", "estimated_value": "...", "timeframe": "...", "requirements": [...]}}],
  "stakeholders": [{{"name": "...", "role": "...", "influence": "...", "concerns": [...], "motivations": [...]}}],
  "technical_requirements": {{"current_state": "...", "gaps": [...], "must_haves": [...], "nice_to_haves": [...]}},
  "next_steps": [{{"action": "...", "owner": "...", "timeline": "...", "priority": "..."}}],
  "risk_factors": [{{"risk": "...", "severity": "...", "mitigation": "..."}}]
}}

Previous analysis:
{json.dumps(tier2_result, indent=2)}

CRITICAL: Return ONLY the JSON object. No markdown, no explanation, no ```json``` blocks."""

        response = anthropic_client.messages.create(
            model=TIER_CONFIG["tier3"]["model"],
            max_tokens=TIER_CONFIG["tier3"]["max_tokens"],
            temperature=0.1,
            messages=[{"role": "user", "content": prompt}]
        )
        
        enhanced_text = response.content[0].text.strip()
        
        # Multi-stage JSON extraction
        try:
            enhanced_result = json.loads(enhanced_text)
        except json.JSONDecodeError:
            if "```json" in enhanced_text:
                start = enhanced_text.find("```json") + 7
                end = enhanced_text.find("```", start)
                enhanced_text = enhanced_text[start:end].strip()
            elif "```" in enhanced_text:
                start = enhanced_text.find("```") + 3
                end = enhanced_text.find("```", start)
                enhanced_text = enhanced_text[start:end].strip()
            
            start_idx = enhanced_text.find('{')
            end_idx = enhanced_text.rfind('}')
            if start_idx != -1 and end_idx != -1:
                enhanced_text = enhanced_text[start_idx:end_idx+1]
            
            enhanced_text = enhanced_text.replace('\n', ' ')
            enhanced_text = re.sub(r',(\s*[}\]])', r'\1', enhanced_text)
            
            enhanced_result = json.loads(enhanced_text)
        
        required_fields = ["company", "industry", "pain_points", "opportunities"]
        if not all(field in enhanced_result for field in required_fields):
            raise ValueError(f"Missing required fields in Claude response")
        
        cost = (response.usage.input_tokens / 1000 * TIER_CONFIG["tier3"]["cost_per_1k_input"] + 
                response.usage.output_tokens / 1000 * TIER_CONFIG["tier3"]["cost_per_1k_output"])
        elapsed = time.time() - start_time
        quality_score = calculate_quality_score(enhanced_result)
        
        print(f"   ✓ Enhanced analysis complete")
        print(f"   ✓ Quality: {quality_score:.2f} | Time: {elapsed:.2f}s | Cost: ${cost:.4f}\n")
        
        return {
            "enhanced_analysis": enhanced_result,
            "tier3_success": True,
            "tier3_attempted": True,
            "tiers_used": [3],
            "processing_time": {"tier3_enhancement": round(elapsed, 2)},
            "cost_breakdown": {"tier3": round(cost, 4)},
            "validation_score": quality_score,
            "graph_path": ["tier3_enhance"],
            "errors": []
        }
        
    except Exception as e:
        print(f"   ⚠️ Tier 3 enhancement failed: {str(e)}")
        print(f"   → Falling back to Tier 2 results\n")
        return {
            "enhanced_analysis": None,
            "tier3_success": False,
            "tier3_attempted": True,
            "errors": [f"Tier 3 error: {str(e)}"]
        }

# ============================================================================
# CONDITIONAL ROUTING
# ============================================================================

def should_enhance(state: AnalysisState) -> str:
    """Conditional routing with loop prevention"""
    
    if state.get("tier3_attempted", False):
        return "end"
    
    classification = state['classification']
    quality_score = state.get('validation_score', 1.0)
    triggers = []
    
    if classification.get('complexity') == "high":
        triggers.append("high_complexity")
    if classification.get('deal_size_category') == "$5M+":
        triggers.append("large_deal")
    if classification.get('urgency') == "critical":
        triggers.append("critical_urgency")
    if quality_score < 0.85:
        triggers.append("quality_enhancement_needed")
    if classification.get('industry') in ["healthcare", "finance"]:
        triggers.append("high_value_industry")
    
    if len(triggers) >= 2:
        print(f"🎯 [DECISION] TIER 3 TRIGGERED: {', '.join(triggers)}\n")
        return "enhance"
    
    print(f"✓ [DECISION] Tier 2 sufficient (score: {quality_score:.2f})\n")
    return "end"

# ============================================================================
# BUILD LANGGRAPH WORKFLOW
# ============================================================================

workflow = StateGraph(AnalysisState)

workflow.add_node("tier1_classify", tier1_classify_node)
workflow.add_node("tier2_analyze", tier2_analyze_node)
workflow.add_node("tier3_enhance", tier3_enhance_node)

workflow.add_edge("tier1_classify", "tier2_analyze")
workflow.add_conditional_edges(
    "tier2_analyze",
    should_enhance,
    {
        "enhance": "tier3_enhance",
        "end": END
    }
)
workflow.add_edge("tier3_enhance", END)

workflow.set_entry_point("tier1_classify")

analysis_graph = workflow.compile(checkpointer=MemorySaver())

print("✅ LangGraph compiled!")

# ============================================================================
# GRAPH EXECUTION
# ============================================================================

def run_analysis_graph(transcript: str) -> DiscoveryResponse:
    """Execute LangGraph workflow and return formatted response"""
    print(f"\n{'='*60}\n🚀 STARTING LANGGRAPH ANALYSIS\n{'='*60}\n")
    
    initial_state = {
        "transcript": transcript,
        "classification": None,
        "analysis": None,
        "enhanced_analysis": None,
        "tier3_attempted": False,
        "tier3_success": False,
        "tiers_used": [],
        "processing_time": {},
        "cost_breakdown": {},
        "graph_path": [],
        "errors": [],
        "validation_score": 0.0,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    
    final_state = analysis_graph.invoke(
        initial_state,
        {"configurable": {"thread_id": "1"}}
    )
    
    analysis = final_state.get('enhanced_analysis') or final_state.get('analysis')
    classification = final_state.get('classification')
    
    if analysis:
        analysis.setdefault('company', 'Unknown Company')
        analysis.setdefault('industry', classification.get('industry', 'unknown'))
        analysis.setdefault('executive_summary', {
            'overview': '',
            'critical_findings': [],
            'recommended_approach': ''
        })
        analysis.setdefault('pain_points', [])
        analysis.setdefault('opportunities', [])
        analysis.setdefault('stakeholders', [])
        analysis.setdefault('technical_requirements', {
            'current_state': '',
            'gaps': [],
            'must_haves': [],
            'nice_to_haves': []
        })
        analysis.setdefault('next_steps', [])
        analysis.setdefault('risk_factors', [])
    
    total_cost = sum(final_state['cost_breakdown'].values())
    total_time = sum(final_state['processing_time'].values())
    
    print(f"\n{'='*60}\n✅ COMPLETE\n{'='*60}")
    print(f"Path: {' → '.join(final_state['graph_path'])}")
    print(f"Tiers: {final_state['tiers_used']}")
    print(f"Time: {total_time:.2f}s | Cost: ${total_cost:.4f}")
    print(f"{'='*60}\n")
    
    return DiscoveryResponse(
        company=analysis['company'],
        industry=analysis['industry'],
        executive_summary=analysis['executive_summary'],
        pain_points=[PainPoint(**p) for p in analysis['pain_points']],
        opportunities=[Opportunity(**o) for o in analysis['opportunities']],
        stakeholders=[Stakeholder(**s) for s in analysis['stakeholders']],
        technical_requirements=TechnicalRequirements(**analysis['technical_requirements']),
        next_steps=[NextStep(**n) for n in analysis['next_steps']],
        risk_factors=[RiskFactor(**r) for r in analysis['risk_factors']],
        metadata=ProcessingMetadata(
            tiers_used=final_state['tiers_used'],
            classification=ClassificationResult(**classification),
            processing_time=final_state['processing_time'],
            cost_breakdown=final_state['cost_breakdown'],
            total_cost=total_cost,
            total_time=total_time,
            validation_score=final_state['validation_score'],
            graph_path=final_state['graph_path'],
            timestamp=final_state['timestamp']
        )
    )

# ============================================================================
# FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="LangGraph Multi-Tier Analysis API",
    description="Sales transcript analysis with observable graph execution",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Multi-Tier Analysis API (LangGraph)",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/analyze")
async def analyze_transcript(request: TranscriptRequest):
    """Analyze sales transcript using LangGraph"""
    print(f"\n{'='*60}\n📥 NEW REQUEST\n{'='*60}")
    print(f"Length: {len(request.transcript)} chars\n{'='*60}\n")
    
    try:
        if len(request.transcript) < 100:
            raise HTTPException(status_code=400, detail="Transcript too short")
        
        return run_analysis_graph(request.transcript)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}\n")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/graph")
async def get_graph_info():
    """Get graph structure information"""
    return {
        "nodes": ["tier1_classify", "tier2_analyze", "tier3_enhance"],
        "edges": [
            "START → tier1_classify",
            "tier1_classify → tier2_analyze",
            "tier2_analyze → [conditional]",
            "  ├─ enhance → tier3_enhance → END",
            "  └─ end → END"
        ],
        "decision_points": {
            "should_enhance": {
                "triggers": [
                    "high_complexity",
                    "large_deal ($5M+)",
                    "critical_urgency",
                    "quality_enhancement_needed (<0.85)",
                    "high_value_industry (healthcare/finance)"
                ],
                "threshold": "2 or more triggers required"
            }
        }
    }

@app.get("/api/status")
async def get_status():
    """System status check"""
    return {
        "status": "operational",
        "framework": "LangGraph",
        "tiers": {
            "tier1": {"ready": openai_client is not None},
            "tier2": {"ready": openai_client is not None},
            "tier3": {"ready": anthropic_client is not None}
        }
    }

print("✅ FastAPI application initialized")
