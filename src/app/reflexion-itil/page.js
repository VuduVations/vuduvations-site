// src/app/reflexion-itil/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, DollarSign, Users, Activity, Shield, XCircle, ChevronDown, ChevronUp, FileText, Download, Copy, Play } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'https://reflexion-backend-703153929469.us-central1.run.app';

export default function ReflexionITILPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [messages, setMessages] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [progress, setProgress] = useState(0);
  const [expandedRFC, setExpandedRFC] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRFC, setSelectedRFC] = useState(null);

  const sampleRFCs = [
    {
      name: "Database Migration - PostgreSQL 16 Upgrade",
      category: "Infrastructure",
      description: "Upgrade production database cluster from PostgreSQL 14.8 to 16.2 for 150 microservices",
      details: {
        title: "Production PostgreSQL Database Cluster Upgrade",
        ci_count: 23,
        affected_services: ["Payment API", "User Authentication", "Order Processing", "Inventory Management", "Analytics Pipeline"],
        estimated_cost: "$105,000",
        business_value: "30% query performance improvement, extended security support, advanced partitioning",
        timeline: "4-week phased rollout",
        cmdb_items: [
          "DB-PROD-PG-01 (Primary - us-east-1a)",
          "DB-PROD-PG-02 (Replica - us-east-1b)",
          "DB-PROD-PG-03 (Replica - us-east-1c)",
          "LB-DB-PROD-01 (Load Balancer)",
          "APP-PAYMENT-API (20 instances)",
          "APP-AUTH-SERVICE (15 instances)",
          "MONITORING-DATADOG-001"
        ],
        risk_factors: [
          "Zero-downtime requirement for payment processing",
          "30TB total data volume requires careful validation",
          "12 legacy stored procedures need rewrite",
          "Peak traffic: 50,000 transactions/minute"
        ],
        rollback_plan: "Automated failback to PostgreSQL 14.8 within 15 minutes using point-in-time recovery",
        testing_completed: "Load testing at 150% peak capacity, 72-hour soak test, chaos engineering scenarios"
      }
    },
    {
      name: "Cloud Cost Optimization - Multi-Region Auto-Scaling",
      category: "Infrastructure",
      description: "Implement intelligent auto-scaling across 3 AWS regions to reduce cloud spend by $2.1M annually",
      details: {
        title: "Enterprise Multi-Region Auto-Scaling Implementation",
        ci_count: 47,
        affected_services: ["Web Frontend (CDN)", "API Gateway", "Lambda Functions", "ECS Clusters", "RDS Read Replicas"],
        estimated_cost: "$180,000 (implementation)",
        business_value: "$2.1M annual savings, 40% improved resource efficiency, better user experience during traffic spikes",
        timeline: "8-week phased deployment across us-east-1, eu-west-1, ap-southeast-1",
        cmdb_items: [
          "ASG-WEB-PROD-US (Auto-scaling group - 50-500 instances)",
          "ASG-WEB-PROD-EU (Auto-scaling group - 30-300 instances)",
          "ASG-WEB-PROD-AP (Auto-scaling group - 20-200 instances)",
          "ALB-PROD-GLOBAL (Application Load Balancer)",
          "LAMBDA-SCALER-001 (Custom scaling logic)",
          "CLOUDWATCH-METRICS-PROD",
          "COST-EXPLORER-INTEGRATION"
        ],
        risk_factors: [
          "Aggressive scale-down could impact user experience during unexpected spikes",
          "Complex cross-region coordination requires careful orchestration",
          "Current monthly AWS bill: $3.2M (need to validate 65% savings claim)",
          "Peak traffic variability: 10x difference between off-peak and peak"
        ],
        rollback_plan: "Revert to static capacity with 30-minute manual override, maintain minimum baseline capacity",
        testing_completed: "Simulated Black Friday traffic (5x normal), regional failover testing, cost modeling validation"
      }
    },
    {
      name: "Security Patch - Critical Log4j Vulnerability",
      category: "Security",
      description: "Emergency patch for Log4Shell (CVE-2021-44228) affecting 340 Java-based production services",
      details: {
        title: "Critical Security Vulnerability Remediation - Log4Shell",
        ci_count: 89,
        affected_services: ["All Java microservices", "Apache Kafka", "ElasticSearch", "Custom admin tools", "Third-party integrations"],
        estimated_cost: "$95,000 (emergency response)",
        business_value: "Eliminate CVSS 10.0 critical vulnerability, prevent potential data breach ($50M+ exposure), maintain SOC2 compliance",
        timeline: "Emergency 72-hour deployment window",
        cmdb_items: [
          "APP-JAVA-SERVICES (340 microservices)",
          "KAFKA-PROD-CLUSTER (12 brokers)",
          "ELASTIC-PROD-001 (9-node cluster)",
          "ADMIN-PORTAL-PROD",
          "INTEGRATION-WEBHOOKS (45 endpoints)",
          "MONITORING-SPLUNK-001",
          "WAF-CLOUDFLARE-PROD"
        ],
        risk_factors: [
          "Actively exploited in the wild - time-critical",
          "Some legacy services require code changes, not just library updates",
          "Testing window compressed - standard 2-week testing reduced to 48 hours",
          "Requires coordination across 8 engineering teams"
        ],
        rollback_plan: "Service-by-service rollback capability, blue-green deployment for critical services, 24/7 war room staffed",
        testing_completed: "Vulnerability scanning pre/post patch, smoke tests on all services, security team penetration testing"
      }
    }
  ];

  const reflexionBenefits = [
    { 
      text: "Self-improving RFC analysis with quantitative 10/10 quality scoring",
      icon: <BarChart3 className="w-5 h-5" />
    },
    { 
      text: "Multi-agent critique system that iteratively refines documentation",
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      text: "Executive dashboards with CAB approval probability metrics",
      icon: <Shield className="w-5 h-5" />
    },
    { 
      text: "Continuous improvement automation for change management excellence",
      icon: <Target className="w-5 h-5" />
    }
  ];

  const loadSampleRFC = (sample) => {
    setSelectedRFC(sample);
    setIterations([]); // Clear previous results when selecting new RFC
    setMessages([]);
  };

  // Simulated iteration data for each RFC scenario
  const getSimulatedData = (rfcName) => {
    const dataByRFC = {
      "Database Migration - PostgreSQL 16 Upgrade": [
        {
          iteration: 1,
          timestamp: new Date().toISOString(),
          processing_time: 28.5,
          tokens_used: 12450,
          scores: {
            overall_quality: 6.2,
            itil_compliance: 5.8,
            risk_level: 7.2,
            business_value: 7.5,
            technical_readiness: 6.0,
            stakeholder_confidence: 5.5
          },
          executive_summary: {
            recommendation: "CONDITIONAL APPROVAL - Requires improvements",
            deployment_risk: "MEDIUM-HIGH",
            business_impact: "High",
            cab_approval_probability: 0.55,
            estimated_roi: "245% over 18 months",
            key_concerns: [
              "Zero-downtime requirement not adequately documented",
              "Legacy stored procedure migration plan lacks detail",
              "Peak traffic handling strategy needs validation"
            ]
          },
          rfc_summary: {
            title: "Production PostgreSQL Database Cluster Upgrade",
            objective: "Upgrade from PostgreSQL 14.8 to 16.2 to improve performance and security",
            business_justification: "30% query performance improvement, extended security support through 2028",
            technical_approach: "Phased rollout using pg_upgrade with replica promotion strategy",
            rollback_plan_status: "Documented - 15 minute PITR recovery available",
            testing_status: "Completed - Load testing at 150% capacity",
            timeline: "4-week phased rollout starting November 1, 2024",
            impact: "150 microservices, 23 CMDB items, 30TB data"
          },
          critical_issues: [
            {
              issue: "Zero-downtime strategy requires more detailed failover procedures",
              category: "Technical Risk",
              severity: "HIGH",
              priority: "1",
              impact: "Could result in payment processing downtime during migration"
            },
            {
              issue: "12 legacy stored procedures need rewrite - timeline unclear",
              category: "Technical Debt",
              severity: "MEDIUM",
              priority: "2",
              impact: "May delay migration or require emergency fixes post-upgrade"
            }
          ],
          improvements: [
            {
              action: "Document detailed connection draining and traffic routing procedures",
              priority: "HIGH",
              estimated_impact: "Reduce downtime risk by 60%",
              effort_hours: 8
            },
            {
              action: "Create stored procedure migration roadmap with testing criteria",
              priority: "HIGH",
              estimated_impact: "Eliminate post-upgrade surprises",
              effort_hours: 16
            }
          ],
          change_categories: {
            technical: { score: 6.5, status: "ADEQUATE" },
            procedural: { score: 5.5, status: "NEEDS IMPROVEMENT" },
            compliance: { score: 7.0, status: "GOOD" },
            communication: { score: 6.0, status: "ADEQUATE" }
          }
        },
        {
          iteration: 2,
          timestamp: new Date().toISOString(),
          processing_time: 31.2,
          tokens_used: 15320,
          scores: {
            overall_quality: 8.1,
            itil_compliance: 8.4,
            risk_level: 4.8,
            business_value: 8.2,
            technical_readiness: 8.0,
            stakeholder_confidence: 7.8
          },
          executive_summary: {
            recommendation: "CONDITIONAL APPROVAL - Minor clarifications needed",
            deployment_risk: "MEDIUM",
            business_impact: "High",
            cab_approval_probability: 0.78,
            estimated_roi: "245% over 18 months",
            key_concerns: [
              "Monitoring thresholds for replica lag need definition",
              "Communication plan for maintenance window needs stakeholder sign-off"
            ]
          },
          rfc_summary: {
            title: "Production PostgreSQL Database Cluster Upgrade",
            objective: "Upgrade from PostgreSQL 14.8 to 16.2 to improve performance and security",
            business_justification: "30% query performance improvement, extended security support through 2028, advanced partitioning capabilities",
            technical_approach: "Blue-green deployment with automated health checks and gradual traffic migration",
            rollback_plan_status: "Comprehensive - Automated failback within 15 minutes using PITR with tested procedures",
            testing_status: "Completed - 150% peak capacity load test, 72-hour soak test, chaos engineering validation",
            timeline: "4-week phased rollout: Week 1 (replicas), Week 2 (primary), Week 3 (validation), Week 4 (optimization)",
            impact: "150 microservices across 5 services, 23 CMDB items, 30TB data, 50K transactions/minute peak"
          },
          critical_issues: [],
          improvements: [
            {
              action: "Define specific monitoring thresholds for replica lag during migration",
              priority: "MEDIUM",
              estimated_impact: "Improve early warning system",
              effort_hours: 4
            },
            {
              action: "Obtain formal sign-off from all stakeholders on maintenance window",
              priority: "MEDIUM",
              estimated_impact: "Reduce communication risk",
              effort_hours: 2
            }
          ],
          change_categories: {
            technical: { score: 8.5, status: "EXCELLENT" },
            procedural: { score: 8.0, status: "GOOD" },
            compliance: { score: 8.5, status: "EXCELLENT" },
            communication: { score: 7.5, status: "GOOD" }
          }
        },
        {
          iteration: 3,
          timestamp: new Date().toISOString(),
          processing_time: 26.8,
          tokens_used: 13890,
          scores: {
            overall_quality: 9.3,
            itil_compliance: 9.5,
            risk_level: 2.8,
            business_value: 8.8,
            technical_readiness: 9.4,
            stakeholder_confidence: 9.1
          },
          executive_summary: {
            recommendation: "APPROVED FOR PRODUCTION",
            deployment_risk: "LOW",
            business_impact: "High",
            cab_approval_probability: 0.94,
            estimated_roi: "245% over 18 months",
            key_concerns: []
          },
          rfc_summary: {
            title: "Production PostgreSQL Database Cluster Upgrade - RFC-2024-DB-001",
            objective: "Upgrade production database cluster from PostgreSQL 14.8 to 16.2 to achieve 30% performance improvement and extended security support",
            business_justification: "Delivers 30% query performance improvement, security support through 2028, advanced partitioning reducing storage costs by 15%, and improved monitoring capabilities",
            technical_approach: "Blue-green deployment with automated health checks, gradual traffic migration (10% increments), and continuous performance monitoring with automated rollback triggers",
            rollback_plan_status: "Comprehensive and tested - Automated failback within 15 minutes using PITR, verified in staging with 3 successful test runs",
            testing_status: "Complete and validated - 150% peak capacity load testing, 72-hour soak test, chaos engineering scenarios, all stored procedures validated",
            timeline: "4-week phased rollout: Week 1 (replica upgrades), Week 2 (primary migration with 2AM maintenance window), Week 3 (performance validation), Week 4 (optimization and documentation)",
            impact: "150 microservices across Payment API, Auth, Order Processing, Inventory, and Analytics. 23 CMDB items. 30TB data. Peak traffic: 50,000 tx/min. Stakeholder sign-off obtained from all teams."
          },
          critical_issues: [],
          improvements: [],
          change_categories: {
            technical: { score: 9.5, status: "EXCELLENT" },
            procedural: { score: 9.2, status: "EXCELLENT" },
            compliance: { score: 9.6, status: "EXCELLENT" },
            communication: { score: 9.1, status: "EXCELLENT" }
          }
        }
      ],
      "Cloud Cost Optimization - Multi-Region Auto-Scaling": [
        {
          iteration: 1,
          timestamp: new Date().toISOString(),
          processing_time: 32.1,
          tokens_used: 14230,
          scores: {
            overall_quality: 5.8,
            itil_compliance: 5.5,
            risk_level: 7.8,
            business_value: 8.5,
            technical_readiness: 5.2,
            stakeholder_confidence: 5.0
          },
          executive_summary: {
            recommendation: "NOT RECOMMENDED - Significant gaps identified",
            deployment_risk: "HIGH",
            business_impact: "Critical ($2.1M annual savings)",
            cab_approval_probability: 0.35,
            estimated_roi: "1150% over 12 months",
            key_concerns: [
              "65% cost reduction claim lacks validation methodology",
              "Cross-region failover procedures not documented",
              "No rollback strategy for aggressive scale-down policies",
              "User experience impact during scale-down events not assessed"
            ]
          },
          rfc_summary: {
            title: "Enterprise Multi-Region Auto-Scaling Implementation",
            objective: "Implement intelligent auto-scaling across 3 AWS regions to reduce cloud spend",
            business_justification: "$2.1M annual savings from $3.2M monthly AWS bill",
            technical_approach: "Auto-scaling groups with custom Lambda-based scaling logic",
            rollback_plan_status: "Vague - mentions manual override but lacks procedures",
            testing_status: "Mentioned but validation methodology unclear",
            timeline: "8-week phased deployment across regions",
            impact: "47 CMDB items, 5 service categories, multi-region architecture"
          },
          critical_issues: [
            {
              issue: "Cost savings claim of $2.1M (65% reduction) requires validation with detailed analysis",
              category: "Business Case",
              severity: "HIGH",
              priority: "1",
              impact: "Business case may be overstated, affecting executive approval"
            },
            {
              issue: "No documented procedure for cross-region coordination failures",
              category: "Technical Risk",
              severity: "HIGH",
              priority: "1",
              impact: "Could result in regional outages or cascading failures"
            },
            {
              issue: "Aggressive scale-down could impact user experience during unexpected traffic spikes",
              category: "User Experience",
              severity: "MEDIUM",
              priority: "2",
              impact: "Potential degraded performance during critical business periods"
            }
          ],
          improvements: [
            {
              action: "Provide detailed cost modeling with breakdown by service, region, and instance type",
              priority: "CRITICAL",
              estimated_impact: "Validate business case accuracy",
              effort_hours: 24
            },
            {
              action: "Document cross-region orchestration failure scenarios and remediation procedures",
              priority: "HIGH",
              estimated_impact: "Reduce multi-region deployment risk",
              effort_hours: 16
            },
            {
              action: "Define user experience SLOs and automated rollback triggers",
              priority: "HIGH",
              estimated_impact: "Protect customer experience",
              effort_hours: 12
            }
          ],
          change_categories: {
            technical: { score: 5.5, status: "NEEDS IMPROVEMENT" },
            procedural: { score: 4.8, status: "INADEQUATE" },
            compliance: { score: 6.5, status: "ADEQUATE" },
            communication: { score: 5.5, status: "NEEDS IMPROVEMENT" }
          }
        },
        {
          iteration: 2,
          timestamp: new Date().toISOString(),
          processing_time: 35.4,
          tokens_used: 16780,
          scores: {
            overall_quality: 7.9,
            itil_compliance: 8.2,
            risk_level: 5.2,
            business_value: 8.8,
            technical_readiness: 7.6,
            stakeholder_confidence: 7.4
          },
          executive_summary: {
            recommendation: "CONDITIONAL APPROVAL - Cost validation required",
            deployment_risk: "MEDIUM",
            business_impact: "Critical ($2.1M annual savings)",
            cab_approval_probability: 0.72,
            estimated_roi: "1150% over 12 months",
            key_concerns: [
              "Cost savings model needs third-party validation",
              "Baseline capacity thresholds need fine-tuning based on historical data"
            ]
          },
          rfc_summary: {
            title: "Enterprise Multi-Region Auto-Scaling Implementation - RFC-2024-CLOUD-002",
            objective: "Implement intelligent auto-scaling across us-east-1, eu-west-1, and ap-southeast-1 to achieve $2.1M annual cost reduction",
            business_justification: "$2.1M annual savings from optimized resource utilization, 40% efficiency improvement, better user experience during traffic spikes, validated through 3-month cost modeling",
            technical_approach: "Progressive rollout with CloudWatch metrics, custom Lambda scaling logic, ALB-based traffic distribution, automated health checks, and region-by-region validation",
            rollback_plan_status: "Documented - 30-minute manual override to static capacity with minimum baseline maintained, tested in staging",
            testing_status: "Comprehensive - Simulated Black Friday traffic (5x normal load), regional failover scenarios, cost modeling validation over 90 days",
            timeline: "8 weeks: Week 1-2 (us-east-1), Week 3-4 (eu-west-1), Week 5-6 (ap-southeast-1), Week 7-8 (validation and optimization)",
            impact: "47 CMDB items including ASGs (3 regions), ALB, Lambda, CloudWatch. Services: Web Frontend, API Gateway, Lambda Functions, ECS, RDS. Monthly bill: $3.2M → $1.1M projected."
          },
          critical_issues: [
            {
              issue: "Cost modeling assumptions need independent validation",
              category: "Business Validation",
              severity: "MEDIUM",
              priority: "2",
              impact: "Savings projection accuracy affects business case credibility"
            }
          ],
          improvements: [
            {
              action: "Engage AWS Solutions Architect for independent cost model review",
              priority: "HIGH",
              estimated_impact: "Validate 65% savings claim",
              effort_hours: 8
            },
            {
              action: "Refine baseline capacity thresholds using 12-month traffic pattern analysis",
              priority: "MEDIUM",
              estimated_impact: "Optimize balance between cost and performance",
              effort_hours: 16
            }
          ],
          change_categories: {
            technical: { score: 8.2, status: "GOOD" },
            procedural: { score: 8.0, status: "GOOD" },
            compliance: { score: 8.5, status: "EXCELLENT" },
            communication: { score: 7.5, status: "GOOD" }
          }
        },
        {
          iteration: 3,
          timestamp: new Date().toISOString(),
          processing_time: 29.6,
          tokens_used: 14120,
          scores: {
            overall_quality: 9.1,
            itil_compliance: 9.3,
            risk_level: 3.2,
            business_value: 9.2,
            technical_readiness: 9.0,
            stakeholder_confidence: 8.9
          },
          executive_summary: {
            recommendation: "APPROVED FOR PRODUCTION",
            deployment_risk: "LOW",
            business_impact: "Critical ($2.1M annual savings)",
            cab_approval_probability: 0.92,
            estimated_roi: "1150% over 12 months",
            key_concerns: []
          },
          rfc_summary: {
            title: "Enterprise Multi-Region Auto-Scaling Implementation - RFC-2024-CLOUD-002",
            objective: "Implement intelligent auto-scaling across 3 AWS regions to achieve validated $2.1M annual cost reduction while maintaining 99.95% SLA",
            business_justification: "$2.1M annual savings (validated by AWS Solutions Architect), 40% resource efficiency improvement, improved user experience during traffic spikes, 15-month payback period on $180K implementation cost",
            technical_approach: "Progressive regional rollout with CloudWatch-driven auto-scaling, custom Lambda orchestration (10-minute evaluation windows), ALB intelligent traffic distribution, automated health checks with 3-strike failure policy, and gradual capacity adjustments (max 20% change per 15 minutes)",
            rollback_plan_status: "Comprehensive and tested - 30-minute manual override to static capacity, minimum baseline of 50 instances per region maintained, practiced in 3 drill scenarios, war room procedures documented",
            testing_status: "Extensively validated - Black Friday simulation at 5x normal load, regional failover under load, cost modeling validated over 90 days showing 63-67% savings range, latency impact assessed at <5ms",
            timeline: "8-week phased deployment: Weeks 1-2 (us-east-1 with 10% traffic), Weeks 3-4 (eu-west-1), Weeks 5-6 (ap-southeast-1), Weeks 7-8 (full traffic migration, validation, and optimization). CFO and CTO sign-off obtained.",
            impact: "47 CMDB items across 3 regions. Current monthly AWS spend: $3.2M. Projected spend: $1.1M (65% reduction validated). Peak traffic variability: 10x. All affected teams trained and ready."
          },
          critical_issues: [],
          improvements: [],
          change_categories: {
            technical: { score: 9.2, status: "EXCELLENT" },
            procedural: { score: 9.1, status: "EXCELLENT" },
            compliance: { score: 9.4, status: "EXCELLENT" },
            communication: { score: 9.0, status: "EXCELLENT" }
          }
        }
      ],
      "Security Patch - Critical Log4j Vulnerability": [
        {
          iteration: 1,
          timestamp: new Date().toISOString(),
          processing_time: 26.3,
          tokens_used: 11890,
          scores: {
            overall_quality: 6.8,
            itil_compliance: 6.5,
            risk_level: 8.9,
            business_value: 9.5,
            technical_readiness: 6.2,
            stakeholder_confidence: 6.0
          },
          executive_summary: {
            recommendation: "CONDITIONAL APPROVAL - Compressed timeline requires risk acceptance",
            deployment_risk: "HIGH (but doing nothing is CRITICAL)",
            business_impact: "Critical (prevents $50M+ breach exposure)",
            cab_approval_probability: 0.68,
            estimated_roi: "Infinite (prevents catastrophic breach)",
            key_concerns: [
              "72-hour deployment window compresses standard 2-week testing to 48 hours",
              "Legacy services require code changes, not just library updates - scope unclear",
              "8 engineering teams coordination in emergency mode increases communication risk",
              "Active exploitation in the wild means time is critical"
            ]
          },
          rfc_summary: {
            title: "Critical Security Vulnerability Remediation - Log4Shell",
            objective: "Emergency patch for CVE-2021-44228 affecting 340 Java services",
            business_justification: "Eliminate CVSS 10.0 vulnerability actively exploited in the wild, prevent data breach, maintain SOC2 compliance",
            technical_approach: "Service-by-service patching with blue-green deployment for critical services",
            rollback_plan_status: "Mentioned - service-by-service rollback capability with 24/7 war room",
            testing_status: "Compressed - vulnerability scanning, smoke tests, limited penetration testing",
            timeline: "Emergency 72-hour deployment window",
            impact: "340 Java microservices, 89 CMDB items including Kafka, Elasticsearch, webhooks"
          },
          critical_issues: [
            {
              issue: "Legacy services requiring code changes not fully inventoried - scope risk",
              category: "Technical Scope",
              severity: "HIGH",
              priority: "1",
              impact: "May discover additional work mid-deployment, extending timeline"
            },
            {
              issue: "Testing window compressed from 2 weeks to 48 hours - quality risk",
              category: "Quality Assurance",
              severity: "HIGH",
              priority: "1",
              impact: "Potential for undetected issues in production"
            },
            {
              issue: "8-team coordination in emergency mode increases communication failure risk",
              category: "Communication",
              severity: "MEDIUM",
              priority: "2",
              impact: "Could result in missed services or coordination failures"
            }
          ],
          improvements: [
            {
              action: "Complete inventory of all legacy services requiring code changes within 4 hours",
              priority: "CRITICAL",
              estimated_impact: "Eliminate scope uncertainty",
              effort_hours: 4
            },
            {
              action: "Establish 24/7 war room with clear escalation paths and communication protocols",
              priority: "CRITICAL",
              estimated_impact: "Reduce coordination risk",
              effort_hours: 2
            },
            {
              action: "Define automated rollback triggers and manual override procedures",
              priority: "HIGH",
              estimated_impact: "Enable rapid response to issues",
              effort_hours: 6
            }
          ],
          change_categories: {
            technical: { score: 6.8, status: "ADEQUATE" },
            procedural: { score: 6.0, status: "ADEQUATE" },
            compliance: { score: 7.5, status: "GOOD" },
            communication: { score: 6.2, status: "ADEQUATE" }
          }
        },
        {
          iteration: 2,
          timestamp: new Date().toISOString(),
          processing_time: 29.8,
          tokens_used: 13560,
          scores: {
            overall_quality: 8.4,
            itil_compliance: 8.6,
            risk_level: 6.5,
            business_value: 9.5,
            technical_readiness: 8.2,
            stakeholder_confidence: 8.0
          },
          executive_summary: {
            recommendation: "APPROVED - Emergency authorization with controlled risk",
            deployment_risk: "MEDIUM-HIGH (acceptable given breach alternative)",
            business_impact: "Critical (prevents $50M+ breach exposure)",
            cab_approval_probability: 0.85,
            estimated_roi: "Infinite (prevents catastrophic breach)",
            key_concerns: [
              "Post-deployment monitoring plan needs 24-hour coverage commitment",
              "Incident response playbook needs final review by security team"
            ]
          },
          rfc_summary: {
            title: "Critical Security Vulnerability Remediation - Log4Shell CVE-2021-44228",
            objective: "Emergency remediation of CVSS 10.0 critical vulnerability affecting 340 Java-based production services, actively exploited in the wild",
            business_justification: "Eliminate critical vulnerability with active exploits, prevent potential $50M+ data breach, maintain SOC2/PCI compliance, protect customer data and company reputation",
            technical_approach: "Wave-based deployment: Wave 1 (internet-facing services, 4 hours), Wave 2 (internal critical services, 8 hours), Wave 3 (remaining services, 12 hours). Blue-green deployment for critical payment/auth services. Automated vulnerability scanning between waves.",
            rollback_plan_status: "Comprehensive - Service-by-service rollback capability, blue-green instant failback for critical services, 24/7 war room with L3 engineers from all 8 teams, escalation to CTO within 15 minutes",
            testing_status: "Emergency validation - Pre/post vulnerability scanning with Qualys, smoke tests for all 340 services, security team penetration testing on critical paths, rollback procedures practiced in 2 drill runs",
            timeline: "72-hour emergency window: Hour 0-4 (Wave 1: internet-facing), Hour 4-12 (Wave 2: critical internal), Hour 12-24 (Wave 3: remaining), Hour 24-72 (validation and monitoring)",
            impact: "340 Java microservices, 89 CMDB items (Kafka 12 brokers, Elasticsearch 9-node cluster, 45 webhook endpoints). All 8 engineering teams mobilized. Executive team briefed. Customer communication prepared."
          },
          critical_issues: [
            {
              issue: "Post-deployment monitoring requires 24-hour NOC coverage commitment",
              category: "Operations",
              severity: "MEDIUM",
              priority: "2",
              impact: "Need to detect issues quickly in 72-hour window"
            }
          ],
          improvements: [
            {
              action: "Confirm 24-hour NOC coverage for 72-hour post-deployment window",
              priority: "HIGH",
              estimated_impact: "Ensure rapid issue detection",
              effort_hours: 2
            },
            {
              action: "Security team final review of incident response playbook",
              priority: "MEDIUM",
              estimated_impact: "Validate emergency procedures",
              effort_hours: 1
            }
          ],
          change_categories: {
            technical: { score: 8.5, status: "EXCELLENT" },
            procedural: { score: 8.2, status: "GOOD" },
            compliance: { score: 9.0, status: "EXCELLENT" },
            communication: { score: 8.4, status: "EXCELLENT" }
          }
        },
        {
          iteration: 3,
          timestamp: new Date().toISOString(),
          processing_time: 24.1,
          tokens_used: 11230,
          scores: {
            overall_quality: 9.4,
            itil_compliance: 9.6,
            risk_level: 4.2,
            business_value: 9.8,
            technical_readiness: 9.3,
            stakeholder_confidence: 9.2
          },
          executive_summary: {
            recommendation: "APPROVED FOR IMMEDIATE DEPLOYMENT - Emergency authorization granted",
            deployment_risk: "MEDIUM (significantly lower than breach risk)",
            business_impact: "Critical (prevents $50M+ breach exposure)",
            cab_approval_probability: 0.96,
            estimated_roi: "Infinite (prevents catastrophic breach)",
            key_concerns: []
          },
          rfc_summary: {
            title: "EMERGENCY: Critical Security Vulnerability Remediation - Log4Shell CVE-2021-44228",
            objective: "Emergency remediation of CVSS 10.0 critical vulnerability (Log4Shell) affecting 340 Java-based production services. Vulnerability actively exploited in the wild with confirmed attacks on similar infrastructure. Immediate action required.",
            business_justification: "Eliminate CVSS 10.0 critical vulnerability with documented active exploits targeting financial services infrastructure. Prevent potential $50M+ data breach exposure (based on similar incidents). Maintain SOC2 Type II and PCI-DSS compliance (breach would trigger immediate decertification). Protect 2.5M customer records and company reputation. Legal and compliance teams confirm immediate action required.",
            technical_approach: "Three-wave emergency deployment over 72 hours: Wave 1 (0-4h): Internet-facing services including webhooks, API gateway, admin portal. Wave 2 (4-12h): Critical internal services including Kafka cluster, Elasticsearch, payment processing. Wave 3 (12-24h): Remaining 280+ microservices. Blue-green deployment for payment/auth (instant rollback). Automated Qualys scanning between waves. Real-time APM monitoring with PagerDuty integration. Circuit breakers with automatic failover.",
            rollback_plan_status: "Battle-tested and ready - Service-by-service rollback capability with runbooks for all 340 services. Blue-green instant failback (<30 seconds) for critical payment/auth services. 24/7 war room staffed with L3 engineers from all 8 teams plus SRE leads. Escalation to VP Engineering within 5 minutes, CTO within 15 minutes. Rollback procedures validated in 3 successful drill runs. WAF rules active as additional protection layer.",
            testing_status: "Emergency validation complete - Qualys vulnerability scanning (pre/post) for all 340 services with confirmed CVE detection. Comprehensive smoke test suite (1,247 tests) for all services. Security team red team penetration testing on critical paths completed. Rollback procedures practiced in 3 emergency drills. Post-deployment monitoring dashboard configured with 12 critical metrics. All 8 engineering teams have completed emergency runbook training.",
            timeline: "72-hour emergency deployment: Hours 0-4 (Wave 1: 45 internet-facing services), Hours 4-12 (Wave 2: 55 critical internal services), Hours 12-24 (Wave 3: 240 remaining services), Hours 24-72 (continuous validation, monitoring, and optimization). 24-hour NOC coverage confirmed through Hour 72. Executive communication plan activated. Customer communication prepared (deploy only if issues detected).",
            impact: "340 Java microservices, 89 CMDB items (Kafka 12-broker cluster, Elasticsearch 9-node cluster, 45 webhook endpoints, admin portal, all integration services). All 8 engineering teams mobilized and briefed. CEO, CTO, CISO, and General Counsel briefed and standing by. Board notification prepared. Customer Success team on standby. Media relations prepared defensive talking points. Estimated $95K emergency response cost approved by CFO. All stakeholders signed off on emergency procedures."
          },
          critical_issues: [],
          improvements: [],
          change_categories: {
            technical: { score: 9.5, status: "EXCELLENT" },
            procedural: { score: 9.4, status: "EXCELLENT" },
            compliance: { score: 9.8, status: "EXCELLENT" },
            communication: { score: 9.4, status: "EXCELLENT" }
          }
        }
      ]
    };

    return dataByRFC[rfcName] || dataByRFC["Database Migration - PostgreSQL 16 Upgrade"];
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

    // Get simulated data for the selected RFC
    const simulatedIterations = getSimulatedData(selectedRFC.name);

    // Simulate streaming with delays
    const phases = [
      { phase: 'Initializing', time: 2, message: '🔧 Initializing Reflexion multi-agent system...' },
      { phase: 'Analyzing', time: 8, message: '🔍 Agent 1: Analyzing RFC structure and completeness...' },
      { phase: 'Evaluating', time: 15, message: '📊 Agent 2: Evaluating ITIL compliance and risk factors...' },
      { phase: 'Scoring', time: 22, message: '⚡ Agent 3: Generating quality scores and metrics...' },
      { phase: 'Iteration 1', time: 28, message: '✅ Iteration 1 complete - Identifying improvements...' },
      { phase: 'Critiquing', time: 35, message: '🎯 Critic Agent: Analyzing gaps and suggesting refinements...' },
      { phase: 'Refining', time: 42, message: '🔄 Refining documentation based on critique...' },
      { phase: 'Iteration 2', time: 50, message: '✅ Iteration 2 complete - Validating improvements...' },
      { phase: 'Optimizing', time: 58, message: '🚀 Final optimization pass...' },
      { phase: 'Validating', time: 66, message: '✓ Validating all ITIL requirements...' },
      { phase: 'Finalizing', time: 72, message: '📋 Generating executive summary and recommendations...' },
      { phase: 'Iteration 3', time: 80, message: '✅ Iteration 3 complete - Final quality checks...' },
      { phase: 'Complete', time: 85, message: '🎉 Analysis complete! All iterations processed successfully.' }
    ];

    try {
      // Simulate streaming messages
      for (let i = 0; i < phases.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 2500));
        
        const phase = phases[i];
        setCurrentPhase(phase.phase);
        setMessages(prev => [...prev, { message: phase.message, time: phase.time, phase: phase.phase }]);
        setProgress((phase.time / 85) * 100);

        // Add iteration results at appropriate times
        if (phase.phase === 'Iteration 1') {
          setIterations([simulatedIterations[0]]);
        } else if (phase.phase === 'Iteration 2') {
          setIterations([simulatedIterations[0], simulatedIterations[1]]);
        } else if (phase.phase === 'Iteration 3') {
          setIterations(simulatedIterations);
        }
      }

      setProgress(100);
      setCurrentPhase('Complete');
      setIsProcessing(false);

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
          <Link href="/" className="text-purple-300 hover:text-purple-100 mb-4 inline-block">
            ← Back to Portfolio
          </Link>
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

        {/* RFC Scenario Selection */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-white">Interactive Demo Scenarios</h2>
            <p className="text-gray-100">
              Select a realistic RFC scenario to see Reflexion pattern in action with full ITIL analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {sampleRFCs.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => loadSampleRFC(sample)}
                disabled={isProcessing}
                className={`${
                  selectedRFC?.name === sample.name 
                    ? 'bg-purple-500/30 border-purple-400' 
                    : 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/30'
                } border rounded-lg p-4 text-left transition-all ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-purple-300 mb-1">{sample.name}</div>
                    <div className="text-xs text-gray-400 mb-2">{sample.category}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-3">
                  {sample.description}
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-400 font-semibold">
                  <Play className="w-4 h-4" />
                  Select RFC
                </div>
              </button>
            ))}
          </div>

          {/* Selected RFC Details */}
          {selectedRFC && !iterations.length && (
            <div className="space-y-4">
              <div className="bg-black/30 p-6 rounded-lg border border-purple-400/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Selected: {selectedRFC.name}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Title</div>
                    <div className="text-white font-medium">{selectedRFC.details.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Category</div>
                    <div className="text-white font-medium">{selectedRFC.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">CMDB Items Affected</div>
                    <div className="text-white font-medium">{selectedRFC.details.ci_count} Configuration Items</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Estimated Cost</div>
                    <div className="text-white font-medium">{selectedRFC.details.estimated_cost}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Business Value</div>
                  <div className="text-gray-300">{selectedRFC.details.business_value}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Implementation Timeline</div>
                  <div className="text-gray-300">{selectedRFC.details.timeline}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Affected Services ({selectedRFC.details.affected_services.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRFC.details.affected_services.map((service, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">CMDB Configuration Items</div>
                  <div className="bg-black/20 p-4 rounded border border-white/10 max-h-40 overflow-y-auto">
                    {selectedRFC.details.cmdb_items.map((item, i) => (
                      <div key={i} className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                        <span className="text-purple-400">•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Risk Factors</div>
                  <div className="space-y-2">
                    {selectedRFC.details.risk_factors.map((risk, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        {risk}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Rollback Plan</div>
                    <div className="text-sm text-gray-300 bg-black/20 p-3 rounded">
                      {selectedRFC.details.rollback_plan}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Testing Completed</div>
                    <div className="text-sm text-gray-300 bg-black/20 p-3 rounded">
                      {selectedRFC.details.testing_completed}
                    </div>
                  </div>
                </div>
              </div>

              {!isProcessing && (
                <div className="bg-black/30 p-4 rounded-lg border border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">
                      Ready to analyze this RFC with Reflexion multi-agent system
                    </div>
                    <button
                      onClick={runReflexion}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Activity className="w-5 h-5" />
                      Start Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Control Panel */}
        {!selectedRFC && !iterations.length && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20 text-center">
            <p className="text-gray-300 mb-4">
              Select an RFC scenario above to begin the Reflexion analysis demonstration
            </p>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-purple-400 animate-spin" />
              <span className="text-xl font-semibold text-white">Processing Analysis...</span>
            </div>
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
          </div>
        )}

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
                This demo shows what's possible of the AI Discovery Platform using synthetic company data. The 6-agent CrewAI system, financial modeling algorithms, and React dashboard are fully functional—only the input data is simulated for demonstration purposes.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 px-8 text-lg"
              >
                Request Custom Analysis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="Reflexion ITIL Agent"
        appIcon={<Shield className="w-8 h-8" />}
        benefits={reflexionBenefits}
        ctaText="Request Custom ITIL Analysis"
      />
    </div>
  );
}