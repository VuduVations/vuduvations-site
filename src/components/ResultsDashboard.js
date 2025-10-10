'use client'

import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, BarChart3, Clock, FileText, 
  Target, Download, Copy, RefreshCw, Menu, ChevronUp
} from 'lucide-react';

// Existing components
import UseCaseCard from '@/components/UseCaseCard';
import RoadmapSection from '@/components/RoadmapSection';
import NextStepsSection from '@/components/NextStepsSection';

// Dashboard components
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import ROIComparisonChart from '@/components/dashboard/ROIComparisonChart';
import StrategicMatrix from '@/components/dashboard/StrategicMatrix';
import TimelineGantt from '@/components/dashboard/TimelineGantt';
import FinancialProjections from '@/components/dashboard/FinancialProjections';
import RiskHeatmap from '@/components/dashboard/RiskHeatmap';
import VendorLandscape from '@/components/dashboard/VendorLandscape';
import DepartmentImpact from '@/components/DepartmentImpact';

// Utils
import { exportToPDFText, copyToClipboard } from '@/utils/pdfExport';

const ResultsDashboard = ({ analysisResults, formData, onReset, showToast }) => {
  const [expandedUseCases, setExpandedUseCases] = useState({ 0: true });
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // ✅ FIXED DEBUG LOGS - Using correct prop names
  console.log('=== RESULTS DASHBOARD DEBUG ===');
  console.log('📦 Full analysisResults:', analysisResults);
  console.log('🎯 top_use_cases:', analysisResults?.top_use_cases);
  console.log('📊 Use cases count:', analysisResults?.top_use_cases?.length);
  console.log('💰 Financial summary:', analysisResults?.financial_summary);
  
  // Log each use case individually to check for duplicates
  if (analysisResults?.top_use_cases) {
    console.log('🔍 Individual use cases:');
    analysisResults.top_use_cases.forEach((uc, idx) => {
      console.log(`  [${idx}] ${uc.title}:`, {
        cost: uc.estimated_cost,
        roi: uc.estimated_roi,
        savings: uc.estimated_savings,
        department: uc.department
      });
    });
  }
  console.log('=================================');

  const toggleUseCase = (index) => {
    setExpandedUseCases(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowNav(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll for "back to top" button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation sections
  const navSections = [
    { id: 'header', label: 'Overview', icon: FileText },
    { id: 'metrics', label: 'Key Metrics', icon: BarChart3 },
    { id: 'executive-summary', label: 'Executive Summary', icon: FileText },
    { id: 'roi-chart', label: 'ROI Analysis', icon: TrendingUp },
    { id: 'strategic-matrix', label: 'Strategic Matrix', icon: Target },
    { id: 'financial', label: 'Financial Projections', icon: DollarSign },
    { id: 'timeline', label: 'Implementation Timeline', icon: Clock },
    { id: 'risk', label: 'Risk Assessment', icon: Target },
    { id: 'vendors', label: 'Vendor Landscape', icon: BarChart3 },
    { id: 'departments', label: 'Department Impact', icon: BarChart3 },
    { id: 'use-cases', label: 'Use Case Details', icon: Target },
  ];

  return (
    <div id="results-container" className="relative">
      {/* Floating Navigation Menu */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={() => setShowNav(!showNav)}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-3 rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-110"
        >
          <Menu className="w-6 h-6" />
        </button>

        {showNav && (
          <div className="absolute top-14 right-0 bg-slate-900 border-2 border-teal-500 rounded-2xl shadow-2xl p-4 w-64 animate-fadeIn">
            <div className="text-sm font-bold text-teal-300 mb-3">Quick Navigation</div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {navSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-teal-600 hover:text-white transition-all text-left text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Header Section */}
      <div id="header" className="space-y-6 mb-8">
        {/* Header with Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-teal-500 rounded-2xl p-6 shadow-2xl">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              AI Discovery Results
            </h2>
            <p className="text-xl text-gray-300 mt-2">{formData.company_name}</p>
            <p className="text-sm text-gray-400">{formData.industry}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportToPDFText(analysisResults, formData, showToast, setIsExportingPDF)}
              disabled={isExportingPDF}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/50"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">{isExportingPDF ? 'Generating...' : 'Export PDF'}</span>
            </button>
            
            <button
              onClick={() => copyToClipboard(JSON.stringify(analysisResults, null, 2), showToast)}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              <Copy className="w-5 h-5" />
              <span className="font-semibold">Copy JSON</span>
            </button>
            
            <button
              onClick={onReset}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-teal-500/50"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-semibold">New Analysis</span>
            </button>
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
      </div>

      {/* 1. Metrics Overview Section */}
      <section id="metrics" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-white">Key Performance Indicators</h3>
        </div>
        <MetricsOverview analysisResults={analysisResults} />
      </section>

      {/* 2. Executive Summary */}
      <section id="executive-summary" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-white">Executive Summary</h3>
        </div>
        <div className="bg-gradient-to-r from-teal-900 to-cyan-900 bg-opacity-30 border-2 border-teal-500 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-teal-400" />
            <h4 className="text-2xl font-bold">Strategic Overview</h4>
          </div>
          <div className="bg-black bg-opacity-60 rounded-xl p-6">
            <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-300">
              {analysisResults.executive_summary}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROI Comparison Chart */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="roi-chart" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Return on Investment Analysis</h3>
          </div>
          <ROIComparisonChart useCases={analysisResults.top_use_cases} />
        </section>
      )}

      {/* 4. Strategic Matrix */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="strategic-matrix" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Strategic Prioritization</h3>
          </div>
          <StrategicMatrix useCases={analysisResults.top_use_cases} />
        </section>
      )}

      {/* 5. Financial Projections */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="financial" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">3-Year Financial Outlook</h3>
          </div>
          <FinancialProjections useCases={analysisResults.top_use_cases} />
        </section>
      )}

      {/* 6. Implementation Timeline */}
      {analysisResults.implementation_roadmap && analysisResults.implementation_roadmap.length > 0 && (
        <section id="timeline" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Implementation Roadmap</h3>
          </div>
          <TimelineGantt 
            roadmap={analysisResults.implementation_roadmap} 
            useCases={analysisResults.top_use_cases || []}
          />
        </section>
      )}

      {/* 7. Risk Assessment */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="risk" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Risk Analysis & Mitigation</h3>
          </div>
          <RiskHeatmap useCases={analysisResults.top_use_cases} />
        </section>
      )}

      {/* 8. Vendor Landscape */}
      <section id="vendors" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-white">Vendor Ecosystem</h3>
        </div>
        <VendorLandscape 
          vendors={[]} 
          industry={formData.industry}
        />
      </section>

      {/* 9. Department Impact */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="departments" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Cross-Functional Impact</h3>
          </div>
          <DepartmentImpact useCases={analysisResults.top_use_cases} />
        </section>
      )}

      {/* 10. Detailed Use Cases (Original Component) */}
      {analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0 && (
        <section id="use-cases" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
            <h3 className="text-3xl font-bold text-white">Detailed Use Case Analysis</h3>
          </div>
          <div className="space-y-4">
            {analysisResults.top_use_cases.map((useCase, idx) => (
              <UseCaseCard
                key={idx}
                useCase={useCase}
                index={idx}
                isExpanded={expandedUseCases[idx]}
                onToggle={() => toggleUseCase(idx)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 11. Legacy Roadmap Section (if you want to keep it) */}
      {analysisResults.implementation_roadmap && analysisResults.implementation_roadmap.length > 0 && (
        <section className="mb-12">
          <RoadmapSection roadmap={analysisResults.implementation_roadmap} />
        </section>
      )}

      {/* 12. Next Steps */}
      {analysisResults.next_steps && analysisResults.next_steps.length > 0 && (
        <section className="mb-12">
          <NextStepsSection steps={analysisResults.next_steps} />
        </section>
      )}

      {/* 13. Metadata Footer */}
      {analysisResults.metadata && (
        <section className="mb-12">
          <div className="bg-black bg-opacity-40 border border-teal-500 rounded-xl p-6">
            <h4 className="font-bold text-lg text-teal-300 mb-4">Analysis Metadata</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <span className="block text-gray-500 mb-1">Analysis Date</span>
                <span className="text-white font-semibold">{analysisResults.analysis_date}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Duration</span>
                <span className="text-white font-semibold">
                  {analysisResults.metadata.analysis_duration_seconds?.toFixed(1)}s
                </span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">AI Model</span>
                <span className="text-white font-semibold">{analysisResults.metadata.model}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Framework</span>
                <span className="text-white font-semibold">{analysisResults.metadata.framework}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent mb-8"></div>

      {/* End of Report */}
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm mb-4">End of AI Discovery Report</p>
        <button
          onClick={scrollToTop}
          className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-2 mx-auto"
        >
          <ChevronUp className="w-4 h-4" />
          Back to Top
        </button>
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
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
      `}</style>
    </div>
  );
};

export default ResultsDashboard;