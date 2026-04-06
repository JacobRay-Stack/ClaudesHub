export interface RolePath {
  slug: string;
  title: string;
  role: string;
  hook: string;
  salaryRange: string;
  salaryPremium: string;
  description: string;
  icon: string; // SVG path
  skills: { name: string; description: string }[];
  tools: { name: string; description: string }[];
  resourceTags: string[]; // tags to auto-pull relevant resources
}

export const ROLE_PATHS: RolePath[] = [
  {
    slug: "developer",
    title: "AI Skills for Software Engineers",
    role: "Software Engineer",
    hook: "AI engineers average $206K. Developers using AI coding tools daily are the new baseline.",
    salaryRange: "$165K - $206K",
    salaryPremium: "52%",
    description:
      "The skills hierarchy is inverting. Syntax knowledge and boilerplate coding are commoditized. Architectural thinking, code review, and AI-native workflows now command premiums. Companies are hiring developers who treat AI as their primary teammate, not a search replacement.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    skills: [
      {
        name: "AI Coding Assistants",
        description:
          "Daily use of Claude Code, Cursor, or GitHub Copilot for code generation, debugging, test writing, and documentation. Not just autocomplete -- full agentic workflows.",
      },
      {
        name: "Prompt Engineering for Code",
        description:
          "Writing effective prompts that produce correct, secure, well-tested code. Understanding context windows, CLAUDE.md configuration, and how to guide AI through complex multi-file changes.",
      },
      {
        name: "LLM API Integration",
        description:
          "Building applications that call Claude, GPT, or other LLM APIs. Understanding tokens, streaming, tool use, and structured outputs.",
      },
      {
        name: "RAG Pipelines",
        description:
          "Retrieval-Augmented Generation -- connecting LLMs to your own data via vector databases. Building search-enhanced AI features.",
      },
      {
        name: "Agentic Frameworks",
        description:
          "Building AI agents that plan, execute, and iterate. LangChain, LlamaIndex, and custom agent architectures.",
      },
      {
        name: "MCP Servers & Tool Use",
        description:
          "Model Context Protocol -- connecting AI to external tools and APIs. Building and configuring MCP servers for custom integrations.",
      },
    ],
    tools: [
      { name: "Claude Code", description: "CLI-based AI coding assistant" },
      { name: "Cursor", description: "AI-native code editor" },
      { name: "GitHub Copilot", description: "AI pair programmer" },
      { name: "LangChain", description: "LLM application framework" },
      { name: "Python", description: "Dominant language for AI development" },
    ],
    resourceTags: ["claude-code", "cursor", "copilot", "langchain", "rag", "mcp", "coding", "developer"],
  },
  {
    slug: "data",
    title: "AI Skills for Data Scientists",
    role: "Data Scientist",
    hook: "ML appears in 92% of data science postings. NLP skills grew from 5% to 19% in one year.",
    salaryRange: "$170K - $220K+",
    salaryPremium: "40%",
    description:
      "The data science role is shifting from classical ML to LLM-augmented analysis. Python consolidated as the default (82% of postings), while SAS dropped to 2% and R is declining. The new premium is in NLP, LLM architecture, and the ability to build with modern AI -- not just analyze with it.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    skills: [
      {
        name: "Machine Learning",
        description:
          "Supervised, unsupervised, and reinforcement learning. Appears in 92% of data science job postings -- the foundational skill.",
      },
      {
        name: "Python for ML",
        description:
          "Python is in 82% of postings and consolidating as the only language that matters. NumPy, pandas, scikit-learn, and the PyTorch/TensorFlow ecosystem.",
      },
      {
        name: "NLP & LLM Architecture",
        description:
          "Natural language processing grew from 5% to 19% of postings in one year. Understanding transformers, embeddings, fine-tuning, and how modern LLMs work.",
      },
      {
        name: "Prompt Engineering for Data",
        description:
          "Using Claude and GPT for data exploration, SQL generation, analysis acceleration, and insight synthesis. Turns hours of work into minutes.",
      },
      {
        name: "RAG & Vector Databases",
        description:
          "Building retrieval-augmented generation systems. Connecting LLMs to enterprise data for intelligent querying.",
      },
      {
        name: "Communication",
        description:
          "Translating findings for stakeholders jumped to the #2 most-requested skill. AI makes the analysis faster; explaining it to humans is the bottleneck.",
      },
    ],
    tools: [
      { name: "PyTorch / TensorFlow", description: "Deep learning frameworks" },
      { name: "Hugging Face", description: "Model hub and NLP toolkit" },
      { name: "Snowflake / BigQuery", description: "Cloud data warehouses" },
      { name: "MLflow", description: "ML lifecycle management" },
      { name: "Claude / ChatGPT", description: "AI-assisted analysis" },
    ],
    resourceTags: ["python", "ml", "data-science", "nlp", "pytorch", "sql", "analytics"],
  },
  {
    slug: "product",
    title: "AI Skills for Product Managers",
    role: "Product Manager",
    hook: "AI literacy is now essential PM competency. PMs who can prototype with AI skip the spec-to-build gap entirely.",
    salaryRange: "$133K - $200K",
    salaryPremium: "28%",
    description:
      "PMs don't need to build models. They need to evaluate AI capabilities, manage probabilistic systems (AI works 95% of the time and fails 5%), define AI product strategy, and use AI tools to rapidly prototype before involving engineering. The PM who can demo a working prototype in Claude Code before writing a PRD has a massive advantage.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    skills: [
      {
        name: "AI/ML Fundamentals",
        description:
          "Understanding supervised vs. unsupervised learning, neural networks, NLP, and what AI can realistically do. Not to build it -- to evaluate it and make product decisions.",
      },
      {
        name: "Prompt Engineering",
        description:
          "Now classified as essential PM literacy. Writing effective prompts for research, analysis, spec writing, and prototyping.",
      },
      {
        name: "Low-Code AI Prototyping",
        description:
          "Using Claude Code, Cursor, or Retool to build functional prototypes without waiting for engineering. The fastest path from idea to demo.",
      },
      {
        name: "Probabilistic Thinking",
        description:
          "AI systems are probabilistic, not deterministic. Managing the reality that your AI feature works 95% of the time and fails 5%. Designing for uncertainty.",
      },
      {
        name: "AI Ethics & Governance",
        description:
          "Fairness, accountability, transparency, explainability. Understanding bias in AI systems and making responsible product decisions.",
      },
      {
        name: "AI Product Strategy",
        description:
          "Where does AI add real value vs. where is it a gimmick? Evaluating build vs. buy for AI features. Scoping AI work for engineering teams.",
      },
    ],
    tools: [
      { name: "Claude Code", description: "Rapid prototyping and exploration" },
      { name: "ChatGPT / Claude", description: "Research and analysis" },
      { name: "Cursor", description: "AI-assisted prototyping" },
      { name: "Retool", description: "Low-code internal tools" },
      { name: "Figma", description: "AI-enhanced design collaboration" },
    ],
    resourceTags: ["product-management", "prototyping", "strategy", "ai-fundamentals"],
  },
  {
    slug: "marketer",
    title: "AI Skills for Marketers",
    role: "Marketer",
    hook: "Marketers with AI skills earn 43% more. Mid-level generalist content roles dropped 70%+ since 2023.",
    salaryRange: "Up to $250K",
    salaryPremium: "43%",
    description:
      "The marketing job market is polarizing. Mid-level generalist roles are disappearing while senior ownership roles (Head/VP of Content) grew 300-375%. AI proficiency is mentioned in 34% of senior positions. The market rewards specialists who can use AI for multi-format content creation, automation, and data-driven strategy -- not people who just write blog posts.",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    skills: [
      {
        name: "AI Content Creation",
        description:
          "Multi-format content creation demand grew 209% while pure writing dropped 28%. Using AI for blogs, social posts, email sequences, ad copy, video scripts -- not just drafts but production-quality outputs.",
      },
      {
        name: "Prompt Engineering",
        description:
          "Getting consistent, on-brand outputs from Claude and ChatGPT. Building prompt libraries for repeatable content workflows.",
      },
      {
        name: "Marketing Automation",
        description:
          "HubSpot AI, Salesforce Einstein, Zapier, Make.com. Building automated workflows that handle lead nurturing, email sequences, and campaign triggers.",
      },
      {
        name: "AI-Powered SEO",
        description:
          "Content SEO Manager is now a top-tier title -- 20% of all listings. Using AI for keyword research, content optimization, and competitive analysis.",
      },
      {
        name: "Data Analytics",
        description:
          "Appears in 40% of senior marketing roles. Using AI to interpret campaign data, build attribution models, and make data-driven decisions.",
      },
      {
        name: "Storytelling & Strategy",
        description:
          "Storytelling appears in 29% of senior roles. AI handles execution; humans provide the creative vision, brand voice, and strategic direction.",
      },
    ],
    tools: [
      { name: "Claude / ChatGPT", description: "Content generation and strategy" },
      { name: "Jasper", description: "AI marketing content platform" },
      { name: "HubSpot AI", description: "CRM and marketing automation" },
      { name: "Zapier / Make.com", description: "Workflow automation" },
      { name: "Adobe Sensei", description: "Creative AI tools" },
    ],
    resourceTags: ["marketing", "content", "seo", "copywriting", "automation", "email"],
  },
  {
    slug: "designer",
    title: "AI Skills for Designers",
    role: "Designer",
    hook: "60-70% of the design role is shifting to AI prototyping, vibe coding, and AI-assisted research.",
    salaryRange: "Senior roles recovering fastest",
    salaryPremium: "High demand",
    description:
      "Companies are shifting toward smaller, more specialized design teams with stronger technical capabilities. Designers who combine UX expertise with AI tool proficiency are especially sought-after. The role is expanding from 'make it look good' to 'prototype it with AI and validate it with users.'",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    skills: [
      {
        name: "AI Prototyping",
        description:
          "Using AI to go from concept to working prototype in hours, not weeks. Claude Code and Cursor let designers build functional UIs without deep coding knowledge.",
      },
      {
        name: "Vibe Coding",
        description:
          "Describing what you want in natural language and having AI generate the code. Designers who can 'vibe code' skip the handoff to engineering for early validation.",
      },
      {
        name: "Generative Imagery",
        description:
          "Midjourney, DALL-E, and AI-assisted design tools for exploration, mood boards, and asset generation.",
      },
      {
        name: "Prompt Engineering for Design",
        description:
          "Writing prompts that produce consistent, on-brand design outputs. Iterating on AI-generated designs through refined prompting.",
      },
      {
        name: "AI-Assisted Research",
        description:
          "Using AI to synthesize user research, analyze survey data, and extract patterns from interview transcripts.",
      },
      {
        name: "Designing AI-Powered Products",
        description:
          "Understanding AI capabilities and limitations when designing products that use AI features. Managing user expectations for probabilistic systems.",
      },
    ],
    tools: [
      { name: "Figma", description: "Design tool (still foundational)" },
      { name: "Midjourney / DALL-E", description: "Generative imagery" },
      { name: "Claude Code / Cursor", description: "AI prototyping and vibe coding" },
      { name: "ChatGPT / Claude", description: "UX writing and research synthesis" },
    ],
    resourceTags: ["design", "ui", "ux", "figma", "prototyping", "frontend"],
  },
  {
    slug: "ops",
    title: "AI Skills for Ops & Business Analysts",
    role: "Operations / Business Analyst",
    hook: "AI automation now handles complex, variable tasks -- not just the repetitive ones.",
    salaryRange: "+35% uplift",
    salaryPremium: "35%",
    description:
      "Unlike legacy RPA that automated simple, repetitive tasks, AI automation handles complex, variable workflows using NLP, computer vision, and predictive analytics. BAs who can bridge business requirements and AI capabilities are in high demand. Documentation automation alone can speed up work 5x.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    skills: [
      {
        name: "Process Automation Mapping",
        description:
          "Identifying where AI fits in existing workflows. Not every process needs AI -- the skill is knowing which ones benefit most.",
      },
      {
        name: "Prompt Engineering",
        description:
          "Interacting effectively with LLMs for data analysis, report generation, and process documentation.",
      },
      {
        name: "AI Workflow Integration",
        description:
          "Mapping workflows, understanding data access and permissions, connecting AI tools to existing systems via APIs and automation platforms.",
      },
      {
        name: "Data Analysis with AI",
        description:
          "Using AI assistants to accelerate analysis: natural language queries against databases, automated report generation, anomaly detection.",
      },
      {
        name: "Documentation Automation",
        description:
          "AI can speed up documentation 5x. Building templates and workflows for automated meeting notes, process docs, and compliance reports.",
      },
      {
        name: "Evaluating AI Solutions",
        description:
          "Assessing build vs. buy for AI tools. Understanding what's possible, what's hype, and what fits the business need.",
      },
    ],
    tools: [
      { name: "Microsoft Copilot", description: "AI-powered Office suite" },
      { name: "Power Automate", description: "Workflow automation" },
      { name: "Power BI / ThoughtSpot", description: "AI-powered analytics" },
      { name: "ChatGPT / Claude", description: "Analysis and documentation" },
      { name: "Zapier / Make.com", description: "Integration automation" },
    ],
    resourceTags: ["automation", "business-analysis", "documentation", "workflow", "operations"],
  },
  {
    slug: "sales",
    title: "AI Skills for Sales & Customer Success",
    role: "Sales / Customer Success",
    hook: "CRM + AI specialists earn $160K+. 99% of Fortune 500 use AI in their sales tech stack.",
    salaryRange: "$160K+",
    salaryPremium: "High demand",
    description:
      "CRM roles are no longer admin work -- they're branching into specialized careers combining technology, strategy, customer psychology, and automation. The salesperson who manually logs calls and sends follow-up emails is being replaced by the one who has AI prep their meetings, score their leads, and draft their proposals.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    skills: [
      {
        name: "AI-Powered CRM",
        description:
          "Salesforce Einstein, HubSpot AI features. Using AI within your CRM for lead scoring, deal prediction, and automated data entry.",
      },
      {
        name: "Predictive Lead Scoring",
        description:
          "AI models that predict which leads will convert and which deals will close. Understanding and acting on AI-generated scores.",
      },
      {
        name: "Meeting Prep Automation",
        description:
          "Using AI to compile account summaries, research prospects, generate pre-call briefs, and create post-meeting action items.",
      },
      {
        name: "AI Email & Proposal Writing",
        description:
          "Using Claude or ChatGPT for personalized outreach, follow-ups, and proposal drafts. Not generic templates -- contextually aware content.",
      },
      {
        name: "Buying Signal Analysis",
        description:
          "Identifying buying signals through AI analysis of engagement data, email patterns, and interaction history.",
      },
      {
        name: "Conversation Intelligence",
        description:
          "AI meeting transcription and analysis. Extracting insights from calls: objections, competitor mentions, decision criteria.",
      },
    ],
    tools: [
      { name: "Salesforce Einstein", description: "AI-powered CRM intelligence" },
      { name: "HubSpot AI", description: "CRM and sales automation" },
      { name: "Otter.ai / Fireflies", description: "AI meeting notes" },
      { name: "ChatGPT / Claude", description: "Email drafting and research" },
      { name: "LinkedIn Sales Navigator", description: "AI-enhanced prospecting" },
    ],
    resourceTags: ["sales", "crm", "customer-success", "email", "automation"],
  },
  {
    slug: "hr",
    title: "AI Skills for HR & Recruiters",
    role: "HR / Recruiter",
    hook: "87% of companies now use AI in HR. Critical thinking with AI outputs is the #1 skill.",
    salaryRange: "+35% uplift",
    salaryPremium: "35%",
    description:
      "HR is expanding from basic AI usage to applied AI -- autonomous task execution, intelligent decision-making, and workflow orchestration. But unlike other roles, critical thinking ranks above tool proficiency for HR. The priority is evaluating AI outputs and making judgment calls about people, not just operating the tools.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    skills: [
      {
        name: "AI Screening & Assessment",
        description:
          "Using AI-powered ATS for resume screening, candidate matching, and skills assessment. Understanding how these tools work and where they fail.",
      },
      {
        name: "Predictive Talent Analytics",
        description:
          "Using AI to predict hiring needs, time-to-fill, candidate success likelihood, and retention risk.",
      },
      {
        name: "AI Bias Evaluation",
        description:
          "Understanding how AI hiring tools can introduce or amplify bias. Auditing AI systems for fairness. This is both an ethical and legal requirement.",
      },
      {
        name: "Critical Thinking with AI",
        description:
          "The #1 skill per 73% of talent acquisition leaders. Evaluating AI recommendations before acting on them. AI suggests -- humans decide.",
      },
      {
        name: "Workflow Automation",
        description:
          "Automating scheduling, onboarding sequences, reference checks, and compliance documentation with AI tools.",
      },
      {
        name: "AI-Assisted Communication",
        description:
          "Using AI for job descriptions, candidate outreach, offer letters, and internal communications. Maintaining human tone in AI-drafted content.",
      },
    ],
    tools: [
      { name: "ATS with AI", description: "Greenhouse, Lever, Workday (AI features)" },
      { name: "Microsoft Copilot", description: "Office productivity with AI" },
      { name: "ChatGPT / Claude", description: "Writing and research" },
      { name: "LinkedIn Recruiter", description: "AI-enhanced sourcing" },
      { name: "Otter.ai", description: "Interview transcription and analysis" },
    ],
    resourceTags: ["hr", "recruiting", "hiring", "people-ops"],
  },
];
