// src/app/reflexion-itil/demo/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import ContactModal from '@/components/ContactModal'; 
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, DollarSign, Users, Activity, Shield, XCircle, ChevronDown, ChevronUp, FileText, Download, Copy, Play, Server, Database, Globe, Zap, Award, TrendingDown, RefreshCw } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Import demo data
import dbMigrationData from '../../../data/demos/reflexion-db-migration.json';
import costOptimizationData from '../../../data/demos/reflexion-cost-optimization.json';
import securityPatchData from '../../../data/demos/reflexion-security-patch.json';

// Reflexion ITIL Footer Configuration
const reflexionFooterConfig = {
  name: "Reflexion ITIL",
  icon: RefreshCw,
  tagline: "AI-powered RFC analysis that thinks, reflects, and perfects your change requests.",
  color: "purple",
  trademark: "Reflexion ITIL",
  subtitle: "Iterative AI intelligence. ITIL compliance. Zero manual analysis.",
  links: {
    product: [
      { label: "Overview", href: "/reflexion-itil" },
      { label: "Features", href: "/reflexion-itil#features" },
      { label: "How It Works", href: "/reflexion-itil#how-it-works" },
      { label: "Live Demo", href: "/reflexion-itil/demo" }
    ],
    resources: [
      { label: "Documentation", href: "/reflexion-itil/docs" },
      { label: "Sample RFCs", href: "/reflexion-itil/demo#samples" },
      { label: "Use Cases", href: "/reflexion-itil#use-cases" },
      { label: "Screenshots", href: "/reflexion-itil#screenshots" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function ReflexionITILPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [messages, setMessages] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedRFC, setExpandedRFC] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRFC, setSelectedRFC] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [showRFCStats, setShowRFCStats] = useState(false);

  // Sample RFCs with data from JSON
  const sampleRFCs = [
    {
      name: dbMigrationData.rfc_name,
      category: dbMigrationData.rfc_metadata.category,
      description: "Upgrade production database cluster from PostgreSQL 14.8 to 16.2 for 150 microservices",
      details: dbMigrationData.rfc_metadata,
      data: dbMigrationData
    },
    {
      name: costOptimizationData.rfc_name,
      category: costOptimizationData.rfc_metadata.category,
      description: "Implement intelligent auto-scaling across 3 AWS regions to reduce cloud spend by $2.1M annually",
      details: costOptimizationData.rfc_metadata,
      data: costOptimizationData
    },
    {
      name: securityPatchData.rfc_name,
      category: securityPatchData.rfc_metadata.category,
      description: "Emergency patch for Log4Shell (CVE-2021-44228) affecting 340 Java-based production services",
      details: securityPatchData.rfc_metadata,
      data: securityPatchData
    }
  ];

  const reflexionBenefits = [
    { 
      text: "Self-improving RFC analysis with quantitative 10/10 quality scoring",
      icon: <BarChart3 className="w-5 h-5 text-pink-400" />
    },
    { 
      text: "Multi-agent critique system that iteratively refines documentation",
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />
    },
    { 
      text: "Executive dashboards with CAB approval probability metrics",
      icon: <Shield className="w-5 h-5 text-cyan-400" />
    },
    { 
      text: "Continuous improvement automation for change management excellence",
      icon: <Target className="w-5 h-5 text-pink-300" />
    }
  ];

  const loadSampleRFC = (sample) => {
    setSelectedRFC(sample);
    setIterations([]);
    setMessages([]);
    setExpandedSections({});
    setShowRFCStats(true); // Show stats when RFC is selected
  };

  // Get simulated data from JSON files
  const getSimulatedData = (rfcName) => {
    const dataByRFC = {
      [dbMigrationData.rfc_name]: dbMigrationData.iterations,
      [costOptimizationData.rfc_name]: costOptimizationData.iterations,
      [securityPatchData.rfc_name]: securityPatchData.iterations
    };
    
    return dataByRFC[rfcName] || dbMigrationData.iterations;
  };

  const runReflexion = async () => {
    if (!selectedRFC) {
      alert('Please select an RFC scenario first');
      return;
    }

    setIsProcessing(true);
    setMessages([]);
    setIterations([]);
    setProgress(0);
    setCurrentPhase('Initializing...');
    setExpandedRFC({});
    setExpandedSections({});

    const simulatedIterations = getSimulatedData(selectedRFC.name);

    const phases = [
      { phase: 'Initializing', time: 2, message: 'Initializing Reflexion multi-agent system...' },
      { phase: 'Analyzing', time: 8, message: 'Agent 1: Analyzing RFC structure and completeness...' },
      { phase: 'Evaluating', time: 15, message: 'Agent 2: Evaluating ITIL compliance and risk factors...' },
      { phase: 'Scoring', time: 22, message: 'Agent 3: Generating quality scores and metrics...' },
      { phase: 'Iteration 1', time: 28, message: 'Iteration 1 complete - Identifying improvements...' },
      { phase: 'Critiquing', time: 35, message: 'Critic Agent: Analyzing gaps and suggesting refinements...' },
      { phase: 'Refining', time: 42, message: 'Refining documentation based on critique...' },
      { phase: 'Iteration 2', time: 50, message: 'Iteration 2 complete - Validating improvements...' },
      { phase: 'Optimizing', time: 58, message: 'Final optimization pass...' },
      { phase: 'Validating', time: 66, message: 'Validating all ITIL requirements...' },
      { phase: 'Finalizing', time: 72, message: 'Generating executive summary and recommendations...' },
      { phase: 'Iteration 3', time: 80, message: 'Iteration 3 complete - Final quality checks...' },
      { phase: 'Complete', time: 85, message: 'Analysis complete! All iterations processed successfully.' }
    ];

    try {
      for (let i = 0; i < phases.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 2500));
        
        const phase = phases[i];
        setCurrentPhase(phase.phase);
        setMessages(prev => [...prev, { message: phase.message, time: phase.time, phase: phase.phase }]);
        setProgress((phase.time / 85) * 100);

        if (phase.phase === 'Iteration 1') {
          setIterations([simulatedIterations[0]]);
        } else if (phase.phase === 'Iteration 2') {
          setIterations([simulatedIterations[0], simulatedIterations[1]]);
        } else if (phase.phase === 'Iteration 3') {
          setIterations(simulatedIterations);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { message: 'Error occurred', time: Date.now() }]);
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const toggleRFC = (idx) => {
    setExpandedRFC(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const downloadRFC = (iteration) => {
    const content = generateFinalRFCDocument(iteration);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RFC-Iteration-${iteration.iteration}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyRFCToClipboard = (iteration) => {
    const content = generateFinalRFCDocument(iteration);
    navigator.clipboard.writeText(content);
    alert('RFC copied to clipboard!');
  };

  const generateFinalRFCDocument = (iteration) => {
    const isIteration3 = iteration.iteration === 3;
    
    return `# REQUEST FOR CHANGE (RFC) - ${isIteration3 ? 'FINAL APPROVED VERSION' : `Iteration ${iteration.iteration}`}
${isIteration3 ? '## PRODUCTION READY - CAB APPROVED' : ''}

**RFC ID:** ${selectedRFC?.details?.rfc_id || 'N/A'}  
**Title:** ${selectedRFC?.details?.title || 'N/A'}  
**Category:** ${selectedRFC?.category}  
**Iteration:** ${iteration.iteration}  
**Timestamp:** ${iteration.timestamp}  
**CAB Approval Probability:** ${(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%

---

## EXECUTIVE SUMMARY

**Recommendation:** ${iteration.executive_summary.recommendation}  
**Deployment Risk:** ${iteration.executive_summary.deployment_risk}  
**Business Impact:** ${iteration.executive_summary.business_impact}  
**Estimated ROI:** ${iteration.executive_summary.estimated_roi}

${iteration.executive_summary.key_concerns && iteration.executive_summary.key_concerns.length > 0 ? `
### Key Concerns
${iteration.executive_summary.key_concerns.map((concern, i) => `${i + 1}. ${concern}`).join('\n')}
` : '### No Outstanding Concerns'}

---

## QUALITY METRICS

| Metric | Score | Status |
|--------|-------|--------|
| Overall Quality | ${iteration.scores.overall_quality}/10 | ${iteration.scores.overall_quality >= 9 ? '🟢 EXCELLENT' : iteration.scores.overall_quality >= 7 ? '🟡 GOOD' : '🔴 NEEDS WORK'} |
| ITIL Compliance | ${iteration.scores.itil_compliance}/10 | ${iteration.scores.itil_compliance >= 9 ? '🟢 EXCELLENT' : iteration.scores.itil_compliance >= 7 ? '🟡 GOOD' : '🔴 NEEDS WORK'} |
| Risk Level | ${iteration.scores.risk_level}/10 | ${iteration.scores.risk_level <= 3 ? '🟢 LOW' : iteration.scores.risk_level <= 6 ? '🟡 MEDIUM' : '🔴 HIGH'} |
| Business Value | ${iteration.scores.business_value}/10 | ${iteration.scores.business_value >= 9 ? '🟢 EXCELLENT' : iteration.scores.business_value >= 7 ? '🟡 GOOD' : '🔴 NEEDS WORK'} |
| Technical Readiness | ${iteration.scores.technical_readiness}/10 | ${iteration.scores.technical_readiness >= 9 ? '🟢 EXCELLENT' : iteration.scores.technical_readiness >= 7 ? '🟡 GOOD' : '🔴 NEEDS WORK'} |
| Stakeholder Confidence | ${iteration.scores.stakeholder_confidence}/10 | ${iteration.scores.stakeholder_confidence >= 9 ? '🟢 EXCELLENT' : iteration.scores.stakeholder_confidence >= 7 ? '🟡 GOOD' : '🔴 NEEDS WORK'} |

---

## CHANGE CATEGORIES ASSESSMENT

${iteration.change_categories ? `
| Category | Score | Status |
|----------|-------|--------|
| Technical | ${iteration.change_categories.technical.score}/10 | ${iteration.change_categories.technical.status} |
| Procedural | ${iteration.change_categories.procedural.score}/10 | ${iteration.change_categories.procedural.status} |
| Compliance | ${iteration.change_categories.compliance.score}/10 | ${iteration.change_categories.compliance.status} |
| Communication | ${iteration.change_categories.communication.score}/10 | ${iteration.change_categories.communication.status} |
` : 'Not available'}

---

## RFC DETAILS

### Objective
${iteration.rfc_summary.objective}

### Business Justification
${iteration.rfc_summary.business_justification}

### Technical Approach
${iteration.rfc_summary.technical_approach}

### Timeline
${iteration.rfc_summary.timeline}

### Rollback Plan
${iteration.rfc_summary.rollback_plan_status}

### Testing Status
${iteration.rfc_summary.testing_status}

### Impact Assessment
${iteration.rfc_summary.impact}

---

## INFRASTRUCTURE DETAILS

### Configuration Items
**Total CI Count:** ${selectedRFC?.details?.ci_count || 'N/A'}

${selectedRFC?.details?.affected_services ? `
### Affected Services
${selectedRFC.details.affected_services.map((service, i) => `${i + 1}. ${service}`).join('\n')}
` : ''}

${selectedRFC?.details?.cmdb_items && selectedRFC.details.cmdb_items.length > 0 ? `
### CMDB Items (${selectedRFC.details.cmdb_items.length} total)
${selectedRFC.details.cmdb_items.slice(0, 15).map((item, i) => `${i + 1}. ${item}`).join('\n')}
${selectedRFC.details.cmdb_items.length > 15 ? `\n... and ${selectedRFC.details.cmdb_items.length - 15} more items` : ''}
` : ''}

### Financial Details
**Estimated Implementation Cost:** ${selectedRFC?.details?.estimated_cost || 'N/A'}  
**Business Value:** ${selectedRFC?.details?.business_value || 'N/A'}

---

## RISK ANALYSIS

${selectedRFC?.details?.risk_factors && selectedRFC.details.risk_factors.length > 0 ? `
### Identified Risk Factors
${selectedRFC.details.risk_factors.map((risk, i) => `${i + 1}. ${risk}`).join('\n')}
` : 'No significant risks identified'}

---

${iteration.critical_issues && iteration.critical_issues.length > 0 ? `
## CRITICAL ISSUES (${iteration.critical_issues.length})

${iteration.critical_issues.map((issue, i) => `
### Issue ${i + 1}: ${issue.issue}
- **Category:** ${issue.category}
- **Severity:** ${issue.severity}
- **Priority:** ${issue.priority}
- **Impact:** ${issue.impact}
- **Recommended Action:** ${issue.recommended_action}
${issue.current_state ? `- **Current State:** ${issue.current_state}` : ''}
${issue.desired_state ? `- **Desired State:** ${issue.desired_state}` : ''}
`).join('\n')}
` : '## NO CRITICAL ISSUES'}

---

${iteration.improvements && iteration.improvements.length > 0 ? `
## RECOMMENDED IMPROVEMENTS (${iteration.improvements.length})

${iteration.improvements.map((imp, i) => `
### ${i + 1}. ${imp.action}
- **Priority:** ${imp.priority}
- **Estimated Impact:** ${imp.estimated_impact}
- **Effort Required:** ${imp.effort_hours} hours
`).join('\n')}
` : '## NO IMPROVEMENTS NEEDED - RFC IS PRODUCTION READY'}

---

## PROCESSING METADATA

- **Processing Time:** ${iteration.processing_time} seconds
- **Tokens Used:** ${iteration.tokens_used?.toLocaleString() || 'N/A'}
- **Analysis Timestamp:** ${iteration.timestamp}
- **Iteration:** ${iteration.iteration} of 3

---

${isIteration3 ? `
## FINAL APPROVAL STATUS

This RFC has completed all 3 iterations of reflexive analysis and is approved for production deployment.

**Next Steps:**
1. Obtain final CAB sign-off (${(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}% probability)
2. Schedule deployment window
3. Brief all stakeholders
4. Execute deployment plan
5. Monitor and validate results

**Approval Signatures Required:**
- [ ] Change Advisory Board (CAB) Chair
- [ ] Technical Lead
- [ ] Business Owner
- [ ] Security Team
- [ ] Operations Manager

---

*Generated by VuduVations Reflexion ITIL Agent*  
*Quality Score: ${iteration.scores.overall_quality}/10*  
*CAB Approval Probability: ${(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%*
` : `
## NEXT ITERATION

This RFC will undergo ${iteration.iteration === 1 ? 'two more' : 'one more'} iteration${iteration.iteration === 1 ? 's' : ''} of reflexive analysis to achieve production readiness.

---

*Generated by VuduVations Reflexion ITIL Agent*  
*Iteration ${iteration.iteration} of 3*
`}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <UniversalHeader />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <Link href="/reflexion-itil" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2 mb-6">
              ← Back to Reflexion ITIL
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Reflexion ITIL Agent
              </h1>
            </div>
            
            <p className="text-xl text-slate-300 mb-6">
              Self-improving RFC analysis with iterative AI refinement. Watch quality scores improve from ~7/10 to 9+/10 through automated critique and enhancement cycles.
            </p>

            {/* Info Banner */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-start gap-3">
                <Activity className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">LangGraph Multi-Agent System</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This tool demonstrates <strong>reflexive AI</strong> - a pattern where AI agents critique and improve their own output through multiple iterations. Each RFC undergoes 3 cycles of analysis, scoring, critique, and refinement, with quality metrics improving at each stage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Choose an RFC Scenario</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleRFCs.map((rfc, idx) => (
                <button
                  key={idx}
                  onClick={() => loadSampleRFC(rfc)}
                  className={`text-left p-6 rounded-lg border-2 transition-all ${
                    selectedRFC?.name === rfc.name
                      ? 'bg-purple-500/20 border-purple-400'
                      : 'bg-white/5 border-white/10 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {idx === 0 && <Database className="w-6 h-6 text-blue-400 flex-shrink-0" />}
                    {idx === 1 && <DollarSign className="w-6 h-6 text-green-400 flex-shrink-0" />}
                    {idx === 2 && <Shield className="w-6 h-6 text-red-400 flex-shrink-0" />}
                    <div>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">
                        {rfc.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{rfc.name}</h3>
                  <p className="text-sm text-slate-300 line-clamp-2">{rfc.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* RFC Stats Dropdown - Shows when RFC is selected */}
          {selectedRFC && showRFCStats && (
            <div className="mb-8">
              <button
                onClick={() => setShowRFCStats(!showRFCStats)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/15 p-4 rounded-lg border border-purple-400/30 transition-all flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-semibold text-lg">RFC Overview & Statistics</span>
                </div>
                {showRFCStats ? 
                  <ChevronUp className="w-5 h-5 text-purple-400" /> : 
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                }
              </button>

              {showRFCStats && (
                <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 rounded-lg p-6 border border-purple-400/30 space-y-6">
                  
                  {/* Header Info */}
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedRFC.details.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="font-medium">{selectedRFC.details.rfc_id}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Server className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium">{selectedRFC.details.ci_count} Configuration Items</span>
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">
                        {selectedRFC.category}
                      </span>
                    </div>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Implementation Cost */}
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                        <span className="text-xs text-yellow-400 uppercase tracking-wide font-semibold">Implementation Cost</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {selectedRFC.details.estimated_cost}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-blue-400 uppercase tracking-wide font-semibold">Timeline</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {selectedRFC.details.timeline}
                      </div>
                    </div>

                    {/* Affected Services */}
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-wide font-semibold">Affected Services</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {selectedRFC.details.affected_services?.length || 0}
                      </div>
                      <div className="text-xs text-cyan-300 mt-1 font-medium">Critical systems</div>
                    </div>

                    {/* Risk Factors */}
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-xs text-red-400 uppercase tracking-wide font-semibold">Risk Factors</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {selectedRFC.details.risk_factors?.length || 0}
                      </div>
                      <div className="text-xs text-red-300 mt-1 font-medium">Identified risks</div>
                    </div>
                  </div>

                  {/* Business Value */}
                  <div className="bg-black/30 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-slate-300 font-semibold">Business Value & Impact</span>
                    </div>
                    <p className="text-sm text-green-300 leading-relaxed">
                      {selectedRFC.details.business_value}
                    </p>
                  </div>

                  {/* Affected Services List */}
                  {selectedRFC.details.affected_services && selectedRFC.details.affected_services.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Server className="w-4 h-4 text-purple-400" />
                        Affected Services ({selectedRFC.details.affected_services.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedRFC.details.affected_services.slice(0, 8).map((service, i) => (
                          <div key={i} className="bg-black/30 px-3 py-2 rounded text-sm text-slate-200 font-medium flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-purple-400 flex-shrink-0" />
                            {service}
                          </div>
                        ))}
                      </div>
                      {selectedRFC.details.affected_services.length > 8 && (
                        <p className="text-xs text-purple-300 mt-2 font-medium">
                          ... and {selectedRFC.details.affected_services.length - 8} more services
                        </p>
                      )}
                    </div>
                  )}

                  {/* Risk Factors Preview */}
                  {selectedRFC.details.risk_factors && selectedRFC.details.risk_factors.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        Key Risk Factors ({selectedRFC.details.risk_factors.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedRFC.details.risk_factors.slice(0, 3).map((risk, i) => (
                          <div key={i} className="bg-black/30 p-3 rounded-lg border-l-2 border-red-500 text-sm text-slate-200 font-medium">
                            {risk}
                          </div>
                        ))}
                      </div>
                      {selectedRFC.details.risk_factors.length > 3 && (
                        <p className="text-xs text-red-300 mt-2 font-medium">
                          ... and {selectedRFC.details.risk_factors.length - 3} more risk factors
                        </p>
                      )}
                    </div>
                  )}

                  {/* Testing Status */}
                  <div className="bg-black/30 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-slate-300 font-semibold">Testing & Validation Status</span>
                    </div>
                    <p className="text-sm text-blue-300 leading-relaxed">
                      {selectedRFC.details.testing_completed}
                    </p>
                  </div>

                  {/* Rollback Plan */}
                  <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-slate-300 font-semibold">Rollback Plan</span>
                    </div>
                    <p className="text-sm text-yellow-300 leading-relaxed">
                      {selectedRFC.details.rollback_plan}
                    </p>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* Run Analysis Button */}
          {selectedRFC && (
            <div className="mb-8">
              <button
                onClick={runReflexion}
                disabled={isProcessing}
                className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                  isProcessing
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
                }`}
              >
                <Play className="w-5 h-5" />
                {isProcessing ? 'Processing...' : 'Run Reflexion Analysis'}
              </button>
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{currentPhase}</span>
                  <span className="text-cyan-400 font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-xs text-slate-500 mt-0.5">{msg.time}s</span>
                    <span>{msg.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {iterations.length > 0 && (
            <div className="space-y-8">
              {/* Progress Overview */}
              <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-purple-400/30 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                    <h3 className="text-2xl font-bold text-white">Quality Improvement Progress</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Quality Gain</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      +{(iterations[iterations.length - 1]?.scores.overall_quality - iterations[0]?.scores.overall_quality).toFixed(1)}
                    </div>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart 
                    data={iterations.map(it => ({
                      iteration: `Iteration ${it.iteration}`,
                      iterationNum: it.iteration,
                      'Overall Quality': it.scores.overall_quality,
                      'ITIL Compliance': it.scores.itil_compliance,
                      'Technical Readiness': it.scores.technical_readiness,
                      'Stakeholder Confidence': it.scores.stakeholder_confidence,
                      'Risk Control': 10 - it.scores.risk_level
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorITIL" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorStakeholder" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis 
                      dataKey="iteration" 
                      stroke="#94a3b8" 
                      tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 500 }}
                      tickLine={{ stroke: '#475569' }}
                    />
                    <YAxis 
                      domain={[0, 10]} 
                      stroke="#94a3b8" 
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      tickLine={{ stroke: '#475569' }}
                      label={{ value: 'Score (0-10)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        padding: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      labelStyle={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '8px' }}
                      itemStyle={{ color: '#cbd5e1', padding: '4px 0' }}
                      formatter={(value, name, props) => {
                        const prevIteration = iterations[props.payload.iterationNum - 2];
                        const delta = prevIteration ? (value - prevIteration.scores[name.replace(' ', '_').toLowerCase().replace('quality', 'overall_quality').replace('compliance', 'itil_compliance').replace('readiness', 'technical_readiness').replace('confidence', 'stakeholder_confidence').replace('control', 'risk_level') === 'risk_control' ? 'risk_level' : name.replace(' ', '_').toLowerCase()]).toFixed(1) : null;
                        return [
                          `${value.toFixed(1)}/10${delta ? ` (${delta > 0 ? '+' : ''}${delta})` : ''}`,
                          name
                        ];
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="line"
                      iconSize={20}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Overall Quality" 
                      stroke="#ec4899" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: '#ec4899', strokeWidth: 2, stroke: '#1e293b' }} 
                      activeDot={{ r: 8, fill: '#ec4899', strokeWidth: 3, stroke: '#fff' }}
                      fill="url(#colorQuality)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ITIL Compliance" 
                      stroke="#a855f7" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: '#a855f7', strokeWidth: 2, stroke: '#1e293b' }} 
                      activeDot={{ r: 7, fill: '#a855f7', strokeWidth: 3, stroke: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Technical Readiness" 
                      stroke="#8b5cf6" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 2, stroke: '#1e293b' }} 
                      activeDot={{ r: 7, fill: '#8b5cf6', strokeWidth: 3, stroke: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Stakeholder Confidence" 
                      stroke="#d946ef" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: '#d946ef', strokeWidth: 2, stroke: '#1e293b' }} 
                      activeDot={{ r: 7, fill: '#d946ef', strokeWidth: 3, stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Improvement Stats */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {iterations.length > 1 && (
                    <>
                      <div className="bg-black/30 rounded-lg p-3 border border-pink-500/30">
                        <div className="text-xs text-pink-300 mb-1 font-semibold uppercase tracking-wide">Overall Quality</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-pink-400">
                            {iterations[iterations.length - 1].scores.overall_quality.toFixed(1)}
                          </span>
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{(iterations[iterations.length - 1].scores.overall_quality - iterations[0].scores.overall_quality).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-lg p-3 border border-purple-500/30">
                        <div className="text-xs text-purple-300 mb-1 font-semibold uppercase tracking-wide">ITIL Compliance</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-purple-400">
                            {iterations[iterations.length - 1].scores.itil_compliance.toFixed(1)}
                          </span>
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{(iterations[iterations.length - 1].scores.itil_compliance - iterations[0].scores.itil_compliance).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-lg p-3 border border-red-500/30">
                        <div className="text-xs text-red-300 mb-1 font-semibold uppercase tracking-wide">Risk Reduction</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-red-400">
                            {iterations[iterations.length - 1].scores.risk_level.toFixed(1)}
                          </span>
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            -{(iterations[0].scores.risk_level - iterations[iterations.length - 1].scores.risk_level).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-lg p-3 border border-green-500/30">
                        <div className="text-xs text-green-300 mb-1 font-semibold uppercase tracking-wide">CAB Approval</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-green-400">
                            {(iterations[iterations.length - 1].executive_summary.cab_approval_probability * 100).toFixed(0)}%
                          </span>
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{((iterations[iterations.length - 1].executive_summary.cab_approval_probability - iterations[0].executive_summary.cab_approval_probability) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Iteration Details */}
              {iterations.map((iteration, idx) => {
                const isExpanded = expandedRFC[idx];
                const isIteration3 = iteration.iteration === 3;
                
                // Enhanced radar chart data
                const radarData = [
                  { metric: 'Quality', value: iteration.scores.overall_quality },
                  { metric: 'ITIL', value: iteration.scores.itil_compliance },
                  { metric: 'Business', value: iteration.scores.business_value },
                  { metric: 'Technical', value: iteration.scores.technical_readiness },
                  { metric: 'Confidence', value: iteration.scores.stakeholder_confidence },
                  { metric: 'Risk Control', value: 10 - iteration.scores.risk_level }
                ];

                // Change categories data for bar chart
                const changeCategoriesData = iteration.change_categories ? [
                  { category: 'Technical', score: iteration.change_categories.technical.score, status: iteration.change_categories.technical.status },
                  { category: 'Procedural', score: iteration.change_categories.procedural.score, status: iteration.change_categories.procedural.status },
                  { category: 'Compliance', score: iteration.change_categories.compliance.score, status: iteration.change_categories.compliance.status },
                  { category: 'Communication', score: iteration.change_categories.communication.score, status: iteration.change_categories.communication.status }
                ] : [];

                return (
                  <div key={idx} className={`bg-gradient-to-br ${
                    isIteration3 
                      ? 'from-green-900/20 via-emerald-900/20 to-green-900/20 border-emerald-400/40' 
                      : 'from-slate-800/50 via-slate-900/50 to-purple-900/30 border-purple-400/20'
                  } rounded-lg p-6 md:p-8 border backdrop-blur-sm`}>
                    
                    {/* Iteration Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isIteration3 
                            ? 'bg-emerald-500/20 border-2 border-emerald-400' 
                            : 'bg-pink-500/20 border-2 border-pink-400'
                        }`}>
                          <span className={`text-xl font-bold ${isIteration3 ? 'text-emerald-400' : 'text-pink-400'}`}>
                            {iteration.iteration}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {isIteration3 ? 'Final Iteration - Production Ready' : `Iteration ${iteration.iteration}`}
                          </h3>
                          <p className="text-slate-300 text-sm">{iteration.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">{iteration.scores.overall_quality}/10</div>
                          <div className="text-xs text-slate-400">Quality Score</div>
                        </div>
                        {isIteration3 && <Award className="w-10 h-10 text-emerald-400" />}
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="bg-black/30 rounded-lg p-6 mb-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        Executive Summary
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-purple-300 mb-1 font-semibold">Recommendation</div>
                          <div className={`text-lg font-semibold ${
                            iteration.executive_summary.recommendation.includes('APPROVED') ? 'text-green-400' :
                            iteration.executive_summary.recommendation.includes('CONDITIONAL') ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {iteration.executive_summary.recommendation}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-purple-300 mb-1 font-semibold">Deployment Risk</div>
                          <div className={`text-lg font-semibold ${
                            iteration.executive_summary.deployment_risk === 'LOW' ? 'text-green-400' :
                            iteration.executive_summary.deployment_risk.includes('MEDIUM') ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {iteration.executive_summary.deployment_risk}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-emerald-300 mb-1 font-semibold">CAB Approval Probability</div>
                          <div className="text-lg font-semibold text-emerald-400">
                            {(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-green-300 mb-1 font-semibold">Estimated ROI</div>
                          <div className="text-lg font-semibold text-green-400">
                            {iteration.executive_summary.estimated_roi}
                          </div>
                        </div>
                      </div>

                      {iteration.executive_summary.key_concerns && iteration.executive_summary.key_concerns.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm text-yellow-300 mb-2 font-semibold">Key Concerns</div>
                          <ul className="space-y-1">
                            {iteration.executive_summary.key_concerns.map((concern, i) => (
                              <li key={i} className="text-yellow-300 text-sm flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {isIteration3 && iteration.executive_summary.key_concerns?.length === 0 && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">All Concerns Resolved - RFC Approved for Production</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Score Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-5 h-5 text-pink-400" />
                          <span className="text-sm text-pink-400 font-semibold">Overall Quality</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.overall_quality}/10</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-purple-400 font-semibold">ITIL Compliance</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.itil_compliance}/10</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-sm text-red-400 font-semibold">Risk Level</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.risk_level}/10</div>
                        <div className="text-xs text-red-300 mt-1 font-medium">(Lower is better)</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-green-400 font-semibold">Business Value</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.business_value}/10</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-purple-400 font-semibold">Tech Readiness</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.technical_readiness}/10</div>
                      </div>

                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-pink-400" />
                          <span className="text-sm text-pink-400 font-semibold">Stakeholder Confidence</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{iteration.scores.stakeholder_confidence}/10</div>
                      </div>
                    </div>

                    {/* Charts Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Enhanced Radar Chart */}
                      <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                          <span>Quality Dimensions</span>
                          <span className="text-xs text-slate-400">360° Assessment</span>
                        </h4>
                        <ResponsiveContainer width="100%" height={320}>
                          <RadarChart data={radarData}>
                            <defs>
                              <linearGradient id={`radarGradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isIteration3 ? "#10b981" : "#ec4899"} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={isIteration3 ? "#10b981" : "#ec4899"} stopOpacity={0.2}/>
                              </linearGradient>
                            </defs>
                            <PolarGrid 
                              stroke="#475569" 
                              strokeWidth={1}
                            />
                            <PolarAngleAxis 
                              dataKey="metric" 
                              stroke="#94a3b8" 
                              tick={{ 
                                fill: '#cbd5e1', 
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            />
                            <PolarRadiusAxis 
                              domain={[0, 10]} 
                              stroke="#64748b" 
                              tick={{ 
                                fill: '#94a3b8', 
                                fontSize: 11
                              }}
                              tickCount={6}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #475569',
                                borderRadius: '8px',
                                padding: '8px 12px'
                              }}
                              labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                              formatter={(value) => [`${value.toFixed(1)}/10`, 'Score']}
                            />
                            <Radar 
                              name="Scores" 
                              dataKey="value" 
                              stroke={isIteration3 ? "#10b981" : "#ec4899"} 
                              fill={`url(#radarGradient-${idx})`}
                              fillOpacity={0.5} 
                              strokeWidth={3}
                              dot={{ 
                                r: 5, 
                                fill: isIteration3 ? "#10b981" : "#ec4899",
                                strokeWidth: 2,
                                stroke: '#1e293b'
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                        
                        {/* Mini Stats Below Radar */}
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div className="bg-black/20 rounded p-2">
                            <div className="text-xs text-purple-300 font-semibold">Avg Score</div>
                            <div className="text-lg font-bold text-white">
                              {(radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length).toFixed(1)}
                            </div>
                          </div>
                          <div className="bg-black/20 rounded p-2">
                            <div className="text-xs text-emerald-300 font-semibold">Highest</div>
                            <div className="text-lg font-bold text-emerald-400">
                              {Math.max(...radarData.map(item => item.value)).toFixed(1)}
                            </div>
                          </div>
                          <div className="bg-black/20 rounded p-2">
                            <div className="text-xs text-red-300 font-semibold">Lowest</div>
                            <div className="text-lg font-bold text-red-400">
                              {Math.min(...radarData.map(item => item.value)).toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Change Categories Bar Chart */}
                      {changeCategoriesData.length > 0 && (
                        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                            <span>Change Categories Assessment</span>
                            <span className="text-xs text-slate-400">ITIL Framework</span>
                          </h4>
                          <ResponsiveContainer width="100%" height={320}>
                            <BarChart 
                              data={changeCategoriesData}
                              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                            >
                              <defs>
                                <linearGradient id="barGradientPurple" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9}/>
                                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.6}/>
                                </linearGradient>
                                <linearGradient id="barGradientPink" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.9}/>
                                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.6}/>
                                </linearGradient>
                                <linearGradient id="barGradientAmber" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                              <XAxis 
                                dataKey="category" 
                                stroke="#94a3b8" 
                                tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
                                angle={-15}
                                textAnchor="end"
                                height={80}
                                tickLine={{ stroke: '#475569' }}
                              />
                              <YAxis 
                                domain={[0, 10]} 
                                stroke="#94a3b8" 
                                tick={{ fill: '#cbd5e1', fontSize: 11 }}
                                tickLine={{ stroke: '#475569' }}
                                label={{ value: 'Score (0-10)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                              />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#1e293b', 
                                  border: '1px solid #475569',
                                  borderRadius: '8px',
                                  padding: '12px',
                                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                labelStyle={{ color: '#ffffff', fontWeight: 700, marginBottom: '8px', fontSize: '14px' }}
                                itemStyle={{ color: '#ffffff', fontWeight: 600, fontSize: '13px' }}
                                formatter={(value, name, props) => [
                                  `${value}/10 - ${props.payload.status}`,
                                  'Score'
                                ]}
                                cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                              />
                              <Bar 
                                dataKey="score" 
                                radius={[8, 8, 0, 0]}
                                maxBarSize={80}
                              >
                                {changeCategoriesData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={
                                      entry.status === 'EXCELLENT' ? 'url(#barGradientPurple)' :
                                      entry.status === 'GOOD' ? 'url(#barGradientPink)' :
                                      'url(#barGradientAmber)'
                                    } 
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                          
                          {/* Status Legend */}
                          <div className="mt-4 flex flex-wrap justify-center gap-4">
                            {changeCategoriesData.map((cat, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  cat.status === 'EXCELLENT' ? 'bg-purple-500' :
                                  cat.status === 'GOOD' ? 'bg-pink-500' :
                                  'bg-amber-500'
                                }`} />
                                <span className="text-xs text-slate-200 font-medium">
                                  {cat.category}: <span className="font-bold text-white">{cat.score}/10</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Infrastructure Details - Collapsible */}
                    {selectedRFC?.details && (
                      <div className="mb-6">
                        <button
                          onClick={() => toggleSection(`infra-${idx}`)}
                          className="w-full bg-black/30 hover:bg-black/40 p-4 rounded-lg border border-white/10 transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Server className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-semibold">Infrastructure Details</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">
                              {selectedRFC.details.ci_count} CI Items
                            </span>
                          </div>
                          {expandedSections[`infra-${idx}`] ? 
                            <ChevronUp className="w-5 h-5 text-purple-400" /> : 
                            <ChevronDown className="w-5 h-5 text-purple-400" />
                          }
                        </button>

                        {expandedSections[`infra-${idx}`] && (
                          <div className="mt-4 bg-black/50 rounded-lg border border-white/10 p-6 space-y-6">
                            
                            {/* Affected Services */}
                            {selectedRFC.details.affected_services && (
                              <div>
                                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-pink-400" />
                                  Affected Services ({selectedRFC.details.affected_services.length})
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {selectedRFC.details.affected_services.map((service, i) => (
                                    <div key={i} className="bg-black/30 p-2 rounded text-sm text-slate-300 flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-pink-400 flex-shrink-0" />
                                      {service}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* CMDB Items */}
                            {selectedRFC.details.cmdb_items && selectedRFC.details.cmdb_items.length > 0 && (
                              <div>
                                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                                  <Database className="w-4 h-4 text-purple-400" />
                                  CMDB Items ({selectedRFC.details.cmdb_items.length} total)
                                </h5>
                                <div className="max-h-60 overflow-y-auto space-y-1">
                                  {selectedRFC.details.cmdb_items.map((item, i) => (
                                    <div key={i} className="text-sm text-slate-300 flex items-start gap-2 py-1">
                                      <span className="text-slate-500 font-mono text-xs mt-0.5">{i + 1}.</span>
                                      <span className="font-mono text-xs">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Financial Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-black/30 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm text-slate-400">Implementation Cost</span>
                                </div>
                                <div className="text-lg font-semibold text-white">
                                  {selectedRFC.details.estimated_cost}
                                </div>
                              </div>

                              <div className="bg-black/30 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                  <span className="text-sm text-slate-400">Business Value</span>
                                </div>
                                <div className="text-sm font-medium text-green-400">
                                  {selectedRFC.details.business_value}
                                </div>
                              </div>
                            </div>

                            {/* Risk Factors */}
                            {selectedRFC.details.risk_factors && selectedRFC.details.risk_factors.length > 0 && (
                              <div>
                                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-red-400" />
                                  Risk Factors ({selectedRFC.details.risk_factors.length})
                                </h5>
                                <div className="space-y-2">
                                  {selectedRFC.details.risk_factors.map((risk, i) => (
                                    <div key={i} className="bg-black/30 p-3 rounded-lg border-l-2 border-red-500 text-sm text-slate-300">
                                      {risk}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Issues and Improvements */}
                    {iteration.critical_issues && iteration.critical_issues.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          Critical Issues ({iteration.critical_issues.length})
                        </h4>
                        <div className="space-y-3">
                          {iteration.critical_issues.map((issue, i) => (
                            <div key={i} className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  issue.severity === 'CRITICAL' || issue.severity === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                                  issue.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {issue.severity}
                                </span>
                                <span className="text-xs text-slate-400">{issue.category}</span>
                              </div>
                              <p className="text-white font-medium mb-2">{issue.issue}</p>
                              <p className="text-sm text-slate-300 mb-2">{issue.impact}</p>
                              <div className="mt-2 pt-2 border-t border-white/10">
                                <p className="text-sm text-green-400">{issue.recommended_action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {iteration.improvements && iteration.improvements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-pink-400" />
                          Recommended Improvements ({iteration.improvements.length})
                        </h4>
                        <div className="space-y-3">
                          {iteration.improvements.map((imp, i) => (
                            <div key={i} className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  imp.priority === 'CRITICAL' || imp.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                                  imp.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {imp.priority}
                                </span>
                                <span className="text-sm text-slate-300 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-cyan-400" />
                                  {imp.effort_hours}h
                                </span>
                              </div>
                              <p className="text-white font-medium mb-2">{imp.action}</p>
                              <p className="text-sm text-green-400">{imp.estimated_impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isIteration3 && iteration.critical_issues?.length === 0 && iteration.improvements?.length === 0 && (
                      <div className="mb-6 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-8 h-8 text-emerald-400" />
                          <div>
                            <h4 className="text-xl font-bold text-emerald-400 mb-1">
                              RFC is Production Ready!
                            </h4>
                            <p className="text-emerald-300 text-sm">
                              All issues have been resolved and no further improvements are needed. This RFC is approved for deployment.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expandable RFC Document */}
                    <div className="border-t border-white/10 pt-6">
                      <button
                        onClick={() => toggleRFC(idx)}
                        className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                          isIteration3 
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-400/30' 
                            : 'bg-black/30 hover:bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`w-5 h-5 ${isIteration3 ? 'text-emerald-400' : 'text-purple-400'}`} />
                          <span className="text-white font-semibold">
                            {isExpanded ? 'Hide' : 'View'} {isIteration3 ? 'Final Production RFC Document' : 'Full RFC Document'}
                          </span>
                        </div>
                        {isExpanded ? 
                          <ChevronUp className={`w-5 h-5 ${isIteration3 ? 'text-emerald-400' : 'text-purple-400'}`} /> : 
                          <ChevronDown className={`w-5 h-5 ${isIteration3 ? 'text-emerald-400' : 'text-purple-400'}`} />
                        }
                      </button>

                      {isExpanded && (
                        <div className="mt-4 bg-black/50 rounded-lg border border-white/10 p-6">
                          <div className="flex justify-end gap-2 mb-4">
                            <button
                              onClick={() => copyRFCToClipboard(iteration)}
                              className={`px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2 transition-colors ${
                                isIteration3 
                                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                                  : 'bg-purple-600 hover:bg-purple-700'
                              }`}
                            >
                              <Copy className="w-4 h-4" />
                              Copy to Clipboard
                            </button>
                            <button
                              onClick={() => downloadRFC(iteration)}
                              className={`px-4 py-2 rounded-lg text-white text-sm flex items-center gap-2 transition-colors ${
                                isIteration3 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                            >
                              <Download className="w-4 h-4" />
                              Download RFC
                            </button>
                          </div>

                          <div className="prose prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap text-sm text-white font-mono bg-black/30 p-6 rounded-lg overflow-x-auto border border-white/10">
                              {generateFinalRFCDocument(iteration)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Processing Metadata */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          Processing Time: {iteration.processing_time}s
                        </span>
                        <span>Tokens: {iteration.tokens_used?.toLocaleString() || 'N/A'}</span>
                        <span>{iteration.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Modal */}
          <ContactModal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            appName="Reflexion ITIL Agent"
            appIcon={<Shield className="w-8 h-8 text-cyan-400" />}
            benefits={reflexionBenefits}
            ctaText="Request Custom ITIL Analysis"
          />
        </div>
      </div>
      
      {/* Unified Footer with Reflexion ITIL branding */}
      <UnifiedFooter productBranding={reflexionFooterConfig} />
    </div>
  );
}