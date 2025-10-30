'use client'
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, RadialBarChart, RadialBar } from 'recharts';
import { 
  Building2, Users, DollarSign, TrendingUp, Layers, 
  Zap, ShoppingCart, Heart, Cpu, Briefcase, 
  TrendingDown, Award, AlertCircle, CheckCircle,
  Factory, Headphones, Code, Package, UserCheck,
  Activity, BarChart3
} from 'lucide-react';

const DepartmentImpact = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [viewMode, setViewMode] = useState('savings'); // savings, investment, roi, count
  const [selectedDept, setSelectedDept] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 300);
  }, []);

  if (!useCases || useCases.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No department data available</p>
      </div>
    );
  }

  // Department icon mapping
  const departmentIcons = {
    'Operations': Factory,
    'Customer Service': Headphones,
    'IT': Code,
    'Sales': TrendingUp,
    'Marketing': Zap,
    'Finance': DollarSign,
    'HR': Users,
    'Supply Chain': Package,
    'Manufacturing': Factory,
    'Quality': CheckCircle,
    'Clinical': Heart,
    'General': Building2
  };

  const getDeptIcon = (deptName) => departmentIcons[deptName] || Building2;

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
    investmentM: (dept.totalInvestment / 1000000).toFixed(2),
    netBenefit: dept.totalSavings - dept.totalInvestment
  })).sort((a, b) => {
    if (viewMode === 'savings') return b.totalSavings - a.totalSavings;
    if (viewMode === 'investment') return b.totalInvestment - a.totalInvestment;
    if (viewMode === 'roi') return b.roi - a.roi;
    return b.count - a.count;
  });

  // Enhanced department colors with gradients
  const departmentColors = {
    'Operations': { main: '#14B8A6', gradient: 'from-teal-500 to-cyan-600', glow: 'shadow-teal-500/50' },
    'Customer Service': { main: '#A855F7', gradient: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/50' },
    'IT': { main: '#06B6D4', gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/50' },
    'Sales': { main: '#10B981', gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/50' },
    'Marketing': { main: '#F59E0B', gradient: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/50' },
    'Finance': { main: '#EF4444', gradient: 'from-red-500 to-rose-600', glow: 'shadow-red-500/50' },
    'HR': { main: '#8B5CF6', gradient: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/50' },
    'Supply Chain': { main: '#EC4899', gradient: 'from-pink-500 to-rose-600', glow: 'shadow-pink-500/50' },
    'Manufacturing': { main: '#0EA5E9', gradient: 'from-sky-500 to-blue-600', glow: 'shadow-sky-500/50' },
    'Quality': { main: '#84CC16', gradient: 'from-lime-500 to-green-600', glow: 'shadow-lime-500/50' },
    'Clinical': { main: '#3B82F6', gradient: 'from-blue-500 to-indigo-600', glow: 'shadow-blue-500/50' },
    'General': { main: '#64748B', gradient: 'from-slate-500 to-gray-600', glow: 'shadow-slate-500/50' },
    'default': { main: '#64748B', gradient: 'from-slate-500 to-gray-600', glow: 'shadow-slate-500/50' }
  };

  const getDeptColor = (deptName) => (departmentColors[deptName] || departmentColors['default']).main;
  const getDeptGradient = (deptName) => (departmentColors[deptName] || departmentColors['default']).gradient;
  const getDeptGlow = (deptName) => (departmentColors[deptName] || departmentColors['default']).glow;

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
      const DeptIcon = getDeptIcon(dept.name);
      
      return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-teal-500 rounded-xl p-5 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getDeptGradient(dept.name)} flex items-center justify-center ${getDeptGlow(dept.name)} shadow-lg`}>
              <DeptIcon className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-white text-lg">{dept.name}</div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-8">
              <span className="text-white/70 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Use Cases:
              </span>
              <span className="text-white font-bold text-lg">{dept.count}</span>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            
            <div className="flex items-center justify-between gap-8">
              <span className="text-white/70 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Investment:
              </span>
              <span className="text-red-400 font-bold text-lg">${dept.investmentM}M</span>
            </div>
            
            <div className="flex items-center justify-between gap-8">
              <span className="text-white/70 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Annual Savings:
              </span>
              <span className="text-green-400 font-bold text-lg">${dept.savingsM}M</span>
            </div>
            
            <div className="flex items-center justify-between gap-8 pt-2 border-t-2 border-teal-500/50">
              <span className="text-white/70 flex items-center gap-2">
                <Award className="w-4 h-4" />
                ROI:
              </span>
              <span className="text-teal-400 font-bold text-xl">{dept.roi}%</span>
            </div>

            <div className="flex items-center justify-between gap-8">
              <span className="text-white/70 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Net Benefit:
              </span>
              <span className={`font-bold text-lg ${dept.netBenefit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${(dept.netBenefit / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-xs font-bold text-teal-300 mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Active Use Cases:
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
              {dept.useCases.map((uc, idx) => (
                <div key={idx} className="text-xs text-white/80 flex items-start gap-2 py-1">
                  <CheckCircle className="w-3 h-3 text-teal-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{uc.title || uc.name || 'Untitled Use Case'}</span>
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
    savings: { label: 'Annual Savings', icon: DollarSign, unit: 'M', color: 'text-green-400', gradient: 'from-green-500 to-emerald-600' },
    investment: { label: 'Investment', icon: TrendingDown, unit: 'M', color: 'text-red-400', gradient: 'from-red-500 to-rose-600' },
    roi: { label: 'ROI', icon: Award, unit: '%', color: 'text-teal-400', gradient: 'from-teal-500 to-cyan-600' },
    count: { label: 'Use Case Count', icon: Layers, unit: '', color: 'text-purple-400', gradient: 'from-purple-500 to-pink-600' }
  };

  // Calculate totals for summary cards
  const totalSavings = departmentArray.reduce((sum, d) => sum + d.totalSavings, 0);
  const totalInvestment = departmentArray.reduce((sum, d) => sum + d.totalInvestment, 0);
  const totalROI = totalInvestment > 0 ? ((totalSavings / totalInvestment) * 100).toFixed(0) : 0;

  return (
    <div className="relative">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-2 border-teal-500/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse`}></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                Department Impact Analysis
              </h3>
              <p className="text-sm text-white/80 mt-1 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Cross-Functional Resource Allocation & ROI Tracking
              </p>
            </div>
          </div>

          {/* View mode toggles - Enhanced */}
          <div className="flex gap-2 bg-slate-900/80 rounded-xl p-2 border-2 border-slate-700/50 shadow-xl backdrop-blur-sm">
            {Object.entries(viewModes).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  className={`relative px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    viewMode === key
                      ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg scale-105`
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {viewMode === key && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-lg blur-md opacity-50 animate-pulse`}></div>
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden md:inline">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Summary Cards with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Departments Card */}
          <div 
            className={`group relative bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border-2 border-teal-500/50 rounded-xl p-5 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getDeptGlow('IT')} ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '100ms' }}
            onMouseEnter={() => setHoveredCard('depts')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-white/90 font-semibold uppercase tracking-wide">Departments</span>
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                {departmentArray.length}
              </div>
              <div className="text-xs text-teal-300 font-medium">Active business units</div>
            </div>
          </div>

          {/* Total Savings Card */}
          <div 
            className={`group relative bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getDeptGlow('Sales')} ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard('savings')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-white/90 font-semibold uppercase tracking-wide">Total Savings</span>
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                ${(totalSavings / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-green-300 font-medium">Annual recurring benefit</div>
            </div>
          </div>

          {/* Total Investment Card */}
          <div 
            className={`group relative bg-gradient-to-br from-red-900/30 to-rose-900/30 border-2 border-red-500/50 rounded-xl p-5 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getDeptGlow('Finance')} ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
            onMouseEnter={() => setHoveredCard('investment')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-white/90 font-semibold uppercase tracking-wide">Investment</span>
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent mb-1">
                ${(totalInvestment / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-red-300 font-medium">Total capital required</div>
            </div>
          </div>

          {/* Portfolio ROI Card */}
          <div 
            className={`group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-5 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getDeptGlow('Marketing')} ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard('roi')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-white/90 font-semibold uppercase tracking-wide">Portfolio ROI</span>
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                {totalROI}%
              </div>
              <div className="text-xs text-purple-300 font-medium">Blended return rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/40 rounded-2xl p-6 border-2 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-teal-400" />
                    {viewModes[viewMode].label} by Department
                  </h4>
                  <p className="text-xs text-white/60 mt-1">Click bars to filter • Hover for details</p>
                </div>
                {selectedDept && (
                  <button
                    onClick={() => setSelectedDept(null)}
                    className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Clear Filter
                  </button>
                )}
              </div>

              <div className={`transition-all duration-1000 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 40, left: 120, bottom: 10 }}>
                    <defs>
                      {chartData.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={entry.fill} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={entry.fill} stopOpacity={1} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} opacity={0.3} />
                    <XAxis 
                      type="number"
                      stroke="#64748B"
                      tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
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
                      tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                      width={110}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.15)' }} />
                    <Bar 
                      dataKey="value"
                      radius={[0, 12, 12, 0]}
                      animationDuration={1800}
                      animationBegin={400}
                      onClick={(data) => setSelectedDept(data.name === selectedDept ? null : data.name)}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={`url(#barGradient-${index})`}
                          opacity={selectedDept === null || selectedDept === entry.name ? 1 : 0.25}
                          style={{ 
                            cursor: 'pointer', 
                            transition: 'all 0.3s ease',
                            filter: selectedDept === entry.name ? 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))' : 'none'
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Pie Chart + Department Cards */}
          <div className="space-y-4">
            {/* Enhanced Pie Chart */}
            <div className="bg-slate-800/40 rounded-2xl p-5 border-2 border-slate-700/50 backdrop-blur-sm shadow-xl">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                Use Case Distribution
              </h4>
              <div className={`transition-all duration-1000 ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <defs>
                      {pieData.map((entry, index) => (
                        <radialGradient key={`pieGradient-${index}`} id={`pieGradient-${index}`}>
                          <stop offset="0%" stopColor={entry.fill} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.fill} stopOpacity={0.7} />
                        </radialGradient>
                      ))}
                    </defs>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={1800}
                      animationBegin={600}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#pieGradient-${index})`}
                          opacity={selectedDept === null || selectedDept === entry.name ? 1 : 0.3}
                          stroke={entry.fill}
                          strokeWidth={2}
                          style={{
                            filter: selectedDept === entry.name ? `drop-shadow(0 0 10px ${entry.fill})` : 'none'
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} use cases`, name]}
                      contentStyle={{ 
                        backgroundColor: '#0F172A', 
                        border: '2px solid #14B8A6',
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                        color: '#FFFFFF'
                      }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '4px' }}
                      itemStyle={{ color: '#E2E8F0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Enhanced Department Cards */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
              {departmentArray.map((dept, idx) => {
                const DeptIcon = getDeptIcon(dept.name);
                return (
                  <div
                    key={dept.name}
                    className={`group relative bg-slate-800/60 rounded-xl p-4 border-2 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                      selectedDept === dept.name
                        ? 'border-teal-500 shadow-2xl shadow-teal-500/30 bg-slate-800/90'
                        : 'border-slate-700 hover:border-teal-500/60 hover:bg-slate-800/80'
                    } ${animated ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                    style={{ 
                      transitionDelay: `${idx * 100 + 500}ms`,
                      borderLeftColor: getDeptColor(dept.name),
                      borderLeftWidth: '5px'
                    }}
                    onClick={() => setSelectedDept(selectedDept === dept.name ? null : dept.name)}
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} 
                         style={{ background: `radial-gradient(circle at center, ${getDeptColor(dept.name)}15, transparent 70%)` }}>
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getDeptGradient(dept.name)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <DeptIcon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-white text-sm">{dept.name}</span>
                        </div>
                        <span 
                          className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                          style={{ 
                            backgroundColor: `${getDeptColor(dept.name)}25`,
                            color: getDeptColor(dept.name),
                            border: `1px solid ${getDeptColor(dept.name)}40`
                          }}
                        >
                          {dept.count} {dept.count === 1 ? 'case' : 'cases'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-white/70 text-[10px] uppercase font-semibold mb-1">Savings</div>
                          <div className="text-green-400 font-bold text-sm">${dept.savingsM}M</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/70 text-[10px] uppercase font-semibold mb-1">Cost</div>
                          <div className="text-red-400 font-bold text-sm">${dept.investmentM}M</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/70 text-[10px] uppercase font-semibold mb-1">ROI</div>
                          <div className="text-teal-400 font-bold text-sm">{dept.roi}%</div>
                        </div>
                      </div>

                      {/* Mini progress bar for ROI */}
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-1000 rounded-full"
                            style={{ 
                              width: `${Math.min((dept.roi / 500) * 100, 100)}%`,
                              transitionDelay: `${idx * 100 + 800}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Insights Section */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border-2 border-teal-500/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-teal-400" />
            <div className="text-base font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Cross-Functional Intelligence
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-teal-400" />
                <span className="text-white/80 text-xs font-semibold">Highest ROI Department</span>
              </div>
              <div className="text-xl font-bold text-teal-400">
                {[...departmentArray].sort((a, b) => b.roi - a.roi)[0]?.name}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {[...departmentArray].sort((a, b) => b.roi - a.roi)[0]?.roi}% return on investment
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="text-white/80 text-xs font-semibold">Most Active Department</span>
              </div>
              <div className="text-xl font-bold text-purple-400">
                {[...departmentArray].sort((a, b) => b.count - a.count)[0]?.name}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {[...departmentArray].sort((a, b) => b.count - a.count)[0]?.count} active use cases
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-red-400" />
                <span className="text-white/80 text-xs font-semibold">Largest Investment</span>
              </div>
              <div className="text-xl font-bold text-red-400">
                {[...departmentArray].sort((a, b) => b.totalInvestment - a.totalInvestment)[0]?.name}
              </div>
              <div className="text-xs text-white/60 mt-1">
                ${[...departmentArray].sort((a, b) => b.totalInvestment - a.totalInvestment)[0]?.investmentM}M capital required
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes wave {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0F172A;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #14B8A6, #0D9488);
            border-radius: 4px;
            border: 2px solid #0F172A;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #0D9488, #0F766E);
          }
        `}</style>
      </div>
    </div>
  );
};

export default DepartmentImpact;