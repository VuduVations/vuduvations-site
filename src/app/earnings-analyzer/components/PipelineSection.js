// ============================================================================
// FILE: src/app/earnings-analyzer/components/PipelineSection.js
// AI Pipeline Analysis - Generic version that works for any company
// ============================================================================

'use client'

import { useState } from 'react'
import { Mic, Brain, FileText, Database, Target, ChevronDown, ChevronUp, CheckCircle, Zap, Play } from 'lucide-react'

const getColorClasses = (color, type = 'bg') => {
  const colors = {
    blue: { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-blue-400', bgLight: 'bg-blue-500/20' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-400', bgLight: 'bg-purple-500/20' },
    green: { bg: 'bg-green-500', border: 'border-green-400', text: 'text-green-400', bgLight: 'bg-green-500/20' },
    orange: { bg: 'bg-orange-500', border: 'border-orange-400', text: 'text-orange-400', bgLight: 'bg-orange-500/20' },
    pink: { bg: 'bg-pink-500', border: 'border-pink-400', text: 'text-pink-400', bgLight: 'bg-pink-500/20' }
  }
  return colors[color][type]
}

export default function PipelineSection({ data = null }) {
  const [expandedStage, setExpandedStage] = useState(null)

  // Extract sample data from the actual loaded data if available
  const companyName = data?.company || 'Sample Company'
  const ticker = data?.ticker || 'TICK'
  const sampleQuarter = data?.quarterly_results ? Object.keys(data.quarterly_results)[0] : 'Q1_2024'
  const sampleQuarterData = data?.quarterly_results?.[sampleQuarter]

  const pipeline = [
    {
      id: 'transcription',
      name: 'Stage 1: Audio Transcription',
      icon: <Mic className="w-6 h-6" />,
      color: 'blue',
      duration: '45 seconds',
      description: 'Converts earnings call audio into accurate, timestamped text',
      technology: 'OpenAI Whisper API',
      inputs: [
        'Earnings call audio file (MP3, WAV)',
        'Company metadata (ticker, quarter)'
      ],
      process: [
        'Audio file is uploaded and validated',
        'Large files are automatically chunked into 25MB segments',
        'Whisper API processes each chunk with financial terminology optimization',
        'Speaker diarization identifies CEO, CFO, and analyst voices',
        'Timestamps are added to each sentence for reference'
      ],
      outputs: [
        'Complete transcript with 95%+ accuracy',
        'Speaker labels for each statement',
        'Timestamp data for quote verification'
      ],
      dataFlow: {
        input: `${ticker}_${sampleQuarter}_call.mp3 (35-45 minutes)`,
        output: sampleQuarterData 
          ? `${sampleQuarterData.word_count?.toLocaleString() || '6,000-10,000'} words transcribed with speaker identification`
          : '6,000-10,000 words transcribed with speaker identification'
      },
      sampleOutput: `[00:02:15] CEO: "We delivered strong results this quarter with significant growth across all key metrics..."

[00:08:42] CFO: "Revenue increased substantially year-over-year, and we're well-positioned for continued growth..."`
    },
    {
      id: 'sentiment',
      name: 'Stage 2: Sentiment Analysis',
      icon: <Brain className="w-6 h-6" />,
      color: 'purple',
      duration: '90 seconds',
      description: 'Analyzes management tone, confidence, and emotional signals',
      technology: 'GPT-4 + Custom Financial Models',
      inputs: [
        'Complete transcript from Stage 1',
        'Historical sentiment data for comparison',
        'Industry-specific keyword library'
      ],
      process: [
        'Each sentence is analyzed for positive/negative/neutral sentiment',
        'Context-aware scoring distinguishes "challenging competition" (positive) from "challenging conditions" (negative)',
        'Speaker importance weighting: CEO prepared remarks = 2x weight vs. Q&A',
        'Hedging language detection: "we believe" vs. "we will" confidence assessment',
        'Aggregation across all speakers to generate overall sentiment score'
      ],
      outputs: [
        'Overall sentiment score (0-100%)',
        'Management confidence level (High/Medium/Low)',
        'Key positive and negative signal lists',
        'Tone assessment (Optimistic, Cautious, Mixed, etc.)'
      ],
      dataFlow: {
        input: 'All sentences analyzed for sentiment patterns',
        processing: sampleQuarterData?.sentiment_analysis
          ? `${sampleQuarterData.sentiment_analysis.key_positive_signals?.length || 3} positive signals, ${sampleQuarterData.sentiment_analysis.key_concerns?.length || 3} concerns identified`
          : 'Positive and negative signals identified and weighted',
        output: sampleQuarterData
          ? `Final sentiment: ${Math.round(sampleQuarterData.sentiment_score * 100)}% (${sampleQuarterData.sentiment_analysis?.overall_tone || 'Optimistic'})`
          : 'Final sentiment score calculated (typically 70-85%)'
      },
      sampleOutput: sampleQuarterData?.sentiment_analysis ? 
`Positive Signals:
${sampleQuarterData.sentiment_analysis.key_positive_signals?.slice(0, 3).map((s, i) => `â€¢ ${s.substring(0, 80)}...`).join('\n') || 'â€¢ Strong performance metrics\nâ€¢ Positive forward guidance\nâ€¢ Confident management tone'}

Key Concerns:
${sampleQuarterData.sentiment_analysis.key_concerns?.slice(0, 2).map((c, i) => `â€¢ ${c.substring(0, 80)}...`).join('\n') || 'â€¢ Market headwinds\nâ€¢ Operational challenges'}` 
      : 
`Positive Signals:
â€¢ Strong performance metrics mentioned multiple times
â€¢ Positive forward guidance provided
â€¢ Confident management tone detected

Key Concerns:
â€¢ Market headwinds acknowledged
â€¢ Operational challenges discussed`
    },
    {
      id: 'themes',
      name: 'Stage 3: Strategic Theme Extraction',
      icon: <FileText className="w-6 h-6" />,
      color: 'green',
      duration: '60 seconds',
      description: 'Identifies business priorities, growth initiatives, and strategic shifts',
      technology: 'LangChain Multi-Agent System',
      inputs: [
        'Transcript with sentiment annotations',
        'Previous quarters\' themes for trend analysis',
        'Industry-specific strategic framework'
      ],
      process: [
        'Frequency analysis: Topics mentioned 5+ times flagged as priorities',
        'Dollar amount association: Links themes to financial metrics',
        'Time-weighting: Prepared remarks weighted 2x vs. Q&A',
        'Cross-quarter comparison: Tracks theme evolution over time',
        'Risk/opportunity classification: Categorizes themes by strategic impact'
      ],
      outputs: [
        'Top 3-5 strategic themes with descriptions',
        'Risk factors identified',
        'Opportunity areas highlighted',
        'Quarterly theme evolution tracking'
      ],
      dataFlow: {
        input: 'Analyzing transcript for strategic patterns and priorities',
        processing: sampleQuarterData?.topic_analysis?.strategic_themes
          ? `${sampleQuarterData.topic_analysis.strategic_themes.length} strategic themes identified and prioritized`
          : '3-5 strategic themes identified and prioritized',
        output: sampleQuarterData?.topic_analysis?.strategic_themes?.[0]?.theme_name
          ? sampleQuarterData.topic_analysis.strategic_themes.slice(0, 3).map(t => t.theme_name).join(', ')
          : 'Strategic priorities, growth initiatives, competitive positioning'
      },
      sampleOutput: sampleQuarterData?.topic_analysis?.strategic_themes ?
`Strategic Themes Detected:

${sampleQuarterData.topic_analysis.strategic_themes.slice(0, 3).map((theme, i) => 
`${i + 1}. ${theme.theme_name}
   ${theme.description ? `â€¢ ${theme.description.substring(0, 120)}...` : ''}`
).join('\n\n')}`
      :
`Strategic Themes Detected:

1. Growth Strategy
   â€¢ Key strategic initiative driving business forward

2. Operational Excellence
   â€¢ Focus on efficiency and margin improvement

3. Market Expansion
   â€¢ New markets and customer segments targeted`
    },
    {
      id: 'financial',
      name: 'Stage 4: Financial Data Integration',
      icon: <Database className="w-6 h-6" />,
      color: 'orange',
      duration: '30 seconds',
      description: 'Fetches real-time market data and correlates with sentiment',
      technology: 'Yahoo Finance API',
      inputs: [
        `Company ticker symbol (${ticker})`,
        'Earnings date',
        'Sentiment score from Stage 2'
      ],
      process: [
        'Fetch stock price T-1 (day before earnings)',
        'Fetch stock price T+1 (day after earnings)',
        'Calculate earnings reaction percentage',
        'Retrieve historical prices for quarterly comparison',
        'Pull financial metrics (P/E ratio, market cap, volume)',
        'Validate sentiment vs. actual market response'
      ],
      outputs: [
        'Pre/post earnings stock prices',
        'Earnings reaction percentage',
        'Quarterly stock performance data',
        'Sentiment-market correlation metrics'
      ],
      dataFlow: {
        input: `${ticker} ticker, ${sampleQuarter.replace('_', ' ')} earnings date`,
        apiCalls: sampleQuarterData
          ? `Stock price: $${sampleQuarterData.stock_price?.toFixed(2) || 'N/A'}`
          : 'Real-time stock price data retrieved',
        output: sampleQuarterData
          ? `Earnings reaction: ${sampleQuarterData.earnings_reaction > 0 ? '+' : ''}${sampleQuarterData.earnings_reaction?.toFixed(1) || 'N/A'}%`
          : 'Earnings reaction calculated and analyzed'
      },
      sampleOutput: sampleQuarterData ?
`Market Response:
Stock Price: $${sampleQuarterData.stock_price?.toFixed(2) || 'N/A'}
Earnings Reaction: ${sampleQuarterData.earnings_reaction > 0 ? '+' : ''}${sampleQuarterData.earnings_reaction?.toFixed(1) || 'N/A'}%

Sentiment-Market Alignment: ${Math.abs(sampleQuarterData.sentiment_score * 100 - 50) > 15 ? 'STRONG' : 'MODERATE'}
â€¢ Sentiment: ${Math.round(sampleQuarterData.sentiment_score * 100)}%
â€¢ Market reaction: ${sampleQuarterData.earnings_reaction > 0 ? 'Positive' : 'Negative'}`
      :
`Market Response:
Stock Price: Retrieved from Yahoo Finance
Earnings Reaction: Calculated from T-1 to T+1

Sentiment-Market Alignment Analysis:
â€¢ Sentiment score correlated with market movement
â€¢ Historical patterns analyzed for validation`
    },
    {
      id: 'synthesis',
      name: 'Stage 5: Report Synthesis',
      icon: <Target className="w-6 h-6" />,
      color: 'pink',
      duration: '45 seconds',
      description: 'Generates comprehensive investment-grade analysis report',
      technology: 'Multi-Agent LLM Orchestration',
      inputs: [
        'Sentiment analysis from Stage 2',
        'Strategic themes from Stage 3',
        'Market data from Stage 4',
        'Historical quarterly comparison data'
      ],
      process: [
        'Cross-reference all data sources for consistency',
        'Generate executive summary with key takeaways',
        'Create bullish/bearish factor lists',
        'Produce quarter-over-quarter comparative analysis',
        'Generate strategic implications and investment thesis',
        'Format output in institutional-grade structure'
      ],
      outputs: [
        'Executive dashboard with key metrics',
        'Quarterly sentiment and performance trends',
        'Strategic themes with business segment analysis',
        'Investment implications (bullish/bearish factors)',
        'Downloadable comprehensive report'
      ],
      dataFlow: {
        input: 'Aggregating data from Stages 1-4',
        processing: 'Cross-validating insights, generating multi-section report',
        output: 'Complete earnings intelligence report (McKinsey-grade quality)'
      },
      sampleOutput: sampleQuarterData ?
`EXECUTIVE SUMMARY - ${companyName} ${sampleQuarter.replace('_', ' ')}

Sentiment Score: ${Math.round(sampleQuarterData.sentiment_score * 100)}% (${sampleQuarterData.sentiment_analysis?.overall_tone || 'Optimistic'})
Stock Performance: ${sampleQuarterData.earnings_reaction > 0 ? '+' : ''}${sampleQuarterData.earnings_reaction?.toFixed(1)}% earnings reaction

${sampleQuarterData.financial_insights?.key_insights?.[0] ? `Key Insight: ${sampleQuarterData.financial_insights.key_insights[0].substring(0, 100)}...` : ''}

Strategic Focus:
${sampleQuarterData.topic_analysis?.strategic_themes?.slice(0, 2).map((t, i) => `${i + 1}. ${t.theme_name}`).join('\n') || '1. Growth initiatives\n2. Operational excellence'}`
      :
`EXECUTIVE SUMMARY - ${companyName}

Sentiment Score: Analyzed from management commentary
Stock Performance: Earnings reaction calculated
Strategic Themes: Priorities and initiatives identified

Complete multi-quarter analysis with:
â€¢ Sentiment trends
â€¢ Strategic insights
â€¢ Investment implications`
    }
  ]

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-blue-400/20 p-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-blue-400/30 mb-4">
          <Zap className="w-5 h-5 text-blue-400" />
          <span className="text-white font-semibold">Total Processing Time: ~3 minutes</span>
        </div>
        <p className="text-gray-400 text-sm">
          From raw audio to institutional-grade analysis in 5 specialized AI stages
        </p>
      </div>

      <div className="space-y-0">
        <div className="relative">
          <div className="space-y-0">
            {pipeline.map((stage, index) => (
              <div key={stage.id}>
                {/* Stage Card - Always Visible */}
                <div 
                  onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                  className="cursor-pointer"
                >
                  <div className={`bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 ${
                    expandedStage === stage.id ? getColorClasses(stage.color, 'border') + ' shadow-lg' : 'border-slate-600'
                  } rounded-xl p-6 transition-all`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`${getColorClasses(stage.color, 'bgLight')} p-3 rounded-lg`}>
                          <div className={getColorClasses(stage.color, 'text')}>
                            {stage.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{stage.name}</h3>
                          <p className="text-sm text-gray-300">{stage.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${getColorClasses(stage.color, 'text')}`}>
                            {stage.duration}
                          </div>
                          <div className="text-xs text-gray-400">{stage.technology}</div>
                        </div>
                        {expandedStage === stage.id ? 
                          <ChevronUp className="w-5 h-5 text-white" /> : 
                          <ChevronDown className="w-5 h-5 text-white" />
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Stage Details */}
                {expandedStage === stage.id && (
                  <div className="animate-fadeIn mt-4 mb-4">
                    <div className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border-2 ${getColorClasses(stage.color, 'border')}`}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={getColorClasses(stage.color, 'text')}>
                          {stage.icon}
                        </div>
                        <h2 className="text-3xl font-bold text-white">{stage.name}</h2>
                      </div>

                      {/* Inputs */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                          <Play className="w-5 h-5 text-green-400 rotate-180" />
                          Inputs
                        </h3>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {stage.inputs.map((input, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span>{input}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Process */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-400" />
                          What Happens
                        </h3>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <ol className="space-y-3">
                            {stage.process.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-300">
                                <span className={`${getColorClasses(stage.color, 'text')} font-bold min-w-[24px]`}>{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Outputs */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                          <Play className="w-5 h-5 text-blue-400" />
                          Outputs
                        </h3>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {stage.outputs.map((output, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                                <span>{output}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Data Flow Example */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                          <Database className="w-5 h-5 text-orange-400" />
                          {data ? `Real Example (${companyName} ${sampleQuarter.replace('_', ' ')})` : 'Example Data Flow'}
                        </h3>
                        <div className={`${getColorClasses(stage.color, 'bgLight')} border ${getColorClasses(stage.color, 'border')} rounded-lg p-4`}>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-bold text-white mb-1">Input:</div>
                              <div className="text-gray-300">{stage.dataFlow.input}</div>
                            </div>
                            {stage.dataFlow.processing && (
                              <div>
                                <div className="font-bold text-white mb-1">Processing:</div>
                                <div className="text-gray-300">{stage.dataFlow.processing}</div>
                              </div>
                            )}
                            {stage.dataFlow.apiCalls && (
                              <div>
                                <div className="font-bold text-white mb-1">API Calls:</div>
                                <div className="text-gray-300">{stage.dataFlow.apiCalls}</div>
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white mb-1">Output:</div>
                              <div className="text-gray-300">{stage.dataFlow.output}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sample Output */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-400" />
                          Sample Output
                        </h3>
                        <div className="bg-slate-950 rounded-lg p-4 border border-slate-700">
                          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap overflow-x-auto">
                            {stage.sampleOutput}
                          </pre>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Connecting Arrow */}
                {index < pipeline.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="text-gray-500 text-3xl">â†“</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
