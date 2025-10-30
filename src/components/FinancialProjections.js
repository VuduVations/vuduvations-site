'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const FinancialProjections = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [activeView, setActiveView] = useState('cumulative');

  useEffect(() => {
    setTimeout(() => setAnimated(true), 600);
  }, []);

  console.log('💰 Financial Projections - Raw useCases:', useCases);

  if (!useCases || useCases.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <DollarSign className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No financial data available</p>
      </div>
    );
  }

  // ✅ FIXED: Read from root level, not financial_metrics
  const totalInvestment = useCases.reduce((sum, uc) => {
    const cost = uc.estimated_cost || uc.cost || uc.financial_metrics?.implementation_cost || 0;
    console.log(`  Investment for ${uc.title}: $${cost}`);
    return sum + cost;
  }, 0);
  
  const totalAnnualSavings = useCases.reduce((sum, uc) => {
    const savings = uc.estimated_savings || uc.savings || uc.financial_metrics?.annual_savings || 0;
    console.log(`  Savings for ${uc.title}: $${savings}`);
    return sum + savings;
  }, 0);

  console.log(`💰 Total Investment: $${totalInvestment}`);
  console.log(`💰 Total Annual Savings: $${totalAnnualSavings}`);

  const annualRecurringCosts = totalInvestment * 0.15; // Assume 15% of investment as annual costs

  // Generate 3-year monthly data
  const monthlyData = [];
  let cumulativeCashFlow = -totalInvestment;
  let breakEvenMonth = null;

  for (let month = 0; month <= 36; month++) {
    const monthlySavings = totalAnnualSavings / 12;
    const monthlyRecurringCost = annualRecurringCosts / 12;
    const monthlyNetBenefit = monthlySavings - monthlyRecurringCost;
    
    cumulativeCashFlow += (month === 0 ? 0 : monthlyNetBenefit);
    
    if (breakEvenMonth === null && cumulativeCashFlow > 0) {
      breakEvenMonth = month;
    }

    monthlyData.push({
      month: month,
      quarterLabel: month % 3 === 0 ? `Q${Math.floor(month / 3)}` : '',
      investment: month === 0 ? -totalInvestment : 0,
      savings: month === 0 ? 0 : monthlySavings,
      recurringCosts: month === 0 ? 0 : -monthlyRecurringCost,
      netCashFlow: month === 0 ? -totalInvestment : monthlyNetBenefit,
      cumulativeCashFlow: cumulativeCashFlow,
      npv: cumulativeCashFlow / Math.pow(1 + 0.10/12, month),
    });
  }

  // Waterfall data for year breakdown
  const waterfallData = [
    { name: 'Initial Investment', value: -totalInvestment, fill: '#EF4444' },
    { name: 'Year 1 Savings', value: totalAnnualSavings, fill: '#10B981' },
    { name: 'Year 1 Costs', value: -annualRecurringCosts, fill: '#F59E0B' },
    { name: 'Year 2 Savings', value: totalAnnualSavings, fill: '#10B981' },
    { name: 'Year 2 Costs', value: -annualRecurringCosts, fill: '#F59E0B' },
    { name: 'Year 3 Savings', value: totalAnnualSavings, fill: '#10B981' },
    { name: 'Year 3 Costs', value: -annualRecurringCosts, fill: '#F59E0B' },
  ];

  let runningTotal = 0;
  const waterfallWithCumulative = waterfallData.map(item => {
    const start = runningTotal;
    runningTotal += item.value;
    return {
      ...item,
      start: start,
      end: runningTotal,
      displayValue: item.value
    };
  });

  // Custom tooltips
  const CumulativeTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl">
          <div className="font-bold text-white mb-2">Month {data.month}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Cumulative Cash Flow:</span>
              <span className={`font-bold ${data.cumulativeCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${(data.cumulativeCashFlow / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">NPV:</span>
              <span className={`font-bold ${data.npv >= 0 ? 'text-teal-400' : 'text-orange-400'}`}>
                ${(data.npv / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CashFlowTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl">
          <div className="font-bold text-white mb-2">Month {data.month}</div>
          <div className="space-y-1 text-sm">
            {data.savings > 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">Savings:</span>
                <span className="text-green-400 font-bold">
                  +${(data.savings / 1000).toFixed(0)}K
                </span>
              </div>
            )}
            {data.recurringCosts < 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">Recurring Costs:</span>
                <span className="text-orange-400 font-bold">
                  ${(data.recurringCosts / 1000).toFixed(0)}K
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4 pt-2 border-t border-slate-700">
              <span className="text-gray-400">Net Cash Flow:</span>
              <span className={`font-bold ${data.netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${(data.netCashFlow / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Financial Projections</h3>
            <p className="text-sm text-gray-400">3-Year Cash Flow Analysis</p>
          </div>
        </div>

        {/* View toggles */}
        <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setActiveView('cumulative')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              activeView === 'cumulative'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cumulative
          </button>
          <button
            onClick={() => setActiveView('cashflow')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              activeView === 'cashflow'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cash Flow
          </button>
          <button
            onClick={() => setActiveView('waterfall')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              activeView === 'waterfall'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Waterfall
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-2 border-red-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-xs text-gray-400">Initial Investment</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            ${(totalInvestment / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-2 border-green-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Annual Savings</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            ${(totalAnnualSavings / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-2 border-teal-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-teal-400" />
            <span className="text-xs text-gray-400">Break-Even</span>
          </div>
          <div className="text-2xl font-bold text-teal-400">
            {breakEvenMonth ? `${breakEvenMonth}mo` : 'N/A'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-gray-400">3-Year NPV</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            ${(monthlyData[36].npv / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
        {activeView === 'cumulative' && (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="npvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(value) => `M${value}`}
              />
              <YAxis 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CumulativeTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {/* Break-even line */}
              <ReferenceLine 
                y={0} 
                stroke="#64748B" 
                strokeDasharray="3 3"
                label={{ value: 'Break-Even', fill: '#94A3B8', fontSize: 12 }}
              />
              
              {/* Break-even point marker */}
              {breakEvenMonth && (
                <ReferenceLine 
                  x={breakEvenMonth} 
                  stroke="#10B981" 
                  strokeDasharray="5 5"
                  label={{ 
                    value: `Month ${breakEvenMonth}`, 
                    fill: '#10B981', 
                    fontSize: 12,
                    position: 'top'
                  }}
                />
              )}

              <Area
                type="monotone"
                dataKey="cumulativeCashFlow"
                stroke="#14B8A6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#cumulativeGradient)"
                name="Cumulative Cash Flow"
                animationDuration={2000}
              />
              <Area
                type="monotone"
                dataKey="npv"
                stroke="#A855F7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#npvGradient)"
                name="Net Present Value"
                animationDuration={2000}
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeView === 'cashflow' && (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(value) => `M${value}`}
              />
              <YAxis 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CashFlowTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              
              <Area
                type="monotone"
                dataKey="savings"
                stackId="1"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#savingsGradient)"
                name="Monthly Savings"
                animationDuration={2000}
              />
              <Area
                type="monotone"
                dataKey="recurringCosts"
                stackId="1"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#costsGradient)"
                name="Recurring Costs"
                animationDuration={2000}
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeView === 'waterfall' && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={waterfallWithCumulative} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value) => `$${(value / 1000000).toFixed(2)}M`}
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  border: '2px solid #14B8A6',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="displayValue" animationDuration={1500}>
                {waterfallWithCumulative.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Financial Summary */}
      <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="text-sm font-bold text-teal-300 mb-2">💡 Financial Summary</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">Total 3-Year Savings: </span>
            <span className="text-green-400 font-bold">
              ${((totalAnnualSavings * 3) / 1000000).toFixed(2)}M
            </span>
          </div>
          <div>
            <span className="text-gray-400">Total 3-Year Costs: </span>
            <span className="text-orange-400 font-bold">
              ${((totalInvestment + annualRecurringCosts * 3) / 1000000).toFixed(2)}M
            </span>
          </div>
          <div>
            <span className="text-gray-400">Net 3-Year Benefit: </span>
            <span className="text-teal-400 font-bold">
              ${((totalAnnualSavings * 3 - totalInvestment - annualRecurringCosts * 3) / 1000000).toFixed(2)}M
            </span>
          </div>
          <div>
            <span className="text-gray-400">Average Annual ROI: </span>
            <span className="text-purple-400 font-bold">
              {(((totalAnnualSavings - annualRecurringCosts) / totalInvestment) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialProjections;