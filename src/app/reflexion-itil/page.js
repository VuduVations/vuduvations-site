'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, DollarSign, Users, Activity, Shield, XCircle, ChevronDown, ChevronUp, FileText, Download, Copy } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'https://reflexion-backend-703153929469.us-central1.run.app';

export default function ReflexionITILPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [messages, setMessages] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedRFC, setExpandedRFC] = useState({});

  const runReflexion = async () => {
    setIsProcessing(true);
    setMessages([]);
    setIterations([]);
    setProgress(0);
    setCurrentPhase('Initializing...');
    setExpandedRFC({});

    try {
      const response = await fetch(`${API_URL}/api/run-reflexion-stream`, {
        method: 'POST',
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const event = JSON.parse(line.substring(6));
            
            if (event.type === 'complete') {
              setIterations(event.iterations);
              setProgress(100);
              setCurrentPhase('Complete');
              setIsProcessing(false);
            } else {
              setMessages(prev => [...prev, event]);
              setCurrentPhase(event.phase);
              const progressPercent = Math.min((event.time / 85) * 100, 95);
              setProgress(progressPercent);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
      setCurrentPhase('Error occurred');
    }
  };

  const toggleRFC = (iterationIndex) => {
    setExpandedRFC(prev => ({
      ...prev,
      [iterationIndex]: !prev[iterationIndex]
    }));
  };

  const copyRFCToClipboard = (iteration) => {
    const rfcText = generateRFCDocument(iteration);
    navigator.clipboard.writeText(rfcText);
    alert('RFC document copied to clipboard!');
  };

  const downloadRFC = (iteration) => {
    const rfcText = generateRFCDocument(iteration);
    const blob = new Blob([rfcText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RFC-2024-10-001-Iteration-${iteration.iteration}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateRFCDocument = (iteration) => {
    return `# REQUEST FOR CHANGE (RFC-2024-10-001) - Iteration ${iteration.iteration}

## CHANGE CLASSIFICATION
**Type:** Standard Change  
**Priority:** High  
**Category:** Infrastructure - Database  
**Submission Date:** October 11, 2024  
**Iteration:** ${iteration.iteration}  
**Timestamp:** ${iteration.timestamp}

---

## EXECUTIVE SUMMARY

**Recommendation:** ${iteration.executive_summary.recommendation}  
**Deployment Risk:** ${iteration.executive_summary.deployment_risk}  
**Business Impact:** ${iteration.executive_summary.business_impact}  
**CAB Approval Probability:** ${(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%  
**Estimated ROI:** ${iteration.executive_summary.estimated_roi}

${iteration.executive_summary.key_concerns.length > 0 ? `
**Key Concerns:**
${iteration.executive_summary.key_concerns.map(c => `- ${c}`).join('\n')}
` : '**Status:** All requirements met. Ready for production deployment.'}

---

## QUALITY METRICS

| Dimension | Score | Status |
|-----------|-------|--------|
| Overall Quality | ${iteration.scores.overall_quality.toFixed(1)}/10 | ${iteration.scores.overall_quality >= 9 ? 'Excellent' : iteration.scores.overall_quality >= 7 ? 'Good' : 'Needs Improvement'} |
| ITIL Compliance | ${iteration.scores.itil_compliance.toFixed(1)}/10 | ${iteration.scores.itil_compliance >= 9 ? 'Excellent' : iteration.scores.itil_compliance >= 7 ? 'Good' : 'Needs Improvement'} |
| Risk Level | ${iteration.scores.risk_level.toFixed(1)}/10 | ${iteration.scores.risk_level < 4 ? 'Low' : iteration.scores.risk_level < 7 ? 'Medium' : 'High'} |
| Business Value | ${iteration.scores.business_value.toFixed(1)}/10 | ${iteration.scores.business_value >= 8 ? 'High' : iteration.scores.business_value >= 6 ? 'Medium' : 'Low'} |
| Technical Readiness | ${iteration.scores.technical_readiness.toFixed(1)}/10 | ${iteration.scores.technical_readiness >= 9 ? 'Excellent' : iteration.scores.technical_readiness >= 7 ? 'Good' : 'Needs Improvement'} |
| Stakeholder Confidence | ${iteration.scores.stakeholder_confidence.toFixed(1)}/10 | ${iteration.scores.stakeholder_confidence >= 9 ? 'Excellent' : iteration.scores.stakeholder_confidence >= 7 ? 'Good' : 'Needs Improvement'} |

---

## RFC DETAILS

### Title
${iteration.rfc_summary.title}

### Objective
${iteration.rfc_summary.objective}

### Business Justification
${iteration.rfc_summary.business_justification}

### Technical Approach
${iteration.rfc_summary.technical_approach}

### Rollback Plan
**Status:** ${iteration.rfc_summary.rollback_plan_status}

### Testing Strategy
**Status:** ${iteration.rfc_summary.testing_status}

### Implementation Timeline
${iteration.rfc_summary.timeline}

### Impact Analysis
${iteration.rfc_summary.impact}

---

## CRITICAL ISSUES IDENTIFIED
${iteration.critical_issues && iteration.critical_issues.length > 0 ? `
${iteration.critical_issues.map((issue, i) => `
### Issue ${i + 1}: ${issue.issue}
**Category:** ${issue.category}  
**Severity:** ${issue.severity}  
**Priority:** ${issue.priority}  
**Impact:** ${issue.impact}
`).join('\n')}
` : 'No critical issues identified. All requirements met.'}

---

## RECOMMENDED IMPROVEMENTS
${iteration.improvements && iteration.improvements.length > 0 ? `
${iteration.improvements.map((imp, i) => `
### ${i + 1}. ${imp.action}
**Priority:** ${imp.priority}  
**Estimated Impact:** ${imp.estimated_impact}  
**Effort Required:** ${imp.effort_hours} hours
`).join('\n')}
` : 'No major improvements required. Minor formatting adjustments only.'}

---

## CHANGE CATEGORY ASSESSMENT

| Category | Score | Status |
|----------|-------|--------|
| Technical | ${iteration.change_categories.technical.score.toFixed(1)}/10 | ${iteration.change_categories.technical.status} |
| Procedural | ${iteration.change_categories.procedural.score.toFixed(1)}/10 | ${iteration.change_categories.procedural.status} |
| Compliance | ${iteration.change_categories.compliance.score.toFixed(1)}/10 | ${iteration.change_categories.compliance.status} |
| Communication | ${iteration.change_categories.communication.score.toFixed(1)}/10 | ${iteration.change_categories.communication.status} |

---

## PROCESSING METADATA

**Processing Time:** ${iteration.processing_time} seconds  
**Tokens Used:** ${iteration.tokens_used?.toLocaleString() || 'N/A'}  
**Timestamp:** ${iteration.timestamp}

---

## APPROVAL STATUS

**Iteration ${iteration.iteration} Status:** ${iteration.executive_summary.recommendation}  
**CAB Approval Probability:** ${(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%  
**Risk Level:** ${iteration.executive_summary.deployment_risk}

${iteration.iteration === 3 ? `
---

## FINAL AUTHORIZATION

✅ This Request for Change has been approved for production implementation.

**Change Window:** Sunday, October 15, 2024, 2:00-4:00 AM PST  
**Authorization:** RFC-2024-10-001-APPROVED  
**CAB Decision:** APPROVED FOR PRODUCTION

---

**END OF DOCUMENT**
` : ''}
`;
  };

  const getRiskColor = (risk) => {
    if (risk === 'LOW' || risk < 4) return 'text-green-400';
    if (risk === 'MEDIUM' || (risk >= 4 && risk < 7)) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecommendationIcon = (rec) => {
    if (rec.includes('APPROVED')) return <CheckCircle className="w-6 h-6 text-green-400" />;
    if (rec.includes('CONDITIONAL')) return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
    return <XCircle className="w-6 h-6 text-red-400" />;
  };

  const trendData = iterations.map(iter => ({
    iteration: `Iteration ${iter.iteration}`,
    Quality: iter.scores.overall_quality,
    Compliance: iter.scores.itil_compliance,
    Risk: 10 - iter.scores.risk_level,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a href="/#apps" className="text-purple-300 hover:text-purple-100 mb-4 inline-block">
            ← Back to Portfolio
          </a>
          <h1 className="text-4xl font-bold text-white mb-2">
            Reflexion ITIL Agent
          </h1>
          <p className="text-gray-300">
            Executive-grade AI analysis for ITIL Change Management using the Reflexion pattern
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">About This Demo</h2>
          <p className="text-gray-300 mb-4">
            This demonstration showcases the <strong>Reflexion pattern</strong>—an AI technique 
            where agents iteratively improve outputs through self-critique and refinement. Applied to 
            ITIL Change Management, it produces executive-grade RFC analysis with quantitative metrics.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black/20 p-4 rounded">
              <Activity className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-1">Technology</h3>
              <p className="text-sm text-gray-300">LangGraph Multi-Agent System</p>
            </div>
            <div className="bg-black/20 p-4 rounded">
              <Target className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-1">Pattern</h3>
              <p className="text-sm text-gray-300">Reflexion (Self-Improving AI)</p>
            </div>
            <div className="bg-black/20 p-4 rounded">
              <Shield className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-1">Use Case</h3>
              <p className="text-sm text-gray-300">ITIL Change Management</p>
            </div>
            <div className="bg-black/20 p-4 rounded">
              <BarChart3 className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-1">Output</h3>
              <p className="text-sm text-gray-300">Executive Dashboard</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <button
            onClick={runReflexion}
            disabled={isProcessing}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
              isProcessing
                ? 'bg-gradient-to-r from-purple-700 to-pink-700 cursor-wait text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
            }`}
          >
            <Activity className={isProcessing ? 'animate-spin' : ''} />
            {isProcessing ? 'Processing Analysis...' : 'Start Executive Analysis'}
          </button>

          {isProcessing && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Current Phase: <strong className="capitalize">{currentPhase}</strong></span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Agent Activity Log */}
        {messages.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Agent Activity
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className="bg-black/30 p-3 rounded border-l-4 border-purple-500">
                  <span className="text-gray-300">{msg.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Executive Dashboard */}
        {iterations.length > 0 && (
          <div className="space-y-8">
            {/* Overall Trend Chart */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Quality Improvement Trajectory
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="iteration" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Quality" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Compliance" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Risk" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} name="Risk Mitigation" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Iteration Cards */}
            {iterations.map((iteration, idx) => {
              const radarData = [
                { metric: 'Quality', value: iteration.scores.overall_quality },
                { metric: 'Compliance', value: iteration.scores.itil_compliance },
                { metric: 'Risk Mgmt', value: 10 - iteration.scores.risk_level },
                { metric: 'Business Value', value: iteration.scores.business_value },
                { metric: 'Tech Readiness', value: iteration.scores.technical_readiness },
                { metric: 'Confidence', value: iteration.scores.stakeholder_confidence },
              ];

              const isExpanded = expandedRFC[idx];

              return (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  {/* Iteration Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-6 h-6" />
                      Iteration {iteration.iteration}
                    </h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">
                        {iteration.scores.overall_quality.toFixed(1)}/10
                      </div>
                      <div className="text-sm text-gray-400">Overall Quality</div>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Left: Key Metrics */}
                    <div className="space-y-4">
                      <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          {getRecommendationIcon(iteration.executive_summary.recommendation)}
                          <div>
                            <div className="text-sm text-gray-400">Recommendation</div>
                            <div className="text-lg font-semibold text-white">
                              {iteration.executive_summary.recommendation}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-purple-400" />
                            <div className="text-sm text-gray-400">Risk Level</div>
                          </div>
                          <div className={`text-xl font-bold ${getRiskColor(iteration.executive_summary.deployment_risk)}`}>
                            {iteration.executive_summary.deployment_risk}
                          </div>
                        </div>

                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            <div className="text-sm text-gray-400">CAB Approval</div>
                          </div>
                          <div className="text-xl font-bold text-green-400">
                            {(iteration.executive_summary.cab_approval_probability * 100).toFixed(0)}%
                          </div>
                        </div>

                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-purple-400" />
                            <div className="text-sm text-gray-400">Est. ROI</div>
                          </div>
                          <div className="text-lg font-bold text-white">
                            {iteration.executive_summary.estimated_roi}
                          </div>
                        </div>

                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <div className="text-sm text-gray-400">Business Impact</div>
                          </div>
                          <div className="text-lg font-bold text-white">
                            {iteration.executive_summary.business_impact}
                          </div>
                        </div>
                      </div>

                      {iteration.executive_summary.key_concerns.length > 0 && (
                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <div className="text-sm font-semibold text-gray-300">Key Concerns</div>
                          </div>
                          <ul className="space-y-2">
                            {iteration.executive_summary.key_concerns.map((concern, i) => (
                              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">•</span>
                                {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right: Radar Chart */}
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                      <h4 className="text-sm font-semibold text-gray-300 mb-4">Multi-Dimensional Assessment</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#4B5563" />
                          <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                          <Radar name="Scores" dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* RFC Summary */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      RFC Summary
                    </h4>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/10 space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-purple-300">Title:</span>
                        <p className="text-gray-300">{iteration.rfc_summary.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-purple-300">Objective:</span>
                        <p className="text-gray-300">{iteration.rfc_summary.objective}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-semibold text-purple-300">Rollback Plan:</span>
                          <p className="text-gray-300">{iteration.rfc_summary.rollback_plan_status}</p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-purple-300">Testing:</span>
                          <p className="text-gray-300">{iteration.rfc_summary.testing_status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Critical Issues */}
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
                              <div>
                                <span className="text-sm font-semibold text-red-400">{issue.category}</span>
                                <span className="mx-2 text-gray-500">•</span>
                                <span className="text-sm text-gray-400">Priority {issue.priority}</span>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                issue.severity === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                                issue.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {issue.severity}
                              </span>
                            </div>
                            <p className="text-white font-medium mb-2">{issue.issue}</p>
                            <p className="text-sm text-gray-400">{issue.impact}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Improvements */}
                  {iteration.improvements && iteration.improvements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
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
                              <span className="text-sm text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
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

                  {/* Change Categories */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Change Category Assessment</h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      {Object.entries(iteration.change_categories).map(([category, data]) => (
                        <div key={category} className="bg-black/30 p-4 rounded-lg border border-white/10">
                          <div className="text-sm text-gray-400 capitalize mb-2">{category}</div>
                          <div className="text-2xl font-bold text-white mb-1">{data.score.toFixed(1)}</div>
                          <div className={`text-xs font-semibold ${
                            data.status === 'EXCELLENT' ? 'text-green-400' :
                            data.status === 'GOOD' || data.status === 'ADEQUATE' ? 'text-blue-400' :
                            data.status === 'IMPROVING' ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {data.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable RFC Document */}
                  <div className="border-t border-white/10 pt-6">
                    <button
                      onClick={() => toggleRFC(idx)}
                      className="w-full bg-black/30 hover:bg-black/40 p-4 rounded-lg border border-white/10 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-semibold">
                          {isExpanded ? 'Hide' : 'View'} Full RFC Document
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-400" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 bg-black/50 rounded-lg border border-white/10 p-6">
                        <div className="flex justify-end gap-2 mb-4">
                          <button
                            onClick={() => copyRFCToClipboard(iteration)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Copy to Clipboard
                          </button>
                          <button
                            onClick={() => downloadRFC(iteration)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download RFC
                          </button>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono bg-black/30 p-6 rounded-lg overflow-x-auto">
                            {generateRFCDocument(iteration)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Processing Metadata */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Processing Time: {iteration.processing_time}s
                      </span>
                      <span>Tokens: {iteration.tokens_used?.toLocaleString() || 'N/A'}</span>
                      <span>{iteration.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA FOOTER - After all iterations */}
            <div className="mt-16 bg-gradient-to-br from-purple-900/50 via-slate-900/50 to-purple-900/50 rounded-lg p-8 md:p-12 border border-white/20 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready for Your Custom ITIL Analysis?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                This demo shows what's possible. Get a tailored Reflexion ITIL analysis for your organization's change management process.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 px-8 text-lg"
              >
                View Services & Pricing
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
