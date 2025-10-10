'use client'
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Building2, Users, DollarSign, TrendingUp, Layers } from 'lucide-react';

const DepartmentImpact = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [viewMode, setViewMode] = useState('savings'); // savings, investment, roi, count
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 900);
  }, []);

  if (!useCases || useCases.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No department data available</p>
      </div>
    );
  }

  // Aggregate data by department
  const departmentData = useCases.reduce((acc, useCase) => {
    const dept = useCase.department || 'General';
    
    if (!acc[dept]) {
      acc[dept] = {
        name: dept,
        count: 0,
        totalInvestment: 0,
        totalSavings: 0,
        useCases: []
      };
    }

    acc[dept].count += 1;
    
    // ✅ FIX: Use the correct field names from backend
    acc[dept].totalInvestment += useCase.estimated_cost || 0;
    acc[dept].totalSavings += useCase.estimated_savings || 0;
    acc[dept].useCases.push(useCase);

    return acc;
  }, {});

  // Convert to array and calculate ROI
  const departmentArray = Object.values(departmentData).map(dept => ({
    ...dept,
    roi: dept.totalInvestment > 0 
      ? ((dept.totalSavings / dept.totalInvestment) * 100).toFixed(0)
      : 0,
    savingsM: (dept.totalSavings / 1000000).toFixed(2),
    investmentM: (dept.totalInvestment / 1000000).toFixed(2)
  })).sort((a, b) => {
    if (viewMode === 'savings') return b.totalSavings - a.totalSavings;
    if (viewMode === 'investment') return b.totalInvestment - a.totalInvestment;
    if (viewMode === 'roi') return b.roi - a.roi;
    return b.count - a.count;
  });

  // Department colors
  const departmentColors = {
    'Operations': '#14B8A6',
    'Customer Service': '#A855F7',
    'IT': '#06B6D4',
    'Sales': '#10B981',
    'Marketing': '#F59E0B',
    'Finance': '#EF4444',
    'HR': '#8B5CF6',
    'Supply Chain': '#EC4899',
    'Manufacturing': '#0EA5E9',
    'Quality': '#84CC16',
    'Clinical': '#3B82F6',
    'General': '#64748B',
    // Add fallback for any other departments
    'default': '#64748B'
  };

  const getDeptColor = (deptName) => departmentColors[deptName] || departmentColors['default'];

  // Prepare data for current view
  const getChartData = () => {
    return departmentArray.map(dept => ({
      name: dept.name,
      value: viewMode === 'savings' ? dept.totalSavings / 1000000 :
             viewMode === 'investment' ? dept.totalInvestment / 1000000 :
             viewMode === 'roi' ? parseFloat(dept.roi) :
             dept.count,
      displayValue: viewMode === 'savings' ? `$${dept.savingsM}M` :
                   viewMode === 'investment' ? `$${dept.investmentM}M` :
                   viewMode === 'roi' ? `${dept.roi}%` :
                   dept.count,
      fill: getDeptColor(dept.name)
    }));
  };

  const chartData = getChartData();

  // Pie chart data for distribution
  const pieData = departmentArray.map(dept => ({
    name: dept.name,
    value: dept.count,
    fill: getDeptColor(dept.name)
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const deptName = payload[0].payload.name;
      const dept = departmentArray.find(d => d.name === deptName);
      
      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl">
          <div className="font-bold text-white text-base mb-3">{dept.name}</div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">Use Cases:</span>
              <span className="text-white font-bold">{dept.count}</span>
            </div>
            
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">Total Investment:</span>
              <span className="text-red-400 font-bold">${dept.investmentM}M</span>
            </div>
            
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">Annual Savings:</span>
              <span className="text-green-400 font-bold">${dept.savingsM}M</span>
            </div>
            
            <div className="flex justify-between gap-6 pt-2 border-t border-slate-700">
              <span className="text-gray-400">ROI:</span>
              <span className="text-teal-400 font-bold">{dept.roi}%</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="text-xs font-bold text-gray-400 mb-1">Use Cases:</div>
            <div className="space-y-1">
              {dept.useCases.map((uc, idx) => (
                <div key={idx} className="text-xs text-gray-300 truncate">
                  • {uc.title || uc.name || 'Untitled Use Case'}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // View mode config
  const viewModes = {
    savings: { label: 'Annual Savings', icon: DollarSign, unit: 'M', color: 'text-green-400' },
    investment: { label: 'Investment', icon: TrendingUp, unit: 'M', color: 'text-red-400' },
    roi: { label: 'ROI', icon: TrendingUp, unit: '%', color: 'text-teal-400' },
    count: { label: 'Use Case Count', icon: Layers, unit: '', color: 'text-purple-400' }
  };

  // Calculate totals for summary cards
  const totalSavings = departmentArray.reduce((sum, d) => sum + d.totalSavings, 0);
  const totalInvestment = departmentArray.reduce((sum, d) => sum + d.totalInvestment, 0);

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Department Impact Analysis</h3>
            <p className="text-sm text-gray-400">Cross-Functional Resource Allocation</p>
          </div>
        </div>

        {/* View mode toggles */}
        <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          {Object.entries(viewModes).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                  viewMode === key
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-2 border-teal-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <span className="text-xs text-gray-400">Departments</span>
          </div>
          <div className="text-3xl font-bold text-teal-400">
            {departmentArray.length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-2 border-green-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Total Savings</span>
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${(totalSavings / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-2 border-red-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-red-400" />
            <span className="text-xs text-gray-400">Total Investment</span>
          </div>
          <div className="text-3xl font-bold text-red-400">
            ${(totalInvestment / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-gray-400">Top Department</span>
          </div>
          <div className="text-xl font-bold text-purple-400 truncate">
            {departmentArray[0]?.name || 'N/A'}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {departmentArray[0]?.count || 0} use cases
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-white">
                {viewModes[viewMode].label} by Department
              </h4>
            </div>

            <div className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    tickFormatter={(value) => 
                      viewMode === 'savings' || viewMode === 'investment' ? `$${value}M` :
                      viewMode === 'roi' ? `${value}%` :
                      value
                    }
                  />
                  <YAxis 
                    type="category"
                    dataKey="name"
                    stroke="#64748B"
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    width={90}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }} />
                  <Bar 
                    dataKey="value"
                    radius={[0, 8, 8, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                    onClick={(data) => setSelectedDept(data.name === selectedDept ? null : data.name)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.fill}
                        opacity={selectedDept === null || selectedDept === entry.name ? 1 : 0.4}
                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart + Department Cards */}
        <div className="space-y-4">
          {/* Pie Chart */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
            <h4 className="text-sm font-bold text-white mb-2">Use Case Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={800}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill}
                      opacity={selectedDept === null || selectedDept === entry.name ? 1 : 0.3}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} use cases`, name]}
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: '2px solid #14B8A6',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Department List */}
          <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar">
            {departmentArray.map((dept, idx) => (
              <div
                key={dept.name}
                className={`bg-slate-800/50 rounded-lg p-3 border-2 cursor-pointer transition-all ${
                  selectedDept === dept.name
                    ? 'border-teal-500 shadow-lg'
                    : 'border-slate-700 hover:border-teal-500/50'
                } ${animated ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{ 
                  transitionDelay: `${idx * 80 + 900}ms`,
                  borderLeftColor: getDeptColor(dept.name),
                  borderLeftWidth: '4px'
                }}
                onClick={() => setSelectedDept(selectedDept === dept.name ? null : dept.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">{dept.name}</span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      backgroundColor: `${getDeptColor(dept.name)}20`,
                      color: getDeptColor(dept.name)
                    }}
                  >
                    {dept.count} cases
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">Savings</div>
                    <div className="text-green-400 font-bold">${dept.savingsM}M</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Cost</div>
                    <div className="text-red-400 font-bold">${dept.investmentM}M</div>
                  </div>
                  <div>
                    <div className="text-gray-500">ROI</div>
                    <div className="text-teal-400 font-bold">{dept.roi}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="text-sm font-bold text-teal-300 mb-2">💡 Cross-Functional Insights</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">Highest ROI: </span>
            <span className="text-teal-400 font-bold">
              {[...departmentArray].sort((a, b) => b.roi - a.roi)[0]?.name} 
              ({[...departmentArray].sort((a, b) => b.roi - a.roi)[0]?.roi}%)
            </span>
          </div>
          <div>
            <span className="text-gray-400">Most Use Cases: </span>
            <span className="text-purple-400 font-bold">
              {[...departmentArray].sort((a, b) => b.count - a.count)[0]?.name} 
              ({[...departmentArray].sort((a, b) => b.count - a.count)[0]?.count})
            </span>
          </div>
          <div>
            <span className="text-gray-400">Largest Investment: </span>
            <span className="text-red-400 font-bold">
              {[...departmentArray].sort((a, b) => b.totalInvestment - a.totalInvestment)[0]?.name} 
              (${[...departmentArray].sort((a, b) => b.totalInvestment - a.totalInvestment)[0]?.investmentM}M)
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #14B8A6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0D9488;
        }
      `}</style>
    </div>
  );
};

export default DepartmentImpact;