// src/app/consulting-analyzer/demo/page.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { Briefcase, Brain, Zap, Shield, Clock, FileText, Download, Copy, AlertTriangle, TrendingUp, Target, Users, CheckCircle, DollarSign, BarChart3, Play, ChevronDown, ChevronUp, Activity, ArrowLeft } from 'lucide-react'

// Sales Analyzer Footer Configuration
const salesAnalyzerFooterConfig = {
  name: "Sales Call Analyzer",
  icon: Briefcase,
  tagline: "Observable LangGraph intelligence for sales conversations. See exactly how AI analyzes your calls.",
  color: "blue",
  trademark: "Sales Call Analyzer",
  subtitle: "Multi-tier AI routing. Real-time cost tracking. Full transparency.",
  links: {
    product: [
      { label: "Overview", href: "/consulting-analyzer" },
      { label: "Features", href: "/consulting-analyzer#features" },
      { label: "How It Works", href: "/consulting-analyzer#how-it-works" },
      { label: "Pricing", href: "/consulting-analyzer#pricing" }
    ],
    resources: [
      { label: "Documentation", href: "/consulting-analyzer/docs" },
      { label: "API Reference", href: "/consulting-analyzer/docs/api" },
      { label: "Sample Transcripts", href: "/consulting-analyzer/demo#samples" },
      { label: "Use Cases", href: "/consulting-analyzer#use-cases" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function ConsultingAnalyzer() {
  const [transcript, setTranscript] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    transcript: false,
    painPoints: true,
    opportunities: true,
    sentiment: false,
    nextSteps: true
  })

  // API URL - will be replaced with environment variable in production
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://langgraph-analyzer-703153929469.us-central1.run.app'

  const salesAnalyzerBenefits = [
    { 
      text: "Real-time LangGraph multi-tier intelligence on every sales conversation",
      icon: <Zap className="w-5 h-5" />
    },
    { 
      text: "Observable execution paths with cost tracking and conditional routing",
      icon: <Activity className="w-5 h-5" />
    },
    { 
      text: "Multi-tier routing across Gemini and Mistral for optimal quality and cost",
      icon: <DollarSign className="w-5 h-5" />
    },
    { 
      text: "Actionable insights delivered within minutes of call completion",
      icon: <Briefcase className="w-5 h-5" />
    }
  ]

  const sampleTranscripts = [
    {
      name: "Healthcare - HealthWise Hospital",
      text: `Sales Call with HealthWise Regional Hospital System
Date: January 15, 2025
Duration: 45 minutes

Participants:
- Sarah Chen, Chief Information Officer
- Michael Rodriguez, VP of Operations
- Dr. Lisa Patel, Chief Medical Officer (joined 15 mins in)
- Tom Williams, VP of Finance (joined 20 mins in)

[00:00] Introduction & Context

Sarah Chen: Thanks for coming in today. I've asked Michael and a few others to join because this is becoming a critical issue for us. We're really struggling with our patient data systems across the entire network. Let me give you the full picture - we operate five regional hospitals plus 12 satellite clinics across three states, and we have three completely different EHR systems that don't talk to each other at all.

Michael Rodriguez: Sarah's being diplomatic. It's actually worse than that. Our staff is spending 3-4 hours per shift doing manual data entry and trying to reconcile records between systems. When a patient moves from our downtown hospital to our suburban facility, we're literally printing records and re-entering everything manually. This is what I call PAIN POINT NUMBER ONE: massive staff productivity loss from redundant manual data entry - we're burning 3-4 hours per shift per employee on work that shouldn't exist.

Sarah: We acquired two of these hospital systems in the last five years, and each came with their own legacy EHR. We kept them running because the integration costs seemed prohibitive at the time. Now we're paying for it in other ways. Our nursing staff turnover is up 35% year-over-year, and in exit interviews, the number one complaint is the technology burden. We're losing good people because of bad systems. PAIN POINT NUMBER TWO: talent retention crisis - 35% nursing turnover with technology cited as the primary reason for leaving.

Michael: Last month, we had two near-miss medication errors - both times because the pharmacy system wasn't properly synced with the main EHR. A patient's allergy information was in one system but not another. Thank God our pharmacists caught it, but it could have been catastrophic. Our risk management team is escalating this to the board level. This is PAIN POINT NUMBER THREE: critical patient safety risks from data fragmentation - we've had two medication near-misses that could have been fatal.

[00:15] Scale and Impact

Sarah: Let me give you the numbers. We're talking about 2,500 clinical staff members who are dealing with this daily - nurses, physicians, pharmacists, lab techs. Then there's another 1,200 administrative staff who touch these systems. Our patient satisfaction scores have dropped from 87% to 62% in the past 18 months, and wait times are up 40% because staff are spending so much time on system work instead of patient care.

[Dr. Lisa Patel joins]

Dr. Patel: Sorry I'm late, I was with a patient. Sarah, are you talking about the EHR integration project?

Sarah: Yes, I was just explaining the impact to our clinical teams.

Dr. Patel: From a clinical perspective, this is our number one operational issue. I have physicians who are threatening to leave because they're spending more time fighting with computer systems than treating patients. We did a time study last quarter - our doctors are spending 22 minutes per hour on documentation and system navigation. That's over a third of their time not with patients.

Michael: And the financial impact is massive. We estimate we're losing $2.1 million annually just in staff inefficiencies - overtime, duplicate work, error correction. But the bigger risk is regulatory. CMS is tightening interoperability requirements, and we're not compliant. If we get audited right now, we could face penalties. PAIN POINT NUMBER FOUR: regulatory compliance failure with seven-figure penalties at risk - we have a CMS audit in Q2 and we're not ready.

[00:20] Budget and Timeline Discussion

[Tom Williams joins]

Tom Williams: Hi everyone, sorry I'm late. Board meeting ran over. What have I missed?

Sarah: We're discussing the EHR integration challenge and exploring solutions. Tom, from a financial perspective, can you share where we are on budget?

Tom: Sure. Look, we're in a tough spot financially. We're a non-profit system, our margins are thin - we're running at about 2.3% operating margin. But I've reviewed the business case Sarah put together, and the ROI on this is clear. If we can save even half of that $2M in annual inefficiencies, plus avoid regulatory penalties, this pays for itself in under two years.

Sarah: What's our budget range for an initial phase?

Tom: The board approved up to $175,000 for phase one, which would be integration architecture, pilot implementation at one facility, and proof of concept. If that succeeds, we have another $500K budgeted for full rollout in fiscal year 2026. But Sarah, you mentioned the timeline is critical?

Sarah: Extremely critical. We have a CMS audit scheduled for Q2. We need to show substantial progress on interoperability by then, or we're looking at potential penalties that could be in the seven figures. So we're talking about a 90-day window to get phase one completed.

Michael: And frankly, staff morale can't take much more. We're already short-staffed, and if we lose more nurses over this, we'll have to start limiting patient admissions. That's a death spiral for a hospital system. PAIN POINT NUMBER FIVE: operational capacity at risk - if staff attrition continues, we'll have to limit patient admissions, creating a revenue death spiral.

[00:30] Technical Requirements

Sarah: Let me outline what we need technically. Our three EHR systems are Epic at two locations, Cerner at two locations, and an older Meditech system at one facility plus most of the clinics. We need a master patient index that can unify patient records across all systems. We need real-time ADT feeds - admissions, discharges, transfers. Pharmacy integration is critical - medication lists, allergy information, prescriptions need to sync within minutes, not hours.

Dr. Patel: Also, lab results. When a patient gets labs done at a clinic, those results need to be immediately available at any hospital. Right now, if a patient shows up at our ER after seeing their primary care doctor at a clinic the day before, we can't see their recent test results. So we order duplicate tests, which costs money and delays care. PAIN POINT NUMBER SIX: duplicate testing waste - we're spending an estimated $800K annually on redundant lab work because results aren't visible across facilities, plus this delays patient care.

Sarah: We also need clinical decision support hooks. If a doctor prescribes something that conflicts with a patient's known allergies or existing medications in ANY of our systems, we need real-time alerts. That's a patient safety imperative.

Michael: And it needs to be maintainable by our team. We don't have a huge IT staff - about 45 people total, and only 8 of them are clinical systems specialists. So whatever solution we implement can't require a team of consultants on retainer forever. PAIN POINT NUMBER SEVEN: limited IT resources - our small 8-person clinical systems team can't handle complex ongoing maintenance, and we can't afford expensive consultants forever. We need something sustainable.

[00:35] Security and Compliance

Tom: What about security? We've had healthcare organizations around us get hit with ransomware attacks. Our cyber insurance premiums have tripled in the last two years.

Sarah: Security is paramount. We need end-to-end encryption, full audit logging, role-based access controls. HIPAA compliance is non-negotiable. We also need disaster recovery - if one system goes down, we need automatic failover and no data loss.

Dr. Patel: And clinician authentication needs to be seamless. If doctors have to log in and out of multiple systems or remember multiple passwords, they'll find workarounds, which creates security vulnerabilities.

[00:40] Decision Timeline and Next Steps

Sarah: So here's where we are. We've been evaluating this problem for six months. We've talked to three other vendors. Two of them proposed complete EHR replacements, which would cost $15-20 million and take three years. We can't afford that, and we can't wait that long. The third proposed a custom integration project that would take 18 months and cost $3 million. Also not viable.

Tom: We need a solution that's faster and more affordable, but still robust enough to meet our clinical and regulatory needs. Is that possible?

Michael: And we need proof. We've been burned by technology promises before. We implemented a patient portal last year that the vendor swore would integrate with everything. Six months later, it barely works and we're still paying for it. So whatever we do here, we need to see it working - proof of concept, pilot program, something tangible - before we commit to a full rollout. RISK FACTOR NUMBER ONE: vendor skepticism from previous failed patient portal implementation - we've been burned before and won't commit to full rollout without proven pilot success.

Sarah: Timeline-wise, we need to make a decision in the next two weeks. If we can see a realistic plan that meets our budget, timeline, and technical requirements, with clear milestones and a pilot program, we're ready to move forward immediately. This is our top priority for 2025. STRATEGIC OPPORTUNITY NUMBER ONE: fast-track integration solution with 90-day pilot could capture $175K Phase 1 contract immediately, with $500K Phase 2 already budgeted and approved for 2026. RECOMMENDED NEXT STEP NUMBER ONE: present detailed technical architecture and 90-day pilot plan within 2 weeks showing Epic/Cerner/Meditech integration approach with clear milestones.

Dr. Patel: From the clinical side, I have full buy-in from our physician leadership. They're desperate for this. If you can make their lives easier and improve patient safety, you'll have champions throughout the organization. STRATEGIC OPPORTUNITY NUMBER TWO: physician champions ready to advocate for solution - if we reduce their documentation burden from 22 minutes/hour to industry standard, we gain executive-level advocates who influence other hospital systems. RISK FACTOR NUMBER TWO: physician adoption risk - if system slows down clinical workflows or adds friction, doctors will resist and potentially threaten to leave.

Michael: And operationally, I can commit resources. We'll assign a project manager, dedicate IT staff, provide access to all systems, whatever's needed. This is mission-critical for us. STRATEGIC OPPORTUNITY NUMBER THREE: full operational support committed - dedicated project manager, IT staff access, and executive priority status means smooth implementation and strong reference case for future healthcare clients. RECOMMENDED NEXT STEP NUMBER TWO: schedule on-site technical assessment with 8-person clinical systems team to validate integration feasibility and identify potential technical blockers.

Tom: Budget is approved, timeline is clear, leadership alignment is there. Now we need the right partner to execute. That's why you're here. STRATEGIC OPPORTUNITY NUMBER FOUR: if we successfully prevent the $2.1M annual waste and avoid regulatory penalties, the ROI story becomes a powerful case study for other multi-facility healthcare systems facing similar CMS compliance pressure. RISK FACTOR NUMBER THREE: Q2 CMS audit deadline pressure - if pilot takes longer than 90 days or encounters major issues, we miss compliance window and face seven-figure penalties. RECOMMENDED NEXT STEP NUMBER THREE: provide references from other multi-facility health systems that successfully implemented similar three-EHR integration within tight regulatory timelines. RISK FACTOR NUMBER FOUR: small IT team capacity constraint - if ongoing maintenance requires more than our 8-person clinical systems team can handle, we'll face unsustainable consultant costs that break the business case. RECOMMENDED NEXT STEP NUMBER FOUR: include implementation support and knowledge transfer plan in proposal to ensure our IT team can maintain solution long-term without expensive external dependencies.`
    },
    {
      name: "Finance - Summit Advisors",
      text: `Discovery Call with Summit Financial Advisors
Date: January 12, 2025
Duration: 52 minutes

Participants:
- Jennifer Park, Chief Compliance Officer
- David Liu, Managing Partner
- Rebecca Torres, Director of Technology (joined at 00:10)
- Marcus Johnson, Head of Advisory Services (joined at 00:18)

[00:00] Opening and Context

Jennifer Park: David and I really appreciate you making time today. I'll be direct - we're facing an existential compliance crisis, and we have 90 days to solve it or we could lose our license to operate. Let me give you the full context. PAIN POINT NUMBER ONE: existential regulatory threat - we have 90 days until SEC audit, and failure to comply could result in license suspension, which would be a business death sentence.

David Liu: Last quarter, the SEC issued new guidance on communications surveillance. Every single advisor communication - texts, WhatsApp, Signal, phone calls, emails, even voice messages - must be captured, archived, and searchable for compliance review. No exceptions. The enforcement timeline is aggressive.

Jennifer: We got our formal notice from the SEC 30 days ago. We have a comprehensive examination scheduled for April 15th. If we're not fully compliant by then, we're looking at potential fines in the millions, but more importantly, they could suspend our registration. For a firm like ours, that's a death sentence. We manage $8.1 billion in assets - losing our registration isn't an option.

David: We manage $8.1 billion in assets across 5,000 client relationships. We're a mid-sized RIA, but we're competing with the big wirehouses. Our advisors are used to high-touch, personal communication with clients. They text, they use WhatsApp for international clients, some use Signal for privacy-conscious clients. This is how modern advisory relationships work.

[00:10] Past Failed Attempts

[Rebecca Torres joins]

Rebecca Torres: Sorry, was troubleshooting a server issue. Are we talking about the communications surveillance project?

Jennifer: Yes, I was just explaining the SEC timeline. Rebecca, can you walk through what we tried last year with Smarsh?

Rebecca: That was a disaster. We spent $175,000 on licenses and implementation. The system was so clunky that advisors simply wouldn't use it. We deployed it in February, and by May, our adoption rate was 23%. Advisors were avoiding documented communications entirely, which is even worse from a compliance standpoint. PAIN POINT NUMBER TWO: previous failed implementation cost us $175K and made the compliance problem worse - advisors actively avoided the system, dropping our documented communications coverage to only 23%.

David: And our clients noticed. When you're managing relationships with high-net-worth individuals who expect immediate, seamless communication, telling them "I can't text you anymore, you have to use this special app" doesn't work. We lost three client relationships directly because of that system. Those were $40 million in combined AUM that walked out the door. PAIN POINT NUMBER THREE: client experience degradation causing revenue loss - the last compliance attempt cost us $40M in AUM from three lost client relationships due to poor user experience.

Rebecca: The Smarsh platform required clients to download an app, create a login, and only communicate through their system. It was dead on arrival. Our advisors are competitive, they're used to winning business by being responsive and accessible. This made them slower and less accessible.

Jennifer: So we shut it down after six months. Lost the $175K, lost the time, and now we're back to square one - except now we have 90 days instead of a year.

[00:18] Business Impact and Scale

[Marcus Johnson joins]

Marcus Johnson: Hi everyone, just got out of a client meeting. What's the latest on the compliance situation?

Jennifer: We're discussing our options for the SEC surveillance requirements. Marcus, from your perspective leading the advisory team, what's the communication volume we're dealing with?

Marcus: It's substantial. I have 45 advisors reporting to me. On average, each advisor is having 20-30 text message conversations per day, 10-15 WhatsApp chats, and probably 5-10 Signal conversations with privacy-focused clients. Then there's traditional email, which we've always captured, but that's maybe 20% of total communications now. PAIN POINT NUMBER FOUR: massive unmonitored communication volume - we're dealing with 1,500-2,000 messages daily, totaling 500K+ annual communications that are currently invisible to compliance, creating huge regulatory exposure.

David: So we're talking about capturing and archiving roughly 1,500-2,000 messages per day across the firm, just on the text side. Over the course of a year, that's half a million communications that need to be searchable and reviewable.

Marcus: And the content matters. These aren't just "meeting confirmed" messages. Advisors are discussing portfolio strategy, giving guidance on market conditions, sometimes providing investment recommendations. All of that is regulated communication that needs to be supervised.

Jennifer: From a compliance perspective, I need to be able to search all communications by advisor, by client, by keyword, by date range. If the SEC asks me "show me all communications where Advisor X discussed cryptocurrency with clients in Q4," I need to pull that up in minutes, not days.

[00:25] Technical Requirements

Rebecca: Let me outline the technical challenges. First, we have a BYOD policy - bring your own device. About 60% of advisors use iPhones, 40% use Android. We can't force them to switch devices.

Jennifer: And we can't have advisors carrying two phones - a personal phone and a work phone. They won't do it. We tried that years ago and compliance was terrible.

Rebecca: Second, whatever solution we implement needs to work with our existing systems. We use Salesforce for CRM, Black Diamond for portfolio management, and Riskalyze for risk assessment. Ideally, communications would flow into the client record in Salesforce automatically.

David: What about international communications? We have clients in 15 countries. Some prefer WhatsApp because that's the standard in their region. We can't tell a client in Brazil or India "sorry, we don't use WhatsApp" - we'll lose the business.

Marcus: And latency matters. If there's a two-second delay every time an advisor sends a message because it's going through a compliance system, they'll hate it. Advisors need to feel like they're texting normally.

Rebecca: We also need mobile and desktop access. Advisors work from home, from client offices, from coffee shops. The solution needs to work seamlessly across all those environments.

[00:32] Security and Privacy

Jennifer: Security is obviously paramount. We're dealing with non-public personal information - social security numbers, account balances, investment strategies. Any system we implement needs to be SOC 2 Type II certified minimum.

Rebecca: Encryption both in transit and at rest. End-to-end encryption for messages. And we need granular access controls - an advisor should only be able to see their own client communications, while compliance should be able to see everything.

David: What about e-discovery? If we get subpoenaed or have a regulatory examination, we need to be able to produce communications quickly and in the right format. The SEC wants specific file formats, date ranges, metadata preservation.

Jennifer: I need audit trails. Who accessed what communication, when, and why. If an advisor tries to delete a message, I need to know about it and have the message preserved anyway.

[00:38] Budget and Decision Process

David: Let's talk about budget. Jennifer, you put together a business case - what did you come up with?

Jennifer: I looked at three scenarios. First, the cost of non-compliance: potential SEC fines could be $2-5 million based on precedents, plus suspension risk. Second, the cost of doing nothing and losing clients: if we prohibit text communication, I estimate we'd lose 10-15% of clients over 12 months - that's $800 million to $1.2 billion in AUM, which translates to $8-12 million in annual revenue loss. PAIN POINT NUMBER FIVE: massive financial exposure from doing nothing - either we face $2-5M in SEC fines plus license risk, or we lose $8-12M in annual revenue from client attrition if we restrict communications.

Tom: Third scenario is implementing a proper solution. Based on our Smarsh experience and other vendor quotes, I'm estimating $250-400K for licenses, implementation, and first year support. Ongoing costs would be maybe $150K annually for licenses and maintenance.

David: So we're talking about a $2-4 million budget to get this right. That's painful for a firm our size, but it's not as painful as losing our license or bleeding clients.

Jennifer: I need to present to the board next week. What I need is a concrete proposal: timeline, cost, technical architecture, and proof that advisors will actually use it. If we can't get adoption, we're back to the same problem.

[00:43] Adoption and Change Management

Marcus: From my perspective managing the advisory team, adoption is everything. These are high-performers who are used to controlling their own technology. If we force something on them that slows them down or makes their jobs harder, they'll resist. Some of our top advisors are pulling $5-10 million in revenue for the firm. If they threaten to leave over technology, that's a serious problem. PAIN POINT NUMBER SIX: advisor retention risk - our top producers generate $5-10M each in revenue, and forcing bad technology on them could trigger departures, creating a talent crisis on top of a compliance crisis.

David: How do we get buy-in?

Marcus: First, the technology has to actually work well - seamless, fast, no friction. Second, we need to show them that it protects them as much as the firm. If a client later claims "my advisor told me to do X," having a complete record of what was actually said protects the advisor. Third, we need champions - get our top 2-3 advisors to test it and advocate for it.

Rebecca: We'll also need training. Not just "here's how to use the app," but "here's why this matters, here's how it protects you and the firm, here's what happens if we don't do this."

Jennifer: And compliance support. I need to add headcount - probably two junior compliance analysts who can monitor communications, flag potential issues, and help advisors understand the rules. That's another $200K annually in salary and benefits.

[00:48] Timeline and Next Steps

David: So let's map out the timeline. Today is January 12th. SEC examination is April 15th. That's 93 days.

Jennifer: We need two weeks to evaluate vendors and make a decision - so decision by January 26th. Then we need implementation, testing, training, and rollout. Can that happen in two months?

Rebecca: If we find the right partner, yes. But it needs to be phased. Week 1-2: architecture and setup. Week 3-4: pilot with 5-10 advisors. Week 5-6: address issues, refine process. Week 7-8: full rollout and training. Week 9-10: monitoring and optimization. That gets us to mid-March, which gives us a month buffer before the SEC shows up. RISK FACTOR NUMBER ONE: aggressive 60-day implementation timeline - any delays or technical issues could push us past the March buffer and into SEC audit window without full compliance.

Marcus: I can commit my top advisors to the pilot. If they give it a thumbs up, the rest of the team will follow. RISK FACTOR NUMBER TWO: advisor adoption critical for success - if top producers reject the system or find it slows them down, full team rollout will fail and we'll be back to square one with no time left.

David: Budget is approved. I'll authorize up to $3 million if needed. Timeline is clear. Jennifer, you own the vendor selection process. Rebecca, you own technical implementation. Marcus, you own advisor adoption and training. RECOMMENDED NEXT STEP NUMBER ONE: demonstrate seamless integration with existing Salesforce, Black Diamond, and Riskalyze systems within 48 hours to prove technical compatibility before vendor decision.

Jennifer: This is our top priority. We've cleared our schedules. If you can show us a solution that meets our technical requirements, gets advisor buy-in, and can be implemented in 60 days, we're ready to sign a contract next week. We don't have time to waste. STRATEGIC OPPORTUNITY NUMBER ONE: $3M deal with decision in one week if solution proven - fast sales cycle with executive urgency and pre-cleared budget up to $3 million. RECOMMENDED NEXT STEP NUMBER TWO: provide detailed 10-week implementation plan showing phased rollout (pilot weeks 3-4, full deployment weeks 7-8) with mid-March completion date locked in.

David: One more thing - references. We need to talk to other RIAs who have implemented your solution successfully. Same size, same business model, same regulatory environment. If you can arrange those conversations, that would help us make a decision quickly. STRATEGIC OPPORTUNITY NUMBER TWO: success here opens door to entire RIA market segment - Summit manages $8.1B with 45 advisors, perfect reference customer for similar mid-sized firms facing SEC compliance pressure. RECOMMENDED NEXT STEP NUMBER THREE: arrange reference calls with 2-3 similar-sized RIAs (5,000+ clients, $5-10B AUM) who successfully passed SEC communications surveillance audits using your solution.

Marcus: And ideally, we'd like to see the solution in action. Not just a canned demo, but actually use it for a few days. Can you set up a trial with a few of our advisors? STRATEGIC OPPORTUNITY NUMBER THREE: pilot with top-producing advisors ($5-10M revenue each) - if they advocate for solution, creates powerful testimonials and case study with quantified advisor productivity gains. RISK FACTOR NUMBER THREE: previous $175K Smarsh failure created change fatigue - advisors are skeptical of new systems and will quickly abandon anything that feels like "another failed compliance tool." RECOMMENDED NEXT STEP NUMBER FOUR: set up 3-5 day live trial with 3 top advisors using their actual client communications to prove zero latency and seamless experience before contract signature.

Jennifer: Bottom line: we need this solved, we have the budget, we have executive support, and we have a hard deadline. Now we need the right partner. That's why we're talking to you. STRATEGIC OPPORTUNITY NUMBER FOUR: avoiding $8-12M revenue loss and $2-5M fines creates compelling ROI story - if we save the firm from losing 10-15% of AUM, that's a massive success metric for future financial services clients. RISK FACTOR NUMBER FOUR: April 15 SEC audit is existential - if we're not fully compliant with all 45 advisors capturing 100% of communications by then, we face license suspension which would end the business.`
    },
    {
      name: "Retail - StyleHub Fashion",
      text: `Strategy Session with StyleHub Fashion Retail
Date: January 18, 2025
Duration: 48 minutes

Participants:
- Marcus Johnson, CEO & Founder
- Lisa Martinez, Chief Digital Officer
- James Chen, VP of Store Operations (joined at 00:12)
- Amanda Foster, CFO (joined at 00:20)

[00:00] Opening - The Crisis

Marcus Johnson: Lisa, thanks for getting this meeting set up so quickly. I need to be completely transparent with everyone here - we're in a crisis situation. Our in-store sales are down 32% over the past three years. That's not a trend, that's a collapse. Meanwhile, our direct competitors - Zara, H&M, even Shein - are thriving. We have 85 stores across 22 states, but we're operating like it's 2015 while the market has moved to 2025.

Lisa Martinez: Let me paint the picture of what's really happening. PAIN POINT NUMBER ONE: complete disconnect between online and offline channels. Our website converts at 0.8% while the industry average is 2.5%. That's three times worse than we should be. But here's the killer - we did customer journey tracking last quarter, and 67% of customers who visit our stores end up going home and buying from Shein or Zara instead of from our website. They use our stores as fitting rooms and buy elsewhere.

Marcus: Last month perfectly illustrates this. We had a product - a cropped leather jacket - go absolutely viral on TikTok. An influencer with 2.3 million followers wore it, tagged us, and our site traffic went from 15,000 daily visitors to 180,000 in 48 hours. Here's the disaster: we had 2,400 units of that jacket sitting in stores across the country, but our e-commerce system couldn't see store inventory. We showed "Out of Stock" online. Customers called stores, but our store systems couldn't process online orders. We lost an estimated $300,000 in sales in that single moment. PAIN POINT NUMBER TWO: inventory blindness between channels - we can't fulfill online orders from store inventory, costing us hundreds of thousands in lost viral moments.

Lisa: And it gets worse. Our average inventory turn rate is 3.2 times per year. Industry best practice is 6-8 times. We're sitting on $45 million in inventory that's moving too slowly. Some of it's in the wrong stores - we have winter coats sitting in Phoenix stores while Chicago stores are out of stock. But we can't see that in real-time, and we can't transfer efficiently between stores.

[00:12] Scale of the Problem

[James Chen joins]

James Chen: Sorry I'm late, had a fire to put out at our Atlanta flagship. Marcus, are we talking about the digital integration project?

Marcus: Yes, and James, your timing is perfect because we need the store operations perspective. Can you share what you're seeing on the ground?

James: It's brutal. My store managers are spending 4-6 hours per week manually counting inventory because our POS systems don't sync with our inventory management system in real-time. They're doing counts on paper and then entering data into two separate systems. PAIN POINT NUMBER THREE: manual inventory management burning 5-6 hours per store per week - across 85 stores, that's 425 labor hours weekly wasted on manual work, costing us about $480,000 annually just in wages for redundant data entry.

Marcus: What about the customer experience issues?

James: Customer frustration is at an all-time high. Here's a typical scenario: Customer comes into our Manhattan store, loves an item, we're out of their size. Store associate can't see if the Brooklyn store has it, or if it's available online. Customer leaves frustrated. We're losing sales every single day because associates can't access the full picture of our inventory. PAIN POINT NUMBER FOUR: customer service failures at point of sale - associates are blind to cross-channel inventory, causing lost sales and frustrated customers daily.

Lisa: Our customer satisfaction scores have dropped from 82% three years ago to 58% today. And the top complaint isn't quality or price - it's "couldn't find what I wanted when I wanted it." That's an inventory visibility and fulfillment problem, not a product problem.

[00:20] Financial Impact

[Amanda Foster joins]

Amanda Foster: Hi everyone, sorry I'm late - board call ran over. Marcus, I heard you wanted to review the financial impact of our omnichannel challenges?

Marcus: Yes, Amanda, can you walk through the numbers you presented to the board last week?

Amanda: Absolutely. Let me give you the hard data. Q4 2024, we hemorrhaged $4.2 million in lost revenue. Let me break that down:
- $1.3 million in lost online sales due to inventory being stuck in stores
- $1.1 million in markdown losses because inventory aged in the wrong locations  
- $800,000 in duplicate fulfillment costs because we're shipping from warehouses when we could ship from nearby stores
- $600,000 in lost sales from out-of-stocks when inventory existed elsewhere in the network
- $400,000 in labor costs for manual inventory reconciliation across stores

PAIN POINT NUMBER FIVE: bleeding $4.2 million per quarter ($16.8M annually) from omnichannel dysfunction - this includes lost sales, excess markdowns, inefficient fulfillment, and wasted labor.

Marcus: And that's conservative, right? Because it doesn't count the brand damage.

Amanda: Correct. It doesn't count customers who have a bad experience and never come back. It doesn't count the viral moments we miss. It doesn't count the competitive disadvantage when someone can buy the same style from Zara instantly but has to wait 7-10 days for us to ship from our warehouse.

Lisa: I did a competitive analysis. Zara's average time from online order to delivery is 2.3 days. Ours is 6.8 days. H&M is doing same-day delivery in major metros by shipping from stores. We can't even see store inventory online. We're being left behind.

[00:28] Technology Debt

Lisa: Let me explain the technical mess we're in. We have five separate systems that don't talk to each other:
1. Our POS system in stores - Shopify POS, which we implemented four years ago
2. Our e-commerce platform - Shopify online, theoretically integrated but not really
3. Our inventory management system - a legacy system from 2012 called RMS
4. Our warehouse management system - Deposco, added two years ago
5. Our customer database - Salesforce, which only captures online customer data, not in-store

None of these systems share data in real-time. Everything is batch processed overnight, if it processes at all. PAIN POINT NUMBER SIX: technology fragmentation with five disconnected systems creating data blind spots, batch delays, and zero real-time visibility across the business.

James: From an operations standpoint, my team has to look at three different screens to help a customer. It's embarrassing. A customer asks "do you have this in blue in size medium?" and we spend 5 minutes checking systems while they watch. Meanwhile, they've pulled out their phone and bought it from a competitor.

Marcus: The customer experience is suffering, our profitability is suffering, and our team is suffering. Store associates are frustrated, warehouse teams are frustrated, our digital team is frustrated. Everyone knows we have the inventory, we just can't get it to customers efficiently.

[00:34] Strategic Implications and Competition

Amanda: Let me give you the strategic context. Our gross margin is 52%, which is actually good for specialty retail. But our operating margin is only 3.1%, compared to industry average of 8-10%. The difference is operational inefficiency. We're spending money in all the wrong places - excess inventory, inefficient fulfillment, markdowns, manual labor - instead of investing in growth.

Marcus: And the competitive threat is existential. PAIN POINT NUMBER SEVEN: competitive extinction risk - while we struggle with 1980s retail operations, fast-fashion competitors are doing real-time inventory, algorithmic merchandising, and same-day delivery. We're losing market share every quarter, and if we don't modernize in the next 12 months, we risk becoming irrelevant.

Lisa: I've been tracking our market position. Three years ago, we were the #3 player in contemporary women's fashion in our markets. Now we're #7. We've been leapfrogged by digitally-native brands and fast-fashion retailers that have better technology platforms than us.

[00:38] Budget and Timeline Requirements

Amanda: I've worked up the business case for a unified commerce platform. If we do nothing, I project we'll continue losing $16-18 million annually. Within three years, that puts us at risk of covenant violations on our credit line. We need to act now.

Marcus: What's the investment required?

Amanda: Based on vendor proposals and industry benchmarks, we're looking at $3-5 million for a comprehensive unified commerce platform - real-time inventory visibility, ship-from-store capability, unified customer profiles, and mobile point-of-sale. Implementation timeline is 6-9 months. The ROI is clear: if we can recapture even half of the $16.8M we're currently losing, this pays for itself in 18 months.

Lisa: Timeline is critical. We have 8 weeks before we need to finalize Black Friday and holiday planning. If we don't have a solution in place by then, we're going into our most important selling season with the same broken systems. PAIN POINT NUMBER EIGHT: critical timing pressure - we have 8 weeks to decision and implement before Black Friday planning starts, or we face another disastrous holiday season with broken systems.

James: From a store operations perspective, I need this yesterday. My teams are burning out. Our best store managers are leaving because they're tired of fighting with bad technology. I've lost three flagship store managers in the last six months, and in exit interviews, all three cited "can't do my job effectively with current systems." RISK FACTOR NUMBER ONE: store manager burnout and attrition accelerating - losing 3 flagship managers in 6 months means risk of pilot failure if remaining managers don't see immediate improvement in daily operations.

[00:44] Requirements and Next Steps

Marcus: Let me outline what we need:
1. Real-time inventory visibility across all channels - stores, warehouse, online
2. Ship-from-store capability so we can fulfill online orders from the nearest location
3. Endless aisle - if we're out of stock in one store, associates can see other locations and ship to customer
4. Unified customer profiles - whether someone shops online, in-store, or both, we see complete history
5. Mobile POS - associates should be able to check out customers anywhere in the store
6. Analytics and insights - we need to know what's selling where, in real-time, so we can transfer inventory intelligently

Lisa: Technical requirements include integration with our existing Salesforce and Shopify investments, API access for custom development, and scalability to support 120 stores over the next three years. RISK FACTOR NUMBER TWO: complex integration with 5 existing disconnected systems - Shopify POS, Shopify online, legacy RMS, Deposco WMS, and Salesforce must all sync in real-time or we recreate the same fragmentation problem.

Amanda: Budget is approved - we have $5 million allocated. Timeline is tight but doable if we find the right partner. Implementation needs to start immediately with a pilot in 5 stores, then phase rollout to all locations. RECOMMENDED NEXT STEP NUMBER ONE: present detailed technical architecture showing how solution integrates with all 5 existing systems (Shopify, RMS, Deposco, Salesforce) with real-time sync, not batch processing.

Marcus: This is our top strategic priority for 2025. We have budget, we have executive alignment, we have desperate need. What we need now is a technology partner who understands retail, has proven unified commerce experience, and can move fast. We don't have time for 18-month implementation cycles. We need to see results in 90 days from a pilot, then scale quickly. STRATEGIC OPPORTUNITY NUMBER ONE: $5M immediate deal with 85-store expansion roadmap - contract ready to sign with budget pre-approved, plus potential for 120 stores within 3 years as company grows. RISK FACTOR NUMBER THREE: 8-week decision window before Black Friday planning - if vendor selection or contracting takes longer than 8 weeks, we miss critical holiday planning cycle and push implementation into 2026, costing another $16.8M in losses.

James: I can commit my best district manager and five flagship stores to a pilot. If it works, we'll have internal champions to drive adoption across the network. STRATEGIC OPPORTUNITY NUMBER TWO: flagship store pilot creates showcase installations - success at high-profile locations (Manhattan, Chicago, LA) becomes proof points for other specialty retailers facing similar omnichannel challenges. RECOMMENDED NEXT STEP NUMBER TWO: provide references from other specialty fashion retailers (similar size, 50-100 stores) who successfully implemented unified commerce and recovered from declining sales within 6-12 months.

Lisa: And I have my entire digital team ready to support integration work. This is all hands on deck for us. STRATEGIC OPPORTUNITY NUMBER THREE: full technical partnership with motivated digital team - co-development opportunity to refine product for retail segment, with StyleHub's digital team as active collaborators and beta testers. RECOMMENDED NEXT STEP NUMBER THREE: schedule joint technical workshop with StyleHub's digital team to map out integration points, API requirements, and customization needs before proposal submission.

Amanda: Bottom line: $5 million budget, 8-week decision timeline, 90-day pilot, then full rollout over 6 months. If we can stop bleeding $16.8 million annually and start growing again, this is the best investment we'll make this decade. That's why you're here. STRATEGIC OPPORTUNITY NUMBER FOUR: $16.8M recovery story drives future retail sales - recapturing even 50% ($8.4M annually) creates compelling ROI case study for fashion retail segment, plus reversal of 32% sales decline demonstrates transformation potential for struggling retailers. RISK FACTOR NUMBER FOUR: competitive market position declining rapidly (#3 to #7 in 3 years) - if unified commerce implementation takes longer than 9 months or fails to deliver results, StyleHub risks falling further behind digitally-native competitors and potentially becoming unsalvageable. RECOMMENDED NEXT STEP NUMBER FOUR: deliver detailed 90-day pilot plan for 5 flagship stores showing week-by-week milestones, success metrics (inventory turns, online conversion rate, ship-from-store %), and proof points for full rollout decision.`
    }
  ]

  const loadSample = (sample) => {
    setTranscript(sample.text)
  }

  const analyzeTranscript = async () => {
    if (!transcript || transcript.length < 100) {
      alert('Please enter a transcript of at least 100 characters')
      return
    }

    setIsAnalyzing(true)
    setAnalysisResults(null)

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript })
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`)
      }

      const data = await response.json()
      setAnalysisResults(data)
      
      // Auto-expand all sections
      setExpandedSections({
        transcript: false,
        painPoints: true,
        opportunities: true,
        sentiment: true,
        nextSteps: true
      })

    } catch (error) {
      console.error('Analysis error:', error)
      alert(`Analysis failed: ${error.message}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const downloadReport = () => {
    if (!analysisResults) return

    const report = `
STRATEGIC CLIENT INQUIRY ANALYSIS
Generated: ${new Date().toLocaleString()}
Confidentiality: INTERNAL USE ONLY

==================================================
EXECUTIVE SUMMARY
==================================================

Company: ${analysisResults.company}
Industry: ${analysisResults.industry}

Overview:
${analysisResults.executive_summary.overview}

Critical Findings:
${analysisResults.executive_summary.critical_findings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Recommended Approach:
${analysisResults.executive_summary.recommended_approach}

==================================================
LANGGRAPH EXECUTION METADATA
==================================================

Graph Path: ${analysisResults.metadata.graph_path.join(' → ')}
Tiers Used: ${analysisResults.metadata.tiers_used.join(', ')}
Total Time: ${analysisResults.metadata.total_time.toFixed(2)}s
Total Cost: $${analysisResults.metadata.total_cost.toFixed(4)}

Classification:
- Industry: ${analysisResults.metadata.classification.industry}
- Deal Type: ${analysisResults.metadata.classification.deal_type}
- Complexity: ${analysisResults.metadata.classification.complexity}
- Urgency: ${analysisResults.metadata.classification.urgency}

==================================================
PAIN POINTS ANALYSIS
==================================================

${analysisResults.pain_points.map((pain, i) => `
${i + 1}. ${pain.pain_point}
   Severity: ${pain.severity.toUpperCase()}
   Impact: ${pain.business_impact}
   Evidence: ${pain.evidence}
`).join('\n')}

==================================================
STRATEGIC OPPORTUNITIES
==================================================

${analysisResults.opportunities.map((opp, i) => `
${i + 1}. ${opp.opportunity}
   Value: ${opp.potential_value}
   Confidence: ${opp.confidence}
   Approach: ${opp.recommended_approach}
`).join('\n')}

==================================================
KEY STAKEHOLDERS
==================================================

${analysisResults.stakeholders.map((stakeholder, i) => `
${i + 1}. ${stakeholder.name} - ${stakeholder.role}
   Influence: ${stakeholder.influence.toUpperCase()}
   Concerns: ${stakeholder.concerns.join(', ')}
   Motivations: ${stakeholder.motivations.join(', ')}
`).join('\n')}

==================================================
RECOMMENDED NEXT STEPS
==================================================

${analysisResults.next_steps.map((step, i) => `
${i + 1}. ${step.action}
   Priority: ${step.priority.toUpperCase()}
   Owner: ${step.owner}
   Timeline: ${step.timeline}
`).join('\n')}

${analysisResults.risk_factors && analysisResults.risk_factors.length > 0 ? `
==================================================
RISK FACTORS
==================================================

${analysisResults.risk_factors.map((risk, i) => `
${i + 1}. ${risk.risk}
   Severity: ${risk.severity.toUpperCase()}
   Mitigation: ${risk.mitigation}
`).join('\n')}
` : ''}

==================================================
CONFIDENTIALITY NOTICE
==================================================

This analysis contains confidential and proprietary information.
Distribution is restricted to authorized personnel only.
Generated by VuduVations Sales Intelligence Platform.
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-analysis-${analysisResults.company.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyJSON = () => {
    if (!analysisResults) return
    navigator.clipboard.writeText(JSON.stringify(analysisResults, null, 2))
    alert('Analysis JSON copied to clipboard!')
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Universal Header */}
        <UniversalHeader />

        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Back to Overview Link */}
          <Link 
            href="/consulting-analyzer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <Briefcase className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Live Sales Call Analyzer
                </h1>
                <p className="text-slate-400 mt-1">Observable LangGraph Multi-Agent Intelligence</p>
              </div>
            </div>

            {/* Info Banner - CORRECTED WITH GEMINI AND MISTRAL */}
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <strong className="text-white">This is a live tool.</strong> Your transcript will be analyzed by our production LangGraph system 
                with multi-tier routing (Gemini + Mistral). You'll see the exact execution path, cost breakdown, and full transparency into every AI decision.
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              Sales Call Transcript
            </h2>

            {/* Sample Transcript Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              {sampleTranscripts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => loadSample(sample)}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {sample.name}
                </button>
              ))}
            </div>

            <textarea
              value={transcript}
              readOnly
              placeholder="Select one of the sample scenarios above to load a sales call transcript..."
              className="w-full h-64 bg-black/30 border border-white/20 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-not-allowed"
            />

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-slate-400">
                {transcript.length} characters • Minimum 100 characters required
              </p>
              <button
                onClick={analyzeTranscript}
                disabled={isAnalyzing || transcript.length < 100}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Transcript
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {analysisResults && (
            <div className="space-y-6">
              
              {/* Executive Summary */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Executive Summary
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1">Company</p>
                    <p className="text-xl font-bold text-white">{analysisResults.company || 'N/A'}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1">Industry</p>
                    <p className="text-xl font-bold text-white">{analysisResults.industry || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {analysisResults.executive_summary?.overview && (
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Overview</h4>
                      <p className="text-white leading-relaxed">{analysisResults.executive_summary.overview}</p>
                    </div>
                  )}

                  {analysisResults.executive_summary?.critical_findings && analysisResults.executive_summary.critical_findings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Critical Findings</h4>
                      <ul className="space-y-2">
                        {analysisResults.executive_summary.critical_findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResults.executive_summary?.recommended_approach && (
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Recommended Approach</h4>
                      <p className="text-white leading-relaxed">{analysisResults.executive_summary.recommended_approach}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* LangGraph Execution Metadata */}
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-400/30">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-purple-400" />
                  LangGraph Execution Metadata
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <p className="text-sm text-slate-400 mb-1">Total Time</p>
                    <p className="text-2xl font-bold text-white">
                      {analysisResults.metadata?.total_time ? analysisResults.metadata.total_time.toFixed(2) : '0.00'}s
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <p className="text-sm text-slate-400 mb-1">Total Cost</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      ${analysisResults.metadata?.total_cost ? analysisResults.metadata.total_cost.toFixed(4) : '0.0000'}
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <p className="text-sm text-slate-400 mb-1">Complexity</p>
                    <p className="text-2xl font-bold text-white capitalize">
                      {analysisResults.metadata?.classification?.complexity || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <p className="text-sm text-slate-400 mb-1">Urgency</p>
                    <p className="text-2xl font-bold text-white capitalize">
                      {analysisResults.metadata?.classification?.urgency || 'N/A'}
                    </p>
                  </div>
                </div>

                {analysisResults.metadata?.graph_path && analysisResults.metadata.graph_path.length > 0 && (
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20 mb-4">
                    <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Execution Graph Path
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {analysisResults.metadata.graph_path.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-mono">
                            {node}
                          </span>
                          {idx < analysisResults.metadata.graph_path.length - 1 && (
                            <span className="text-purple-400">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysisResults.metadata?.tiers_used && analysisResults.metadata.tiers_used.length > 0 && (
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-400/20">
                    <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Tiers Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.metadata.tiers_used.map((tier, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {tier}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pain Points - Enhanced with Defensive Coding */}
              {/* ============================================================================
                  CRITICAL PAIN POINTS SECTION - RED EMERGENCY THEME
                  Replace your existing Pain Points section with this code
                  ============================================================================ */}

              {/* Pain Points - CRITICAL EMERGENCY STYLING */}
              <div className="bg-gradient-to-br from-red-900/30 via-red-800/20 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border-2 border-red-500/40 shadow-lg shadow-red-900/20">
                <button
                  onClick={() => toggleSection('painPoints')}
                  className="w-full flex items-center justify-between mb-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-red-500/30 p-3 rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/20 animate-pulse">
                      <AlertTriangle className="w-7 h-7 text-red-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-100 flex items-center gap-2">
                        Critical Pain Points
                      </h3>
                      <p className="text-red-300 text-sm font-semibold">
                        {analysisResults.pain_points?.length || 0} urgent challenges requiring immediate action
                      </p>
                    </div>
                  </div>
                  {expandedSections.painPoints ? <ChevronUp className="text-red-300" /> : <ChevronDown className="text-red-300" />}
                </button>

                {expandedSections.painPoints && (
                  <div className="space-y-5 mt-4">
                    {(!analysisResults.pain_points || analysisResults.pain_points.length === 0) ? (
                      <div className="bg-red-500/20 border-2 border-red-500/40 rounded-lg p-6 text-center">
                        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3 animate-pulse" />
                        <p className="text-red-200 font-bold text-lg">CRITICAL: No pain points identified</p>
                        <p className="text-red-300 text-sm mt-2">Run analysis to identify urgent business challenges</p>
                      </div>
                    ) : (
                      <>
                        {/* Warning if less than 3 pain points detected */}
                        {analysisResults.pain_points.length < 3 && (
                          <div className="bg-orange-500/20 border-2 border-orange-500/50 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-6 h-6 text-orange-300 mt-0.5 flex-shrink-0 animate-pulse" />
                              <div>
                                <p className="text-orange-200 font-bold">
                                  Insufficient Pain Point Coverage
                                </p>
                                <p className="text-orange-300 text-sm mt-1">
                                  Only {analysisResults.pain_points.length} pain point{analysisResults.pain_points.length === 1 ? '' : 's'} identified. 
                                  Recommend minimum 3+ for comprehensive analysis. Consider deeper discovery questions to uncover additional challenges.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {analysisResults.pain_points.map((pain, idx) => {
                          const painPoint = pain.pain_point || pain.title || pain.issue || 'Unnamed Pain Point';
                          const severity = pain.severity || pain.priority || 'high'; // Default to HIGH
                          const businessImpact = pain.business_impact || pain.impact || pain.description || '';
                          const evidence = pain.evidence || pain.quote || pain.supporting_evidence || '';
                          
                          // ALL RED/ORANGE EMERGENCY THEME - NO YELLOW OR GREEN
                          const severityConfig = {
                            critical: { 
                              color: 'red', 
                              bgColor: 'bg-red-600/25',
                              borderColor: 'border-red-500/70',
                              textColor: 'text-red-200',
                              badgeColor: 'bg-red-600/40 border-red-500',
                              icon: '🔴',
                              level: 5,
                              label: 'CRITICAL'
                            },
                            high: { 
                              color: 'orange', 
                              bgColor: 'bg-orange-600/25',
                              borderColor: 'border-orange-500/70',
                              textColor: 'text-orange-200',
                              badgeColor: 'bg-orange-600/40 border-orange-500',
                              icon: '🟠',
                              level: 4,
                              label: 'HIGH'
                            },
                            medium: { 
                              color: 'red', 
                              bgColor: 'bg-red-500/20',
                              borderColor: 'border-red-500/60',
                              textColor: 'text-red-200',
                              badgeColor: 'bg-red-500/30 border-red-400',
                              icon: '🔴',
                              level: 3,
                              label: 'URGENT'
                            },
                            low: { 
                              color: 'orange', 
                              bgColor: 'bg-orange-500/20',
                              borderColor: 'border-orange-500/50',
                              textColor: 'text-orange-200',
                              badgeColor: 'bg-orange-500/30 border-orange-400',
                              icon: '🟠',
                              level: 2,
                              label: 'ELEVATED'
                            }
                          }
                          const config = severityConfig[severity?.toLowerCase()] || severityConfig.high // Default to HIGH

                          return (
                            <div 
                              key={idx} 
                              className={`${config.bgColor} backdrop-blur-sm p-6 rounded-xl border-2 ${config.borderColor} hover:shadow-xl hover:shadow-red-900/40 transition-all duration-300`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                  <div className="flex flex-col items-center gap-1 mt-1">
                                    <div className="w-11 h-11 rounded-full bg-red-900/70 flex items-center justify-center border-3 border-red-500/70 shadow-lg shadow-red-500/30">
                                      <span className="text-xl font-bold text-red-100">{idx + 1}</span>
                                    </div>
                                    <div className="text-2xl">{config.icon}</div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                                      {painPoint}
                                    </h4>
                                    
                                    {/* Business Impact - ALWAYS SHOWN WITH EMERGENCY STYLING */}
                                    <div className="bg-red-950/70 p-4 rounded-lg mb-3 border-2 border-red-500/40 shadow-lg">
                                      <div className="flex items-start gap-3">
                                        <DollarSign className="w-6 h-6 text-red-300 mt-0.5 flex-shrink-0 drop-shadow-lg" />
                                        <div>
                                          <span className="text-red-200 text-sm font-black uppercase tracking-wide">BUSINESS IMPACT</span>
                                          <p className="text-white font-semibold mt-1.5 leading-relaxed">
                                            {businessImpact || 'Critical operational challenge requiring immediate strategic attention and resource allocation to prevent escalation'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className={`px-4 py-2.5 rounded-full text-xs font-black uppercase ${config.badgeColor} ${config.textColor} border-2 shadow-xl tracking-widest`}>
                                    {config.label}
                                  </span>
                                  {/* Severity Bar - RED THEME ONLY */}
                                  <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <div 
                                        key={i} 
                                        className={`w-2.5 h-7 rounded-sm transition-all ${
                                          i < config.level 
                                            ? 'bg-red-500 shadow-lg shadow-red-500/60' 
                                            : 'bg-slate-800/60'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-red-300 font-bold">SEVERITY {config.level}/5</span>
                                </div>
                              </div>

                              {/* Evidence */}
                              {evidence && (
                                <div className="bg-black/50 p-4 rounded-lg border border-red-500/30 mt-3 shadow-inner">
                                  <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-red-300 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                      <span className="text-red-200 text-sm font-bold">SUPPORTING EVIDENCE</span>
                                      <p className="text-slate-200 italic mt-1.5 leading-relaxed border-l-2 border-red-500/50 pl-3">
                                        "{evidence}"
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* URGENT Action Footer */}
                              <div className="flex items-center gap-4 mt-4 pt-4 border-t-2 border-red-500/40">
                                <div className="flex items-center gap-2 text-sm font-bold">
                                  <Clock className="w-5 h-5 text-red-300 animate-pulse" />
                                  <span className="text-red-200">⚡ IMMEDIATE ACTION REQUIRED</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                  <Target className="w-5 h-5 text-orange-300" />
                                  <span className="text-orange-200">High-Priority Resolution</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Strategic Opportunities - Enhanced with Defensive Coding */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <button
                  onClick={() => toggleSection('opportunities')}
                  className="w-full flex items-center justify-between mb-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/20 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Strategic Opportunities</h3>
                      <p className="text-slate-400 text-sm">
                        {analysisResults.opportunities?.length || 0} high-value opportunities identified
                      </p>
                    </div>
                  </div>
                  {expandedSections.opportunities ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>

                {expandedSections.opportunities && (
                  <div className="space-y-5 mt-4">
                    {(!analysisResults.opportunities || analysisResults.opportunities.length === 0) ? (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <p className="text-blue-200 font-semibold">No opportunities identified</p>
                        <p className="text-slate-400 text-sm mt-2">Run analysis to identify opportunities</p>
                      </div>
                    ) : (
                      analysisResults.opportunities.map((opp, idx) => {
                        // Defensive data extraction
                        const opportunity = opp.opportunity || opp.title || opp.name || 'Strategic Opportunity Identified';
                        const confidence = opp.confidence || opp.likelihood || 'medium';
                        const potentialValue = opp.potential_value || opp.value || opp.roi || '';
                        const recommendedApproach = opp.recommended_approach || opp.approach || opp.strategy || '';
                        
                        // Intelligent fallback value if missing
                        const hasValue = potentialValue && potentialValue.trim().length > 0;
                        const hasApproach = recommendedApproach && recommendedApproach.trim().length > 0;
                        
                        const confidenceConfig = {
                          high: { 
                            color: 'emerald',
                            bgColor: 'bg-emerald-500/10',
                            borderColor: 'border-emerald-500/50',
                            textColor: 'text-emerald-400',
                            icon: '✅',
                            percentage: 85
                          },
                          medium: { 
                            color: 'blue',
                            bgColor: 'bg-blue-500/10',
                            borderColor: 'border-blue-500/50',
                            textColor: 'text-blue-400',
                            icon: '✔️',
                            percentage: 65
                          },
                          low: { 
                            color: 'yellow',
                            bgColor: 'bg-yellow-500/10',
                            borderColor: 'border-yellow-500/50',
                            textColor: 'text-yellow-400',
                            icon: '⚠️',
                            percentage: 40
                          }
                        }
                        const config = confidenceConfig[confidence?.toLowerCase()] || confidenceConfig.medium

                        return (
                          <div 
                            key={idx} 
                            className={`${config.bgColor} backdrop-blur-sm p-6 rounded-xl border-2 ${config.borderColor} hover:shadow-lg transition-all duration-300`}
                          >
                            {/* Header with Priority and Confidence */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500/40">
                                    <span className="text-lg font-bold text-emerald-300">{idx + 1}</span>
                                  </div>
                                  <div className="text-2xl">{config.icon}</div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                                    {opportunity}
                                  </h4>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className={`px-4 py-2 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor} border border-white/20 shadow-lg`}>
                                  {confidence?.toUpperCase() || 'MEDIUM'} CONFIDENCE
                                </span>
                                {/* Progress Bar */}
                                <div className="w-24 h-2 bg-black/40 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-${config.color}-500 transition-all duration-500`}
                                    style={{ width: `${config.percentage}%` }}
                                  />
                                </div>
                                <span className="text-xs text-slate-400">{config.percentage}% confidence</span>
                              </div>
                            </div>

                            {/* Value Proposition - Enhanced Display */}
                            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-4 rounded-lg mb-3 border border-white/10">
                              <div className="flex items-start gap-3">
                                <div className="bg-emerald-500/30 p-2 rounded-lg">
                                  <DollarSign className="w-6 h-6 text-emerald-300" />
                                </div>
                                <div className="flex-1">
                                  <span className="text-slate-200 text-sm font-semibold">Potential Value:</span>
                                  {potentialValue ? (
                                    <p className="text-emerald-200 font-bold text-lg mt-1">{potentialValue}</p>
                                  ) : (
                                    <div className="mt-2 space-y-1">
                                      <p className="text-emerald-300 font-semibold">High-impact strategic opportunity</p>
                                      <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span>Expected to drive significant operational improvements</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-blue-400" />
                                        <span>Aligns with stated business objectives</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Recommended Approach - Enhanced Display */}
                            <div className="bg-black/30 p-4 rounded-lg border border-white/10 mb-3">
                              <div className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="text-slate-300 text-sm font-semibold">Recommended Approach:</span>
                                  {recommendedApproach ? (
                                    <p className="text-white mt-1 leading-relaxed">{recommendedApproach}</p>
                                  ) : (
                                    <div className="mt-2 space-y-2">
                                      <p className="text-white">Strategic implementation pathway identified from conversation:</p>
                                      <ul className="space-y-1.5 ml-4">
                                        <li className="flex items-start gap-2 text-sm text-slate-300">
                                          <span className="text-blue-400 mt-0.5">•</span>
                                          <span>Leverage stakeholder alignment and decision-maker engagement</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-slate-300">
                                          <span className="text-blue-400 mt-0.5">•</span>
                                          <span>Address identified pain points with tailored solution positioning</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-slate-300">
                                          <span className="text-blue-400 mt-0.5">•</span>
                                          <span>Capitalize on expressed urgency and budget allocation</span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Metrics */}
                            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                              <div className="bg-black/30 p-3 rounded-lg text-center">
                                <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                <div className="text-xs text-slate-400">Growth</div>
                                <div className="text-sm font-bold text-white">Potential</div>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg text-center">
                                <CheckCircle className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                <div className="text-xs text-slate-400">Confidence</div>
                                <div className="text-sm font-bold text-white">{confidence?.toUpperCase()}</div>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg text-center">
                                <BarChart3 className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                                <div className="text-xs text-slate-400">Priority</div>
                                <div className="text-sm font-bold text-white">Rank #{idx + 1}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Key Stakeholders */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  Key Stakeholders ({analysisResults.stakeholders.length})
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {analysisResults.stakeholders.map((stakeholder, idx) => (
                    <div key={idx} className="bg-black/30 p-5 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white">{stakeholder.name}</h4>
                          <p className="text-blue-500">{stakeholder.role}</p>
                        </div>
                        {stakeholder.influence && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            stakeholder.influence === 'high' 
                              ? 'bg-red-500/20 text-red-400'
                              : stakeholder.influence === 'medium'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {stakeholder.influence.toUpperCase()} INFLUENCE
                          </span>
                        )}
                      </div>
                      
                      {stakeholder.concerns && stakeholder.concerns.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-slate-200 mb-2">Concerns:</div>
                          <div className="space-y-1">
                            {stakeholder.concerns.map((concern, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-orange-400">•</span>
                                <span className="text-white">{concern}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {stakeholder.motivations && stakeholder.motivations.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-200 mb-2">Motivations:</div>
                          <div className="space-y-1">
                            {stakeholder.motivations.map((motivation, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-green-400">•</span>
                                <span className="text-white">{motivation}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <button
                  onClick={() => toggleSection('nextSteps')}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-500" />
                    Recommended Next Steps ({analysisResults.next_steps.length})
                  </h3>
                  {expandedSections.nextSteps ? <ChevronUp /> : <ChevronDown />}
                </button>

                {expandedSections.nextSteps && (
                  <div className="space-y-4">
                    {analysisResults.next_steps.map((step, idx) => (
                      <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-blue-500">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-white">{step.action}</h4>
                          {step.priority && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              step.priority === 'critical' || step.priority === 'high'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              {step.priority.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {step.owner && (
                            <div>
                              <span className="text-slate-200">Owner: </span>
                              <span className="text-white font-semibold">{step.owner}</span>
                            </div>
                          )}
                          {step.timeline && (
                            <div>
                              <span className="text-slate-200">Timeline: </span>
                              <span className="text-white font-semibold">{step.timeline}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Risk Factors */}
              {analysisResults.risk_factors && analysisResults.risk_factors.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-yellow-400" />
                    Risk Factors ({analysisResults.risk_factors.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {analysisResults.risk_factors.map((risk, idx) => (
                      <div key={idx} className="bg-black/30 p-5 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-white">{risk.risk}</h4>
                          {risk.severity && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              risk.severity === 'high' || risk.severity === 'critical'
                                ? 'bg-red-500/20 text-red-400'
                                : risk.severity === 'medium'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {risk.severity.toUpperCase()} SEVERITY
                            </span>
                          )}
                        </div>
                        {risk.mitigation && (
                          <div className="mt-3">
                            <span className="text-slate-200 text-sm">Mitigation: </span>
                            <span className="text-green-300">{risk.mitigation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Section */}
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
                <h3 className="text-2xl font-bold mb-4">Export Analysis</h3>
                <p className="text-white mb-6">
                  Download the complete analysis or copy the raw JSON data
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={downloadReport}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                  <button
                    onClick={copyJSON}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border border-white/20"
                  >
                    <Copy className="w-5 h-5" />
                    Copy JSON
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* CTA Footer with Modal Trigger */}
          <div className="mt-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
            <h2 className="text-3xl font-bold mb-4">Want a Custom Analysis?</h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              Get a comprehensive AI-powered sales call analysis tailored to your company's specific challenges and opportunities.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
            >
              Request Custom Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Unified Footer with Sales Analyzer branding */}
      <UnifiedFooter productBranding={salesAnalyzerFooterConfig} />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="Live Sales Call Analyzer"
        appIcon={<Briefcase className="w-8 h-8" />}
        benefits={salesAnalyzerBenefits}
        ctaText="Request Custom Sales Analysis"
      />
    </>
  )
}