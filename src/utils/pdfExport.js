import jsPDF from 'jspdf';
import { BRAND_COLORS } from '../constants/config';

export const exportToPDFText = async (analysisResults, formData, showToast, setIsExportingPDF) => {
  setIsExportingPDF(true);
  showToast('Generating PDF...', 'info');
  
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 25;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    const pageHeight = pdf.internal.pageSize.getHeight();
    let y = margin;
    
    const { vuduTeal, vuduPurple, vuduCyan, vuduDark, vuduGray, vuduLight } = BRAND_COLORS;
    
    // Helper: Check if new page needed
    const checkNewPage = (spaceNeeded = 15) => {
      if (y > pageHeight - margin - spaceNeeded) {
        pdf.addPage();
        y = margin;
        return true;
      }
      return false;
    };
    
    // Helper: Add text with word wrap
    const addText = (text, fontSize = 10, isBold = false, color = vuduDark, indent = 0) => {
      pdf.setFontSize(fontSize);
      pdf.setTextColor(...color);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const effectiveWidth = contentWidth - indent;
      const lines = pdf.splitTextToSize(text, effectiveWidth);
      
      lines.forEach(line => {
        checkNewPage();
        pdf.text(line, margin + indent, y);
        y += fontSize * 0.5;
      });
      
      y += fontSize * 0.2;
    };
    
    // Helper: Add section header
    const addSection = (title, color = vuduTeal) => {
      checkNewPage(20);
      y += 8;
      
      pdf.setFillColor(...color);
      pdf.rect(margin, y - 2, 4, 8, 'F');
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...vuduDark);
      pdf.text(title, margin + 8, y + 4);
      
      y += 10;
      
      pdf.setDrawColor(...color);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 8;
    };

    // Helper: Add Bar Chart
    const addBarChart = (data, title, startY) => {
      const chartHeight = 45;  // Increased from 40
      const chartWidth = contentWidth - 20;
      const barWidth = Math.min((chartWidth / data.length) - 4, 25);  // Cap bar width
      const maxValue = Math.max(...data.map(d => d.value));
      
      y = startY;
      
      // Title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...vuduDark);
      pdf.text(title, margin + 10, y);
      y += 8;
      
      // Chart background
      pdf.setFillColor(250, 250, 252);
      pdf.rect(margin + 10, y, chartWidth, chartHeight, 'F');
      
      // Border
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.rect(margin + 10, y, chartWidth, chartHeight, 'S');
      
      // Calculate spacing
      const totalBarWidth = data.length * barWidth;
      const spacing = (chartWidth - totalBarWidth) / (data.length + 1);
      
      // Draw bars
      data.forEach((item, idx) => {
        const barHeight = (item.value / maxValue) * (chartHeight - 15);
        const x = margin + 10 + spacing + (idx * (barWidth + spacing));
        const barY = y + chartHeight - barHeight - 8;
        
        // Gradient bars
        const steps = 20;
        for (let i = 0; i < steps; i++) {
          const alpha = i / steps;
          const r = vuduTeal[0] + (vuduPurple[0] - vuduTeal[0]) * alpha;
          const g = vuduTeal[1] + (vuduPurple[1] - vuduTeal[1]) * alpha;
          const b = vuduTeal[2] + (vuduPurple[2] - vuduTeal[2]) * alpha;
          pdf.setFillColor(r, g, b);
          pdf.rect(x, barY + (i * barHeight / steps), barWidth, barHeight / steps, 'F');
        }
        
        // Value on top
        pdf.setFontSize(9);
        pdf.setTextColor(...vuduDark);
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.value.toString(), x + barWidth / 2, barY - 2, { align: 'center' });
        
        // Label below - FIXED: Better text wrapping
        pdf.setFontSize(7);
        pdf.setTextColor(...vuduGray);
        pdf.setFont('helvetica', 'normal');
        
        // Split label into words and wrap intelligently
        const words = item.label.split(' ');
        let line1 = '';
        let line2 = '';
        
        words.forEach((word, wIdx) => {
          if (wIdx < Math.ceil(words.length / 2)) {
            line1 += (line1 ? ' ' : '') + word;
          } else {
            line2 += (line2 ? ' ' : '') + word;
          }
        });
        
        // Truncate if still too long
        if (pdf.getTextWidth(line1) > barWidth) {
          line1 = line1.substring(0, 10) + '...';
        }
        if (pdf.getTextWidth(line2) > barWidth) {
          line2 = line2.substring(0, 10) + '...';
        }
        
        pdf.text(line1, x + barWidth / 2, y + chartHeight + 3, { align: 'center' });
        if (line2) {
          pdf.text(line2, x + barWidth / 2, y + chartHeight + 6, { align: 'center' });
        }
      });
      
      y += chartHeight + 15;  // Increased spacing
      return y;
    };

    // Helper: Add Pie Chart (ROI Distribution)
    const addPieChart = (data, title, startY) => {
      const centerX = pageWidth / 2;
      const centerY = startY + 35;
      const radius = 25;
      
      y = startY;
      
      // Title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...vuduDark);
      pdf.text(title, centerX, y, { align: 'center' });
      y += 10;
      
      const total = data.reduce((sum, d) => sum + d.value, 0);
      let currentAngle = -90;
      
      const colors = [
        vuduTeal,
        vuduPurple,
        vuduCyan,
        [234, 179, 8], // Yellow
        [239, 68, 68]  // Red
      ];
      
      data.forEach((item, idx) => {
        const sliceAngle = (item.value / total) * 360;
        
        pdf.setFillColor(...colors[idx % colors.length]);
        
        // Draw slice
        const startAngle = (currentAngle * Math.PI) / 180;
        const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;
        
        pdf.circle(centerX, centerY, radius, 'F');
        
        // This is a simplified pie - for production use a proper pie chart library
        // or draw arcs properly with multiple segments
        
        currentAngle += sliceAngle;
      });
      
      // Legend
      y = centerY + radius + 10;
      data.forEach((item, idx) => {
        pdf.setFillColor(...colors[idx % colors.length]);
        pdf.rect(margin + 10, y, 4, 4, 'F');
        
        pdf.setFontSize(9);
        pdf.setTextColor(...vuduDark);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${item.label}: ${item.value}%`, margin + 17, y + 3);
        
        y += 6;
      });
      
      y += 5;
      return y;
    };

    // Helper: Add Timeline Visualization
    const addTimeline = (phases, startY) => {
      y = startY;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...vuduDark);
      pdf.text('Implementation Timeline', margin + 10, y);
      y += 10;
      
      const timelineWidth = contentWidth - 20;
      const phaseWidth = (timelineWidth / phases.length) - 5;
      
      phases.forEach((phase, idx) => {
        const x = margin + 10 + (idx * (phaseWidth + 5));
        const color = idx % 2 === 0 ? vuduTeal : vuduPurple;
        
        // Phase box
        pdf.setFillColor(...color);
        pdf.roundedRect(x, y, phaseWidth, 25, 2, 2, 'F');
        
        // Phase number circle
        pdf.setFillColor(255, 255, 255);
        pdf.circle(x + 8, y + 8, 5, 'F');
        
        pdf.setTextColor(...color);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${phase.phase_number}`, x + 8, y + 10, { align: 'center' });
        
        // Phase name - FIXED: Better wrapping
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        
        const nameLines = pdf.splitTextToSize(phase.phase_name, phaseWidth - 25);
        nameLines.forEach((line, lineIdx) => {
          pdf.text(line, x + 20, y + 8 + (lineIdx * 4));
        });
        
        // Duration below
        pdf.setFontSize(7);
        pdf.setTextColor(...vuduGray);
        pdf.setFont('helvetica', 'normal');
        pdf.text(phase.duration, x + phaseWidth / 2, y + 30, { align: 'center' });
        
        // Arrow
        if (idx < phases.length - 1) {
          pdf.setDrawColor(...color);
          pdf.setLineWidth(2);
          const arrowX = x + phaseWidth;
          const arrowY = y + 12.5;
          
          pdf.line(arrowX, arrowY, arrowX + 5, arrowY);
          // Arrowhead
          pdf.line(arrowX + 2, arrowY - 2, arrowX + 5, arrowY);
          pdf.line(arrowX + 2, arrowY + 2, arrowX + 5, arrowY);
        }
      });
      
      y += 40;
      return y;
    };
    
    // ========================================================================
    // COVER PAGE
    // ========================================================================
    
    // Gradient background
    for (let i = 0; i < 60; i++) {
      const alpha = i / 60;
      const r = vuduTeal[0] + (vuduPurple[0] - vuduTeal[0]) * alpha;
      const g = vuduTeal[1] + (vuduPurple[1] - vuduTeal[1]) * alpha;
      const b = vuduTeal[2] + (vuduPurple[2] - vuduTeal[2]) * alpha;
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i * (pageHeight / 60), pageWidth, pageHeight / 60, 'F');
    }
    
    // White content box
    // ========================================================================
    // COVER PAGE - BLACK & WHITE PROFESSIONAL
    // ========================================================================
    
    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Thin top border accent
    pdf.setFillColor(...vuduTeal);
    pdf.rect(0, 0, pageWidth, 3, 'F');
    
    // VuduVations logo (centered, black & teal)
    y = 80;
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(56);
    pdf.setFont('helvetica', 'bold');
    const vuduWidth = pdf.getTextWidth('Vudu');
    const totalWidth = vuduWidth + pdf.getTextWidth('Vations');
    const vuduX = (pageWidth - totalWidth) / 2;
    pdf.text('Vudu', vuduX, y);
    
    pdf.setTextColor(...vuduTeal);
    pdf.text('Vations', vuduX + vuduWidth, y);
    
    y += 3;
    
    // Simple underline
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(vuduX, y, vuduX + totalWidth, y);
    
    y += 12;
    
    // Tagline
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Decoding The Future - One Vector At A Time', pageWidth / 2, y, { align: 'center' });
    
    y += 35;
    
    // Report title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI Use Case', pageWidth / 2, y, { align: 'center' });
    
    y += 14;
    pdf.text('Discovery Report', pageWidth / 2, y, { align: 'center' });
    
    y += 30;
    
    // Company info box with border
    const boxY = y;
    pdf.setDrawColor(...vuduTeal);
    pdf.setLineWidth(2);
    pdf.roundedRect(margin + 30, boxY, contentWidth - 60, 35, 3, 3, 'S');
    
    y = boxY + 12;
    
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(formData.company_name, pageWidth / 2, y, { align: 'center' });
    
    y += 10;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text(formData.industry, pageWidth / 2, y, { align: 'center' });
    
    y += 8;
    
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, pageWidth / 2, y, { align: 'center' });
    
    // Footer
    y = pageHeight - 40;
    
    // Decorative dots
    pdf.setFillColor(200, 200, 200);
    for (let i = 0; i < 5; i++) {
      const dotX = pageWidth / 2 - 12 + (i * 6);
      pdf.circle(dotX, y, 0.8, 'F');
    }
    
    y += 8;
    
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Powered by Multi-Agent AI Analytics', pageWidth / 2, y, { align: 'center' });
    
    y += 5;
    
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.setFont('helvetica', 'normal');
    pdf.text('VuduVations © 2025', pageWidth / 2, y, { align: 'center' });
    
    // ========================================================================
    // PAGE 2: EXECUTIVE SUMMARY WITH CHARTS
    // ========================================================================
    
    pdf.addPage();
    y = margin;
    
    addSection('EXECUTIVE SUMMARY', vuduPurple);
    addText(analysisResults.executive_summary, 11, false, vuduDark);
    
    // Key Metrics Dashboard
    checkNewPage(60);
    y += 5;
    
    const metricsBoxY = y;
    
    // Gradient header
    for (let i = 0; i < 8; i++) {
      const alpha = i / 8;
      const r = vuduTeal[0] + (vuduPurple[0] - vuduTeal[0]) * alpha;
      const g = vuduTeal[1] + (vuduPurple[1] - vuduTeal[1]) * alpha;
      const b = vuduTeal[2] + (vuduPurple[2] - vuduTeal[2]) * alpha;
      pdf.setFillColor(r, g, b);
      pdf.rect(margin, y + (i * 0.8), contentWidth, 0.8, 'F');
    }
    
    y += 6.4;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('KEY METRICS', margin + 5, y);
    y += 8;
    
    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin, y, contentWidth, 40, 'F');
    pdf.setDrawColor(...vuduPurple);
    pdf.setLineWidth(1);
    pdf.rect(margin, metricsBoxY, contentWidth, 54, 'S');
    
    y += 2;
    const metricsContentY = y;
    const col1X = margin + 10;
    const col2X = margin + contentWidth / 2 + 5;
    
    // Metrics display
    pdf.setFontSize(9);
    pdf.setTextColor(...vuduGray);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AVERAGE ROI', col1X, metricsContentY);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...vuduTeal);
    pdf.text(`${analysisResults.total_potential_roi?.toFixed(0) || 0}%`, col1X, metricsContentY + 10);
    
    pdf.setFontSize(9);
    pdf.setTextColor(...vuduGray);
    pdf.setFont('helvetica', 'normal');
    pdf.text('USE CASES IDENTIFIED', col1X, metricsContentY + 20);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...vuduPurple);
    pdf.text(`${analysisResults.top_use_cases?.length || 0}`, col1X, metricsContentY + 30);
    
    pdf.setFontSize(9);
    pdf.setTextColor(...vuduGray);
    pdf.setFont('helvetica', 'normal');
    pdf.text('TOTAL INVESTMENT', col2X, metricsContentY);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...vuduTeal);
    pdf.text(`$${((analysisResults.total_estimated_investment || 0) / 1000).toFixed(0)}K`, col2X, metricsContentY + 10);
    
    pdf.setFontSize(9);
    pdf.setTextColor(...vuduGray);
    pdf.setFont('helvetica', 'normal');
    pdf.text('IMPLEMENTATION TIMELINE', col2X, metricsContentY + 20);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...vuduPurple);
    pdf.text(`${(analysisResults.implementation_roadmap?.length || 0) * 6}mo`, col2X, metricsContentY + 30);
    
    y = metricsBoxY + 60;
    
    // ========================================================================
    // ADD BAR CHART - ROI by Use Case
    // ========================================================================
    
    if (analysisResults.top_use_cases && analysisResults.top_use_cases.length > 0) {
      pdf.addPage();
      y = margin;
      
      const chartData = analysisResults.top_use_cases.slice(0, 5).map(uc => ({
        label: uc.name.substring(0, 15) + '...',
        value: uc.financial_metrics.roi_percentage
      }));
      
      y = addBarChart(chartData, 'ROI Comparison by Use Case (%)', y);
      
      // Add Investment vs Savings Chart
      const investmentData = analysisResults.top_use_cases.slice(0, 5).map(uc => ({
        label: uc.name.substring(0, 12),
        value: Math.round(uc.financial_metrics.implementation_cost / 1000)
      }));
      
      y += 10;
      y = addBarChart(investmentData, 'Implementation Investment ($K)', y);
    }
    
    // ========================================================================
    // ADD TIMELINE VISUALIZATION
    // ========================================================================
    
    if (analysisResults.implementation_roadmap && analysisResults.implementation_roadmap.length > 0) {
      checkNewPage(50);
      y += 10;
      y = addTimeline(analysisResults.implementation_roadmap, y);
    }
    
    // ========================================================================
    // USE CASES (rest of your existing code)
    // ========================================================================
    
    if (analysisResults.top_use_cases) {
      pdf.addPage();
      y = margin;
      
      addSection('TOP AI OPPORTUNITIES', vuduTeal);
      
      analysisResults.top_use_cases.forEach((useCase) => {
        checkNewPage(65);
        
        const boxStartY = y;
        
        // Gradient header
        for (let i = 0; i < 6; i++) {
          const alpha = i / 6;
          const r = vuduTeal[0] + (vuduPurple[0] - vuduTeal[0]) * alpha * 0.3;
          const g = vuduTeal[1] + (vuduPurple[1] - vuduTeal[1]) * alpha * 0.3;
          const b = vuduTeal[2] + (vuduPurple[2] - vuduTeal[2]) * alpha * 0.3;
          pdf.setFillColor(r, g, b);
          pdf.rect(margin, y + i, contentWidth, 1, 'F');
        }
        
        y += 1;
        
        // Rank badge
        pdf.setFillColor(...vuduPurple);
        pdf.circle(margin + 5, y + 2, 3.5, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${useCase.rank}`, margin + (useCase.rank >= 10 ? 3 : 4), y + 3.5);
        
        // Name
        pdf.setFontSize(15);
        pdf.text(useCase.name, margin + 12, y + 3.5);
        
        y += 8;
        
        // Content
        pdf.setFillColor(252, 252, 253);
        pdf.rect(margin, y, contentWidth, 50, 'F');
        pdf.setDrawColor(...vuduTeal);
        pdf.setLineWidth(0.5);
        pdf.rect(margin, boxStartY, contentWidth, 58, 'S');
        
        y += 3;
        
        // Department and Priority
        pdf.setFontSize(9);
        pdf.setTextColor(...vuduGray);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${useCase.department}`, margin + 3, y);
        
        const priorityColor = useCase.strategic_alignment === 'High' ? vuduTeal : 
                             useCase.strategic_alignment === 'Medium' ? [234, 179, 8] : vuduGray;
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...priorityColor);
        pdf.text(`${useCase.strategic_alignment} Priority`, pageWidth - margin - 3, y, { align: 'right' });
        
        y += 6;
        
        // Description
        pdf.setFontSize(10);
        pdf.setTextColor(...vuduDark);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(useCase.description, contentWidth - 6);
        descLines.forEach(line => {
          pdf.text(line, margin + 3, y);
          y += 4.5;
        });
        
        y += 2;
        
        // Financial metrics boxes
        const metricsY = y;
        const boxWidth = (contentWidth - 15) / 4;
        
        const metrics = [
          { label: 'Investment', value: `$${(useCase.financial_metrics.implementation_cost / 1000).toFixed(0)}K`, color: vuduPurple },
          { label: 'Annual Savings', value: `$${(useCase.financial_metrics.annual_savings / 1000).toFixed(0)}K`, color: vuduTeal },
          { label: 'ROI', value: `${useCase.financial_metrics.roi_percentage}%`, color: vuduPurple },
          { label: 'Payback', value: `${useCase.financial_metrics.payback_months.toFixed(1)}mo`, color: vuduTeal }
        ];
        
        metrics.forEach((metric, mIdx) => {
          const x = margin + 3 + (mIdx * (boxWidth + 3));
          pdf.setFillColor(...metric.color);
          pdf.roundedRect(x, metricsY, boxWidth, 13, 2, 2, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(7);
          pdf.setFont('helvetica', 'normal');
          pdf.text(metric.label, x + boxWidth / 2, metricsY + 4, { align: 'center' });
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(metric.value, x + boxWidth / 2, metricsY + 10, { align: 'center' });
        });
        
        y = metricsY + 16;
        
        // Vendors
        if (useCase.recommended_vendors && useCase.recommended_vendors.length > 0) {
          pdf.setFontSize(8);
          pdf.setTextColor(...vuduGray);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Recommended Vendors:', margin + 3, y);
          y += 4;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.text(useCase.recommended_vendors.join(' • '), margin + 3, y);
          y += 4;
        }
        
        y += 5;
      });
    }
    
    // ========================================================================
    // ROADMAP SECTION
    // ========================================================================
    
    if (analysisResults.implementation_roadmap) {
      pdf.addPage();
      y = margin;
      
      addSection('IMPLEMENTATION ROADMAP', vuduPurple);
      
      analysisResults.implementation_roadmap.forEach((phase, idx) => {
        checkNewPage(50);
        
        const phaseColor = idx % 2 === 0 ? vuduTeal : vuduPurple;
        
        for (let i = 0; i < 8; i++) {
          const lightness = 1 - (i / 16);
          pdf.setFillColor(
            phaseColor[0] * lightness,
            phaseColor[1] * lightness,
            phaseColor[2] * lightness
          );
          pdf.rect(margin, y + i, contentWidth, 1, 'F');
        }
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Phase ${phase.phase_number}: ${phase.phase_name}`, margin + 4, y + 5);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(phase.duration, pageWidth - margin - 4, y + 5, { align: 'right' });
        
        y += 12;
        
        pdf.setFillColor(252, 252, 253);
        pdf.rect(margin, y, contentWidth, 38, 'F');
        pdf.setDrawColor(...phaseColor);
        pdf.setLineWidth(0.5);
        pdf.rect(margin, y - 12, contentWidth, 50, 'S');
        
        y += 4;
        
        pdf.setFontSize(9);
        pdf.setTextColor(...vuduDark);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Use Cases:', margin + 3, y);
        y += 4;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...vuduGray);
        const useCasesText = phase.use_cases.join(' • ');
        const ucLines = pdf.splitTextToSize(useCasesText, contentWidth - 6);
        ucLines.forEach(line => {
          pdf.text(line, margin + 3, y);
          y += 4;
        });
        
        y += 2;
        
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...vuduDark);
        pdf.text('Key Milestones:', margin + 3, y);
        y += 5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...vuduGray);
        phase.key_milestones.forEach(milestone => {
          checkNewPage();
          pdf.setFillColor(...phaseColor);
          pdf.circle(margin + 5, y - 1, 1, 'F');
          pdf.text(milestone, margin + 8, y);
          y += 4.5;
        });
        
        y += 6;
      });
    }
    
    // ========================================================================
    // NEXT STEPS
    // ========================================================================
    
    if (analysisResults.next_steps) {
      checkNewPage(70);
      addSection('RECOMMENDED NEXT STEPS', vuduCyan);
      
      analysisResults.next_steps.forEach((step, idx) => {
        checkNewPage(12);
        pdf.setFillColor(...vuduPurple);
        pdf.circle(margin + 4.5, y + 1.5, 3.5, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        const numX = idx + 1 >= 10 ? 2.5 : 3;
        pdf.text(`${idx + 1}`, margin + numX, y + 3);
        
        pdf.setTextColor(...vuduDark);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const stepLines = pdf.splitTextToSize(step, contentWidth - 12);
        stepLines.forEach((line, lineIdx) => {
          pdf.text(line, margin + 11, y + 2.5 + (lineIdx * 4.5));
        });
        
        y += 4.5 * stepLines.length + 4;
      });
    }
    
    // ========================================================================
    // FOOTER ON EVERY PAGE
    // ========================================================================
    
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      if (i === 1) continue;
      
      pdf.setDrawColor(...vuduTeal);
      pdf.setLineWidth(0.8);
      pdf.line(margin, pageHeight - 22, pageWidth - margin, pageHeight - 22);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...vuduTeal);
      const footerVuduWidth = pdf.getTextWidth('Vudu');
      pdf.text('Vudu', margin, pageHeight - 14);
      pdf.setTextColor(...vuduPurple);
      pdf.text('Vations', margin + footerVuduWidth, pageHeight - 14);
      
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(...vuduGray);
      pdf.text('Decoding The Future', margin, pageHeight - 9);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 11,
        { align: 'right' }
      );
    }
    
    // ========================================================================
    // SAVE PDF
    // ========================================================================
    
    const filename = `VuduVations_AI_Discovery_${formData.company_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    showToast('Professional PDF downloaded!', 'success');
  } catch (error) {
    console.error('PDF export error:', error);
    showToast('Error generating PDF: ' + error.message, 'error');
  } finally {
    setIsExportingPDF(false);
  }
};

export const copyToClipboard = async (text, showToast) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  } catch (error) {
    console.error('Copy failed:', error);
    showToast('Failed to copy', 'error');
  }
};