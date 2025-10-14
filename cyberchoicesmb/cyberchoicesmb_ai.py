# cyberchoicesmb_ai_enhanced.py
# Author: S Halverson @vuduvations (Enhanced with AI by Claude)
# License: BSD 3-Clause

import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import dash
from dash import dcc, html, callback_context
from dash.dependencies import Input, Output, State, ALL
import dash_bootstrap_components as dbc
import base64
import io
import json
from datetime import datetime

# ==================== CORE CBA FUNCTIONS ====================

def calculate_ale(pre_aro, post_aro, pre_sle, post_sle):
    """Calculate Annual Loss Expectancy before and after safeguards"""
    ale_pre = pre_aro * pre_sle
    ale_post = post_aro * post_sle
    return ale_pre, ale_post

def update_cba_metrics(df):
    """Update DataFrame with all CBA metrics"""
    df['ALE_Pre'] = df['Pre ARO'] * df['Pre SLE']
    df['ALE_Post'] = df['Post ARO'] * df['Post SLE']
    df['ACS'] = df['Annual Maintenance Cost'] + df['Safeguard Cost']
    df['Savings'] = df['ALE_Pre'] - df['ALE_Post']
    df['Net Savings'] = df['Savings'] - df['ACS']
    df['Decision'] = np.where(df['Net Savings'] > 0, 'Go', 'No Go')
    df['ROI'] = np.where(df['ACS'] > 0, (df['Savings'] / df['ACS']) * 100, 0)
    return df

def validate_csv_data(df):
    """Validate CSV and return issues with plain-English explanations"""
    issues = []
    
    required_cols = ['Application/Software Name', 'Pre ARO', 'Post ARO', 'Pre SLE', 'Post SLE', 
                     'Safeguard Cost', 'Annual Maintenance Cost', 'Criticality']
    
    # Check for missing columns
    missing = [col for col in required_cols if col not in df.columns]
    if missing:
        issues.append(f"❌ Missing required columns: {', '.join(missing)}")
    
    if len(issues) > 0:
        return issues
    
    # Validate data logic
    for idx, row in df.iterrows():
        app_name = row['Application/Software Name']
        
        # Check if Post ARO > Pre ARO
        if row['Post ARO'] > row['Pre ARO']:
            issues.append(
                f"⚠️ {app_name}: Your 'after safeguard' threat frequency (Post ARO: {row['Post ARO']}) "
                f"is HIGHER than before (Pre ARO: {row['Pre ARO']}). This means the safeguard makes things worse. "
                f"Did you swap these values?"
            )
        
        # Check if Post SLE > Pre SLE
        if row['Post SLE'] > row['Pre SLE']:
            issues.append(
                f"⚠️ {app_name}: Your 'after safeguard' loss per incident (Post SLE: ${row['Post SLE']:,.0f}) "
                f"is HIGHER than before (Pre SLE: ${row['Pre SLE']:,.0f}). The safeguard should reduce losses. "
                f"Please double-check these values."
            )
        
        # Check for zero or negative costs
        if row['Safeguard Cost'] <= 0 and row['Annual Maintenance Cost'] <= 0:
            issues.append(
                f"⚠️ {app_name}: Both safeguard and maintenance costs are zero. "
                f"If this is a free solution, that's fine - otherwise please enter the actual cost."
            )
    
    return issues if issues else ["✅ Data looks good! No validation issues found."]

def calculate_risk_grade(df):
    """Calculate overall risk grade based on coverage and criticality"""
    total_exposure = df['ALE_Pre'].sum()
    if total_exposure == 0:
        return "N/A", 0
    
    protected = df[df['Decision'] == 'Go']['Savings'].sum()
    coverage_pct = (protected / total_exposure * 100) if total_exposure > 0 else 0
    
    # Check critical assets
    if 'Criticality' in df.columns:
        critical_assets = df[df['Criticality'].isin(['Critical', 'High'])]
        critical_protected = critical_assets[critical_assets['Decision'] == 'Go']
        critical_coverage = len(critical_protected) / len(critical_assets) * 100 if len(critical_assets) > 0 else 100
    else:
        critical_coverage = coverage_pct
    
    # Weighted score: 70% overall coverage, 30% critical coverage
    score = (coverage_pct * 0.7 + critical_coverage * 0.3)
    
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B+"
    elif score >= 70:
        grade = "B"
    elif score >= 60:
        grade = "C+"
    elif score >= 50:
        grade = "C"
    else:
        grade = "D"
    
    return grade, score

def optimize_budget(df, budget):
    """Optimize safeguard selection within budget constraints"""
    # Only consider Go decisions
    candidates = df[df['Decision'] == 'Go'].copy()
    
    if len(candidates) == 0:
        return [], 0, 0
    
    # Sort by ROI descending
    candidates = candidates.sort_values('ROI', ascending=False)
    
    selected = []
    total_cost = 0
    total_savings = 0
    
    for _, row in candidates.iterrows():
        if total_cost + row['ACS'] <= budget:
            selected.append(row['Application/Software Name'])
            total_cost += row['ACS']
            total_savings += row['Savings']
    
    return selected, total_cost, total_savings

def generate_alternative_suggestions(row):
    """Generate AI-powered alternative suggestions for No Go items"""
    app_name = row['Application/Software Name']
    cost = row['ACS']
    
    # Simple rule-based suggestions (in production, use actual LLM/web search)
    suggestions = {
        'CrowdStrike Falcon': [
            "💡 Consider: Microsoft Defender for Endpoint (included with M365 E5, ~40% cheaper)",
            "💡 Consider: SentinelOne (typically $4,500/year, 37% cheaper)",
            "💡 Alternative: Sophos Intercept X (typically $3,800/year, 47% cheaper)"
        ],
        'Cisco Firewall': [
            "💡 Consider: Fortinet FortiGate (typically $2,800/year, 34% cheaper)",
            "💡 Consider: Ubiquiti Dream Machine Pro (typically $1,200/year, 72% cheaper)",
            "💡 Alternative: pfSense with support (typically $1,500/year, 65% cheaper)"
        ],
        'Carbonite Backup': [
            "💡 Consider: Backblaze Business (typically $1,200/year, 47% cheaper)",
            "💡 Consider: Acronis Cyber Backup (typically $1,400/year, 39% cheaper)",
            "💡 Alternative: Veeam Backup (typically $1,000/year, 56% cheaper)"
        ],
        'NordVPN Teams': [
            "💡 Consider: Cloudflare Zero Trust (free tier available, then $7/user)",
            "💡 Consider: Tailscale (free for up to 100 devices)",
            "💡 Alternative: WireGuard self-hosted (free, one-time setup cost)"
        ]
    }
    
    if app_name in suggestions:
        return suggestions[app_name]
    else:
        return [f"💡 Research alternative solutions that offer similar protection at lower cost (target: <${cost * 0.7:,.0f}/year)"]

def generate_executive_summary(df):
    """Generate executive summary with key insights"""
    total_exposure = df['ALE_Pre'].sum()
    total_protected = df[df['Decision'] == 'Go']['Savings'].sum()
    total_cost = df[df['Decision'] == 'Go']['ACS'].sum()
    go_count = len(df[df['Decision'] == 'Go'])
    no_go_count = len(df[df['Decision'] == 'No Go'])
    
    # Top risks
    top_risks = df.nlargest(3, 'ALE_Pre')[['Application/Software Name', 'ALE_Pre', 'Decision']]
    
    # Best ROI (only from Go decisions)
    go_items = df[df['Decision'] == 'Go']
    if len(go_items) > 0:
        best_roi = go_items.nlargest(3, 'ROI')[['Application/Software Name', 'ROI', 'Net Savings']]
    else:
        best_roi = pd.DataFrame()
    
    # Worst performers (No Go with highest negative net savings) - FIXED LOGIC
    no_go_items = df[df['Decision'] == 'No Go']
    if len(no_go_items) > 0:
        worst = no_go_items.nsmallest(3, 'Net Savings')[['Application/Software Name', 'Net Savings', 'ACS']]
    else:
        worst = pd.DataFrame()
    
    summary = {
        'total_exposure': total_exposure,
        'total_protected': total_protected,
        'total_cost': total_cost,
        'protection_rate': (total_protected / total_exposure * 100) if total_exposure > 0 else 0,
        'go_count': go_count,
        'no_go_count': no_go_count,
        'top_risks': top_risks.to_dict('records'),
        'best_roi': best_roi.to_dict('records') if len(best_roi) > 0 else [],
        'worst_performers': worst.to_dict('records') if len(worst) > 0 else []
    }
    
    return summary

def generate_implementation_roadmap(df):
    """Generate phased implementation roadmap"""
    go_items = df[df['Decision'] == 'Go'].copy()
    
    if len(go_items) == 0:
        return []
    
    # Phase 1: Critical items
    if 'Criticality' in df.columns:
        phase1 = go_items[go_items['Criticality'] == 'Critical']
        phase2 = go_items[go_items['Criticality'] == 'High']
        phase3 = go_items[go_items['Criticality'].isin(['Medium', 'Low'])]
    else:
        # Fallback: sort by ROI
        sorted_items = go_items.sort_values('ROI', ascending=False)
        total = len(sorted_items)
        phase1 = sorted_items.iloc[:total//3]
        phase2 = sorted_items.iloc[total//3:2*total//3]
        phase3 = sorted_items.iloc[2*total//3:]
    
    roadmap = []
    
    if len(phase1) > 0:
        roadmap.append({
            'phase': 'Phase 1: Critical (Immediate)',
            'items': phase1['Application/Software Name'].tolist(),
            'cost': phase1['ACS'].sum(),
            'savings': phase1['Savings'].sum()
        })
    
    if len(phase2) > 0:
        roadmap.append({
            'phase': 'Phase 2: High Priority (30-60 days)',
            'items': phase2['Application/Software Name'].tolist(),
            'cost': phase2['ACS'].sum(),
            'savings': phase2['Savings'].sum()
        })
    
    if len(phase3) > 0:
        roadmap.append({
            'phase': 'Phase 3: Standard (60-90 days)',
            'items': phase3['Application/Software Name'].tolist(),
            'cost': phase3['ACS'].sum(),
            'savings': phase3['Savings'].sum()
        })
    
    return roadmap

def generate_plain_english_insights(df):
    """Generate plain-English insights about the portfolio"""
    insights = []
    
    summary = generate_executive_summary(df)
    grade, score = calculate_risk_grade(df)
    
    # Overall assessment with grade
    insights.append(f"## 📊 Portfolio Overview")
    insights.append(f"**Risk Grade: {grade}** ({score:.1f}/100)")
    insights.append(f"")
    insights.append(f"You're currently exposed to **${summary['total_exposure']:,.0f}** in annual cybersecurity losses.")
    insights.append(f"By implementing the recommended safeguards, you can protect **${summary['total_protected']:,.0f}** "
                   f"({summary['protection_rate']:.1f}% of your exposure) for an annual cost of **${summary['total_cost']:,.0f}**.")
    
    # Decisions breakdown
    insights.append(f"\n## ✅ Recommendations")
    insights.append(f"- **{summary['go_count']} safeguards** are recommended (they save more than they cost)")
    insights.append(f"- **{summary['no_go_count']} safeguards** are not cost-effective right now")
    
    # Top priorities
    if summary['top_risks']:
        insights.append(f"\n## 🎯 Top Priorities")
        for i, risk in enumerate(summary['top_risks'], 1):
            decision_icon = "✅" if risk['Decision'] == 'Go' else "❌"
            insights.append(
                f"{i}. **{risk['Application/Software Name']}** {decision_icon} - "
                f"${risk['ALE_Pre']:,.0f} annual exposure"
            )
    
    # Best investments
    if summary['best_roi'] and len(summary['best_roi']) > 0:
        insights.append(f"\n## 💰 Best ROI Investments")
        for i, inv in enumerate(summary['best_roi'], 1):
            insights.append(
                f"{i}. **{inv['Application/Software Name']}** - "
                f"{inv['ROI']:.0f}% ROI (saves ${inv['Net Savings']:,.0f} annually)"
            )
    
    # Problem areas with alternatives - FIXED TO ONLY SHOW NO GO
    if summary['worst_performers'] and len(summary['worst_performers']) > 0:
        insights.append(f"\n## ⚠️ Costly Safeguards (Consider Alternatives)")
        insights.append(f"*These safeguards cost more than they save. Don't ignore these risks - find cheaper alternatives!*")
        for i, perf in enumerate(summary['worst_performers'], 1):
            insights.append(
                f"\n**{i}. {perf['Application/Software Name']}**"
            )
            insights.append(
                f"   - Costs ${perf['ACS']:,.0f}/year but net loss of ${abs(perf['Net Savings']):,.0f}"
            )
            # Get alternatives
            row = df[df['Application/Software Name'] == perf['Application/Software Name']].iloc[0]
            alternatives = generate_alternative_suggestions(row)
            for alt in alternatives:
                insights.append(f"   - {alt}")
    
    return "\n".join(insights)

def get_ai_chat_response(user_message, df, chat_history):
    """Generate AI responses based on user questions and data"""
    message_lower = user_message.lower()
    
    # Budget optimizer
    if any(word in message_lower for word in ['budget', 'optimize', 'only have', '$']):
        # Try to extract budget amount
        import re
        numbers = re.findall(r'\$?(\d+(?:,\d{3})*(?:\.\d{2})?)[kK]?', user_message)
        if numbers:
            budget_str = numbers[0].replace(',', '')
            if 'k' in user_message.lower():
                budget = float(budget_str) * 1000
            else:
                budget = float(budget_str)
            
            selected, cost, savings = optimize_budget(df, budget)
            
            if len(selected) == 0:
                return f"With a budget of ${budget:,.0f}, unfortunately none of the recommended safeguards fit. Consider increasing your budget or looking for cheaper alternatives."
            
            response = f"## 💰 Optimized for ${budget:,.0f} Budget\n\n"
            response += f"**Recommended Mix (Maximum Protection):**\n"
            for item in selected:
                row = df[df['Application/Software Name'] == item].iloc[0]
                response += f"- ✅ **{item}** - ${row['ACS']:,.0f}/year (ROI: {row['ROI']:.0f}%)\n"
            
            response += f"\n**Total Cost:** ${cost:,.0f}\n"
            response += f"**Annual Savings:** ${savings:,.0f}\n"
            response += f"**Protection:** ${savings:,.0f} of ${df['ALE_Pre'].sum():,.0f} exposure ({savings/df['ALE_Pre'].sum()*100:.1f}%)\n"
            
            # Show what's left out
            all_go = set(df[df['Decision'] == 'Go']['Application/Software Name'].tolist())
            left_out = all_go - set(selected)
            if left_out:
                response += f"\n**Not included (exceeds budget):**\n"
                for item in left_out:
                    row = df[df['Application/Software Name'] == item].iloc[0]
                    response += f"- ⏸️ {item} (${row['ACS']:,.0f}/year)\n"
            
            return response
        else:
            total_cost = df[df['Decision'] == 'Go']['ACS'].sum()
            return (f"To implement all recommended safeguards, you'll need **${total_cost:,.0f}** annually. "
                    f"If you have a specific budget, tell me the amount and I'll optimize the mix for you! "
                    f"For example: 'I only have $10,000' or 'Optimize for $15k budget'")
    
    # Roadmap/phasing
    elif any(word in message_lower for word in ['roadmap', 'phase', 'timeline', 'order', 'sequence', 'priority']):
        roadmap = generate_implementation_roadmap(df)
        
        if len(roadmap) == 0:
            return "No safeguards are currently recommended. Consider reviewing your cost estimates or threat assessments."
        
        response = "## 📅 Implementation Roadmap\n\n"
        response += "*Phased approach to spread costs and tackle critical items first:*\n\n"
        
        for phase in roadmap:
            response += f"### {phase['phase']}\n"
            response += f"**Items:** {', '.join(phase['items'])}\n"
            response += f"**Cost:** ${phase['cost']:,.0f}/year | **Savings:** ${phase['savings']:,.0f}/year\n\n"
        
        return response
    
    # Risk grade
    elif any(word in message_lower for word in ['grade', 'score', 'rating', 'how am i doing']):
        grade, score = calculate_risk_grade(df)
        
        response = f"## 📊 Your Risk Grade: **{grade}** ({score:.1f}/100)\n\n"
        
        if score >= 80:
            response += "🎉 **Excellent!** You're protecting the vast majority of your cybersecurity risks."
        elif score >= 60:
            response += "👍 **Good progress**, but there's room for improvement. Focus on the remaining gaps."
        else:
            response += "⚠️ **Needs attention.** You have significant unprotected risks. Prioritize the recommended safeguards."
        
        summary = generate_executive_summary(df)
        response += f"\n\n**Coverage:** {summary['protection_rate']:.1f}% of total exposure"
        response += f"\n**Recommended safeguards:** {summary['go_count']}/{summary['go_count'] + summary['no_go_count']}"
        
        return response
    
    # Alternatives for specific No Go item
    elif 'alternative' in message_lower or 'cheaper' in message_lower:
        no_go_items = df[df['Decision'] == 'No Go']
        
        if len(no_go_items) == 0:
            return "All your current safeguards are cost-effective! No need to look for alternatives."
        
        # Check if asking about specific item
        for _, row in no_go_items.iterrows():
            if row['Application/Software Name'].lower() in message_lower:
                suggestions = generate_alternative_suggestions(row)
                response = f"## Alternatives for {row['Application/Software Name']}\n\n"
                response += f"Current cost: ${row['ACS']:,.0f}/year (net loss: ${abs(row['Net Savings']):,.0f})\n\n"
                for sugg in suggestions:
                    response += f"{sugg}\n"
                return response
        
        # General alternatives
        response = "## 💡 Alternative Solutions Needed\n\n"
        response += "These safeguards aren't cost-effective at current pricing:\n\n"
        for _, row in no_go_items.iterrows():
            response += f"**{row['Application/Software Name']}** (${row['ACS']:,.0f}/year)\n"
            suggestions = generate_alternative_suggestions(row)
            for sugg in suggestions[:2]:  # Show first 2 suggestions
                response += f"  {sugg}\n"
            response += "\n"
        
        return response
    
    # Biggest risk
    elif any(word in message_lower for word in ['biggest', 'highest', 'top', 'priority', 'worst']):
        top_risk = df.nlargest(1, 'ALE_Pre').iloc[0]
        response = f"Your biggest risk is **{top_risk['Application/Software Name']}** with ${top_risk['ALE_Pre']:,.0f} in annual expected losses. "
        
        if top_risk['Decision'] == 'Go':
            response += f"✅ Good news: implementing the safeguard is cost-effective (ROI: {top_risk['ROI']:.0f}%)!"
        else:
            response += f"❌ The current safeguard option costs ${top_risk['ACS']:,.0f}/year but only saves ${top_risk['Savings']:,.0f} - consider alternatives."
        
        return response
    
    # ROI questions
    elif any(word in message_lower for word in ['roi', 'return', 'worth', 'best investment']):
        best_roi = df[df['Decision'] == 'Go'].nlargest(1, 'ROI')
        if len(best_roi) > 0:
            best = best_roi.iloc[0]
            return (f"Your best ROI investment is **{best['Application/Software Name']}** with "
                    f"**{best['ROI']:.0f}% ROI**. For every dollar spent, you save ${best['ROI']/100:.2f}. "
                    f"Net annual savings: ${best['Net Savings']:,.0f}")
        else:
            return "Based on the current data, none of your safeguards show positive ROI. Consider reviewing your options or getting quotes for alternative solutions."
    
    # No Go questions
    elif any(word in message_lower for word in ['no go', 'nogo', 'rejected', 'skip', 'not recommend']):
        no_go = df[df['Decision'] == 'No Go']
        if len(no_go) > 0:
            return (f"You have **{len(no_go)} safeguards** marked as 'No Go' because they cost more than they save. "
                    f"This doesn't mean ignore these risks - it means you should:\n"
                    f"1. Look for cheaper alternatives (ask me for suggestions!)\n"
                    f"2. Accept the risk if it's truly low\n"
                    f"3. Implement other compensating controls\n\n"
                    f"Want alternatives? Ask: 'Show me alternatives for [safeguard name]'")
        else:
            return "Great news! All your planned safeguards are cost-effective. No 'No Go' items."
    
    # Help
    elif 'help' in message_lower:
        return ("I can help you understand your cybersecurity risks and costs! Try asking:\n"
                "- 'What's my biggest risk?'\n"
                "- 'I only have $10,000 budget - what should I buy?'\n"
                "- 'Show me a roadmap'\n"
                "- 'What's my risk grade?'\n"
                "- 'Which safeguards have the best ROI?'\n"
                "- 'Show me alternatives for [safeguard name]'\n"
                "- 'Why are some marked No Go?'")
    
    # Specific application query
    else:
        for _, row in df.iterrows():
            if row['Application/Software Name'].lower() in message_lower:
                response = f"## **{row['Application/Software Name']}** Analysis\n\n"
                response += f"**Decision:** {row['Decision']} {'✅' if row['Decision'] == 'Go' else '❌'}\n"
                response += f"**Annual exposure:** ${row['ALE_Pre']:,.0f}\n"
                response += f"**Safeguard cost:** ${row['ACS']:,.0f}/year\n"
                response += f"**Annual savings:** ${row['Savings']:,.0f}\n"
                response += f"**Net savings:** ${row['Net Savings']:,.0f}\n"
                response += f"**ROI:** {row['ROI']:.0f}%\n\n"
                
                if row['Decision'] == 'Go':
                    response += "✅ **Recommendation:** This is a good investment! Implement this safeguard."
                else:
                    response += "❌ **Recommendation:** Current option costs more than it saves. Consider alternatives:\n"
                    suggestions = generate_alternative_suggestions(row)
                    for sugg in suggestions:
                        response += f"  {sugg}\n"
                
                return response
        
        return ("I'm not sure about that specific question. I can help you analyze your cybersecurity risks and costs. "
                "Try asking about your biggest risks, budget optimization, ROI, or specific applications!")

# ==================== VISUALIZATION FUNCTIONS ====================

def plot_interactive_cba_metrics(df):
    """Generate all interactive plots"""
    metrics = ['EF', 'Safeguard Cost', 'Pre ARO', 'Post ARO', 'Pre SLE', 'Post SLE', 'ALE_Pre', 'ALE_Post']

    # Plot 1: Detailed metrics
    fig1 = go.Figure()
    for metric in metrics:
        fig1.add_trace(go.Bar(
            x=df['Application/Software Name'],
            y=df[metric],
            name=metric,
            marker_color=np.where(df['Decision'] == 'Go', 'green', 'red'),
            hovertext=df['Decision']
        ))

    fig1.update_layout(
        barmode='group',
        title='CBA Metrics by Asset',
        xaxis_title='Application/Software Name',
        yaxis_title='Value',
        legend_title='Metric',
        template='plotly_white'
    )

    # Plot 2: Overall decision
    fig2 = go.Figure()
    fig2.add_trace(go.Bar(
        x=df['Application/Software Name'],
        y=[1] * len(df),
        name='Decision',
        marker_color=np.where(df['Decision'] == 'Go', '#28a745', '#dc3545'),
        text=df['Decision'],
        textposition='inside',
        hovertemplate='<b>%{x}</b><br>' +
                      'Decision: %{text}<br>' +
                      'Net Savings: $%{customdata[0]:,.0f}<br>' +
                      'ROI: %{customdata[1]:.0f}%<br>' +
                      '<extra></extra>',
        customdata=df[['Net Savings', 'ROI']].values
    ))

    fig2.update_layout(
        title='Go / No Go Decision by Asset',
        xaxis_title='Application/Software Name',
        yaxis_title='Decision',
        yaxis=dict(showticklabels=False, showgrid=False, zeroline=False),
        showlegend=False,
        template='plotly_white',
        height=400
    )

    # Plot 3: Budget allocation (only Go items)
    go_df = df[df['Decision'] == 'Go']
    if len(go_df) > 0:
        fig3 = px.pie(go_df, values='ACS', names='Application/Software Name', 
                     title='Budget Allocation for Recommended Safeguards',
                     hole=0.3)
        fig3.update_traces(textposition='inside', textinfo='percent+label')
    else:
        fig3 = go.Figure()
        fig3.add_annotation(text="No recommended safeguards<br>All items marked 'No Go'", 
                          showarrow=False, font=dict(size=16))
        fig3.update_layout(title='Budget Allocation for Recommended Safeguards')

    # Plot 4: ROI scatter with enhanced tooltips
    fig4 = go.Figure()
    fig4.add_trace(go.Scatter(
        x=df['Application/Software Name'],
        y=df['ROI'],
        mode='markers+text',
        marker=dict(
            size=15,
            color=np.where(df['Decision'] == 'Go', '#28a745', '#dc3545'),
            line=dict(width=2, color='white')
        ),
        text=[f"{roi:.0f}%" for roi in df['ROI']],
        textposition='top center',
        hovertemplate='<b>%{x}</b><br>' +
                      'ROI: %{y:.0f}%<br>' +
                      'Annual Cost: $%{customdata[0]:,.0f}<br>' +
                      'Annual Savings: $%{customdata[1]:,.0f}<br>' +
                      'Net Savings: $%{customdata[2]:,.0f}<br>' +
                      '<extra></extra>',
        customdata=df[['ACS', 'Savings', 'Net Savings']].values
    ))
    fig4.add_hline(y=100, line_dash="dash", line_color="blue", 
                   annotation_text="Break-even (100% ROI)", annotation_position="right")
    fig4.update_layout(
        title='Return on Investment (ROI) by Safeguard',
        xaxis_title='Application/Software Name',
        yaxis_title='ROI (%)',
        template='plotly_white',
        height=450
    )

    # Plot 5: Heatmap with better formatting
    heatmap_data = df.set_index('Application/Software Name')[['ALE_Pre', 'ALE_Post', 'ACS', 'Net Savings']]
    fig5 = px.imshow(
        heatmap_data.T, 
        text_auto='.0f',
        aspect="auto", 
        title='Cost-Benefit Analysis Heatmap',
        color_continuous_scale='RdYlGn',
        labels=dict(x="Application/Software Name", y="Metric", color="Value ($)")
    )
    fig5.update_layout(height=400)

    return fig1, fig2, fig3, fig4, fig5

# ==================== DASH APP SETUP ====================

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

app.layout = dbc.Container([
    # Tooltip component
    dbc.Tooltip(
        "Exposure Factor - Percentage of asset value that could be lost in an incident (e.g., 0.3 = 30% loss)",
        target="tooltip-ef",
        placement="top"
    ),
    dbc.Tooltip(
        "Annualized Rate of Occurrence - How many times per year this threat is expected to happen (e.g., 0.5 = once every 2 years)",
        target="tooltip-aro",
        placement="top"
    ),
    dbc.Tooltip(
        "Single Loss Expectancy - Expected dollar loss each time the threat occurs",
        target="tooltip-sle",
        placement="top"
    ),
    dbc.Tooltip(
        "Annual Loss Expectancy - Total expected annual loss from this threat (ARO × SLE)",
        target="tooltip-ale",
        placement="top"
    ),
    dbc.Tooltip(
        "Annual Cost of Safeguard - Yearly cost to purchase and maintain this protection",
        target="tooltip-acs",
        placement="top"
    ),
    dbc.Tooltip(
        "Return on Investment - For every $1 spent on this safeguard, how much you save (e.g., 200% = save $2 for every $1 spent)",
        target="tooltip-roi",
        placement="top"
    ),
    
    # Header
    dbc.Row([
        dbc.Col([
            html.H1("🛡️ VuduVations CyberChoice SMB", className="text-primary"),
            html.P("AI-Powered Cybersecurity Cost-Benefit Analysis for Small & Medium Businesses", 
                   className="lead text-muted")
        ])
    ], className="mb-4 mt-3"),
    
    # File Upload
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardBody([
                    html.H4("📁 Upload Your Risk Assessment", className="card-title"),
                    dcc.Upload(
                        id='upload-data',
                        children=html.Div([
                            '✨ Drag and Drop or ',
                            html.A('Select a CSV File', className="text-primary fw-bold")
                        ]),
                        style={
                            'width': '100%',
                            'height': '80px',
                            'lineHeight': '80px',
                            'borderWidth': '2px',
                            'borderStyle': 'dashed',
                            'borderRadius': '10px',
                            'textAlign': 'center',
                            'backgroundColor': '#f8f9fa'
                        },
                        multiple=False
                    ),
                    html.Div(id='upload-status', className="mt-3")
                ])
            ])
        ])
    ], className="mb-4"),
    
    # Store for data
    dcc.Store(id='stored-data'),
    dcc.Store(id='chat-history', data=[]),
    
    # Main content (hidden until data loaded)
    html.Div(id='main-content', children=[
        
        # Executive Summary & AI Chat
        dbc.Row([
            # Executive Summary
            dbc.Col([
                dbc.Card([
                    dbc.CardHeader(html.H4("📊 Executive Summary", className="mb-0")),
                    dbc.CardBody(id='executive-summary')
                ], className="h-100")
            ], width=7),
            
            # AI Risk Advisor Chat
            dbc.Col([
                dbc.Card([
                    dbc.CardHeader(html.H4("🤖 AI Risk Advisor", className="mb-0")),
                    dbc.CardBody([
                        # Suggested questions
                        html.Div([
                            html.Small("Try asking:", className="text-muted d-block mb-2"),
                            dbc.ButtonGroup([
                                dbc.Button("🎯 Top priorities", id="btn-priorities", size="sm", color="light", outline=True),
                                dbc.Button("💰 Best ROI", id="btn-roi", size="sm", color="light", outline=True),
                                dbc.Button("📊 Risk grade", id="btn-grade", size="sm", color="light", outline=True),
                            ], size="sm", className="mb-2 d-flex flex-wrap gap-1")
                        ]),
                        html.Div(id='chat-messages', style={
                            'height': '250px',
                            'overflowY': 'scroll',
                            'border': '1px solid #dee2e6',
                            'borderRadius': '5px',
                            'padding': '10px',
                            'backgroundColor': '#f8f9fa',
                            'marginBottom': '10px'
                        }),
                        dbc.InputGroup([
                            dbc.Input(id='chat-input', placeholder='Ask me anything about your risks...', 
                                     type='text'),
                            dbc.Button('Send', id='chat-submit', color='primary')
                        ])
                    ])
                ], className="h-100")
            ], width=5)
        ], className="mb-4"),
        
        # Insights
        dbc.Row([
            dbc.Col([
                dbc.Card([
                    dbc.CardHeader(html.H4("💡 Plain-English Insights", className="mb-0")),
                    dbc.CardBody(id='plain-english-insights', style={'maxHeight': '600px', 'overflowY': 'auto'})
                ])
            ])
        ], className="mb-4"),
        
        # Visualizations
        dbc.Row([
            dbc.Col(dcc.Graph(id='cba-decision-plot'), width=6),
            dbc.Col(dcc.Graph(id='cost-effectiveness-plot'), width=6)
        ], className="mb-4"),
        
        dbc.Row([
            dbc.Col(dcc.Graph(id='budget-allocation-plot'), width=6),
            dbc.Col(dcc.Graph(id='cba-metrics-plot'), width=6)
        ], className="mb-4"),
        
        dbc.Row([
            dbc.Col(dcc.Graph(id='cost-benefit-heatmap'), width=12)
        ], className="mb-4")
        
    ], style={'display': 'none'})
    
], fluid=True, style={'backgroundColor': '#ffffff'})

# ==================== CALLBACKS ====================

def parse_contents(contents, filename):
    """Parse uploaded CSV file"""
    content_type, content_string = contents.split(',')
    decoded = base64.b64decode(content_string)
    try:
        if 'csv' in filename:
            df = pd.read_csv(io.StringIO(decoded.decode('utf-8')))
            
            # Validate data
            issues = validate_csv_data(df)
            
            # Calculate metrics
            df = update_cba_metrics(df)
            
            return df, issues
    except Exception as e:
        return None, [f"❌ Error reading file: {str(e)}"]

@app.callback(
    [Output('stored-data', 'data'),
     Output('upload-status', 'children'),
     Output('main-content', 'style')],
    [Input('upload-data', 'contents')],
    [State('upload-data', 'filename')]
)
def handle_upload(contents, filename):
    """Handle file upload and validation"""
    if contents is None:
        return None, "", {'display': 'none'}
    
    df, issues = parse_contents(contents, filename)
    
    if df is None:
        status = dbc.Alert(issues[0], color="danger")
        return None, status, {'display': 'none'}
    
    # Show validation results
    if issues[0].startswith('✅'):
        status = dbc.Alert(issues[0], color="success")
    else:
        status = dbc.Alert([html.P("⚠️ Please review these data issues:")] + 
                          [html.Li(issue) for issue in issues], color="warning")
    
    return df.to_json(date_format='iso', orient='split'), status, {'display': 'block'}

@app.callback(
    [Output('executive-summary', 'children'),
     Output('plain-english-insights', 'children'),
     Output('cba-metrics-plot', 'figure'),
     Output('cba-decision-plot', 'figure'),
     Output('budget-allocation-plot', 'figure'),
     Output('cost-effectiveness-plot', 'figure'),
     Output('cost-benefit-heatmap', 'figure')],
    [Input('stored-data', 'data')]
)
def update_dashboard(json_data):
    """Update all dashboard components"""
    if json_data is None:
        empty_fig = go.Figure()
        return "", "", empty_fig, empty_fig, empty_fig, empty_fig, empty_fig
    
    df = pd.read_json(json_data, orient='split')
    
    # Generate executive summary
    summary = generate_executive_summary(df)
    grade, score = calculate_risk_grade(df)
    
    exec_summary = [
        dbc.Row([
            dbc.Col([
                html.H2(f"${summary['total_exposure']:,.0f}", className="text-danger mb-0"),
                html.P("Total Annual Exposure", className="text-muted small")
            ], width=3),
            dbc.Col([
                html.H2(f"${summary['total_protected']:,.0f}", className="text-success mb-0"),
                html.P(f"Protected ({summary['protection_rate']:.0f}%)", className="text-muted small")
            ], width=3),
            dbc.Col([
                html.H2(f"${summary['total_cost']:,.0f}", className="text-primary mb-0"),
                html.P("Annual Investment", className="text-muted small")
            ], width=3),
            dbc.Col([
                html.H2(f"{summary['go_count']}/{summary['go_count'] + summary['no_go_count']}", 
                       className="text-info mb-0"),
                html.P("Recommended", className="text-muted small")
            ], width=3)
        ]),
        html.Hr(),
        dbc.Row([
            dbc.Col([
                html.Div([
                    html.H3(grade, className="mb-0", style={'fontSize': '2.5rem'}),
                    html.P(f"Risk Grade ({score:.1f}/100)", className="text-muted small")
                ], className="text-center")
            ])
        ])
    ]
    
    # Generate insights
    insights = dcc.Markdown(generate_plain_english_insights(df))
    
    # Generate plots
    fig1, fig2, fig3, fig4, fig5 = plot_interactive_cba_metrics(df)
    
    return exec_summary, insights, fig1, fig2, fig3, fig4, fig5

@app.callback(
    [Output('chat-messages', 'children'),
     Output('chat-input', 'value'),
     Output('chat-history', 'data')],
    [Input('chat-submit', 'n_clicks'),
     Input('btn-priorities', 'n_clicks'),
     Input('btn-roi', 'n_clicks'),
     Input('btn-grade', 'n_clicks'),
     Input('chat-input', 'n_submit')],
    [State('chat-input', 'value'),
     State('stored-data', 'data'),
     State('chat-history', 'data'),
     State('chat-messages', 'children')]
)
def handle_chat(n_clicks, btn_pri, btn_roi, btn_grade, n_submit, user_message, json_data, chat_history, current_messages):
    """Handle chat interactions"""
    ctx = callback_context
    
    if not ctx.triggered or not json_data:
        if current_messages:
            return current_messages, "", chat_history or []
        return [html.P("👋 Hi! Upload your CSV and I'll help you understand your cybersecurity risks. Click the buttons above for quick insights!", 
                      className="text-muted fst-italic")], "", []
    
    # Determine which button/input triggered
    trigger_id = ctx.triggered[0]['prop_id'].split('.')[0]
    
    # Map button clicks to questions
    if trigger_id == 'btn-priorities':
        user_message = "What are my top priorities?"
    elif trigger_id == 'btn-roi':
        user_message = "Which safeguards have the best ROI?"
    elif trigger_id == 'btn-grade':
        user_message = "What's my risk grade?"
    elif not user_message:
        return current_messages or [html.P("👋 Hi! Upload your CSV and I'll help you understand your cybersecurity risks.", 
                      className="text-muted fst-italic")], "", chat_history or []
    
    df = pd.read_json(json_data, orient='split')
    
    # Get AI response
    ai_response = get_ai_chat_response(user_message, df, chat_history or [])
    
    # Update chat history
    new_history = (chat_history or []) + [
        {'role': 'user', 'content': user_message, 'timestamp': datetime.now().isoformat()},
        {'role': 'assistant', 'content': ai_response, 'timestamp': datetime.now().isoformat()}
    ]
    
    # Build chat display
    messages = []
    for msg in new_history:
        if msg['role'] == 'user':
            messages.append(
                html.Div([
                    html.Strong("You: ", className="text-primary"),
                    html.Span(msg['content'])
                ], className="mb-2")
            )
        else:
            messages.append(
                html.Div([
                    html.Strong("🤖 AI Advisor: ", className="text-success"),
                    dcc.Markdown(msg['content'])
                ], className="mb-3 p-2", style={'backgroundColor': '#e8f4f8', 'borderRadius': '5px'})
            )
    
    return messages, "", new_history

if __name__ == '__main__':
    app.run_server(debug=True)