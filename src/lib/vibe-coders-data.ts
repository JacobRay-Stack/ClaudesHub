export interface VibeTopic {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: {
    heading: string;
    terms: {
      term: string;
      plain: string; // plain English explanation
      analogy?: string; // real-world analogy
      aiTip?: string; // how knowing this helps when talking to AI
    }[];
  }[];
}

export const VIBE_TOPICS: VibeTopic[] = [
  {
    slug: "big-picture",
    title: "The Big Picture",
    subtitle: "How a website actually works, in 60 seconds",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "text-accent",
    sections: [
      {
        heading: "The Request-Response Cycle",
        terms: [
          {
            term: "Browser",
            plain: "The app on your computer that displays websites. Chrome, Safari, Firefox. It sends requests and renders the responses.",
            analogy: "The browser is like a waiter -- it takes your order (URL) to the kitchen (server) and brings back what you asked for.",
          },
          {
            term: "Server",
            plain: "A computer somewhere in the world that holds your website's code and data. When someone visits your site, the server sends them the right page.",
            analogy: "The kitchen. It receives orders, prepares the food (HTML/CSS/JS), and sends it out.",
            aiTip: "When you tell AI 'this should happen on the server,' you mean the code runs before the page reaches the user's browser.",
          },
          {
            term: "Request",
            plain: "When your browser asks a server for something. Every time you click a link, submit a form, or load a page, your browser sends a request.",
          },
          {
            term: "Response",
            plain: "What the server sends back. Usually HTML (the page), JSON (data), or an error message.",
          },
          {
            term: "URL / Route",
            plain: "The address of a page. '/about' is a route. '/resources/my-skill' is a route. Each route maps to a page in your code.",
            aiTip: "Tell AI 'create a route at /settings' and it knows to create a new page at that address.",
          },
          {
            term: "HTTP Methods",
            plain: "The type of request. GET = 'give me this page.' POST = 'here's some data, save it.' PUT = 'update this.' DELETE = 'remove this.'",
          },
          {
            term: "Status Codes",
            plain: "Numbers the server sends back to say what happened. 200 = success. 404 = page not found. 500 = server broke. 401 = you're not logged in.",
            aiTip: "When you see '404' in an error, the page or API endpoint doesn't exist. When you see '500,' there's a bug in the server code.",
          },
        ],
      },
      {
        heading: "The Three Layers",
        terms: [
          {
            term: "Frontend",
            plain: "Everything the user sees and interacts with. The buttons, text, images, layout, colors, animations. Runs in the browser.",
            analogy: "The dining room of a restaurant. The decor, the menu, the table layout -- everything the customer experiences.",
          },
          {
            term: "Backend",
            plain: "Everything that happens behind the scenes. Saving data, checking passwords, sending emails, processing payments. Runs on the server.",
            analogy: "The kitchen and back office. Customers never see it, but nothing works without it.",
          },
          {
            term: "Database",
            plain: "Where all your data lives permanently. User accounts, posts, comments, settings. Without a database, everything disappears when the server restarts.",
            analogy: "The filing cabinet. The kitchen (backend) reads recipes from it and stores new orders in it.",
          },
        ],
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend",
    subtitle: "Everything the user sees -- pages, components, and styling",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "text-type-config",
    sections: [
      {
        heading: "The Building Blocks",
        terms: [
          {
            term: "HTML",
            plain: "The structure of a page. Every piece of text, image, button, and link is defined in HTML. It says WHAT is on the page, not how it looks.",
            analogy: "The blueprint of a house. It defines the rooms, doors, and windows -- but not the paint color or furniture.",
            aiTip: "When you say 'add a section with a title and two buttons,' AI writes HTML.",
          },
          {
            term: "CSS",
            plain: "The styling. Colors, fonts, spacing, layout, animations. CSS makes HTML look good.",
            analogy: "The interior design. Same house, completely different feel depending on the CSS.",
            aiTip: "When you say 'make it darker' or 'add more spacing,' AI changes CSS.",
          },
          {
            term: "JavaScript (JS)",
            plain: "The behavior. What happens when you click a button, submit a form, or scroll. JS makes the page interactive.",
            analogy: "The electrician and plumber. The house looks done without them, but nothing actually works until they wire it up.",
          },
          {
            term: "TypeScript (TS)",
            plain: "JavaScript with safety rails. It catches mistakes before your code runs by checking that your data types are correct. Most modern projects use it.",
            aiTip: "If AI generates code with ': string' or ': number' after variables, that's TypeScript. It's helping you avoid bugs.",
          },
        ],
      },
      {
        heading: "Components & Pages",
        terms: [
          {
            term: "Component",
            plain: "A reusable piece of UI. A button is a component. A navigation bar is a component. A user card is a component. You build them once and use them everywhere.",
            analogy: "LEGO bricks. Each brick is a component. You snap them together to build pages.",
            aiTip: "Say 'create a ResourceCard component' and AI builds a reusable piece you can use on any page.",
          },
          {
            term: "Props",
            plain: "Data you pass into a component to customize it. A Button component might accept a 'label' prop and a 'color' prop. Same component, different configuration.",
            analogy: "Like ordering a burger. The burger is the component. 'No pickles, extra cheese' are the props.",
          },
          {
            term: "State",
            plain: "Data that changes over time inside a component. A toggle's on/off status is state. A form's input values are state. A counter's number is state.",
            aiTip: "When AI writes 'useState,' it's creating a piece of data that the component can change and re-render when it updates.",
          },
          {
            term: "Page / Route",
            plain: "A full screen the user sees. In Next.js, every file in the 'app' folder becomes a page. 'app/about/page.tsx' becomes the '/about' page.",
            aiTip: "Tell AI 'create a page at /settings' and it creates the right file in the right folder.",
          },
          {
            term: "Layout",
            plain: "A wrapper that appears on every page. The header and footer are usually in a layout. The page content changes; the layout stays.",
          },
        ],
      },
      {
        heading: "Styling",
        terms: [
          {
            term: "Tailwind CSS",
            plain: "A styling system where you write CSS classes directly on HTML elements. Instead of creating a CSS file, you write 'className=\"text-red-500 p-4 rounded-lg\"' right on the element.",
            aiTip: "Most of the styling AI generates for modern projects uses Tailwind classes. 'p-4' = padding, 'mt-6' = margin-top, 'text-sm' = small text.",
          },
          {
            term: "Responsive Design",
            plain: "Making your site look good on all screen sizes. A 3-column grid on desktop might become a single column on mobile.",
            aiTip: "In Tailwind, 'md:' means 'on medium screens and up.' So 'md:grid-cols-3' = 3 columns on desktop, 1 on mobile.",
          },
          {
            term: "CSS Variables",
            plain: "Reusable values for colors, fonts, etc. Define '--accent: #D4A853' once, use 'var(--accent)' everywhere. Change the variable, everything updates.",
          },
          {
            term: "Dark Mode / Theme",
            plain: "A color scheme for your site. Most modern sites have a dark theme. The colors come from CSS variables so you can swap them easily.",
          },
        ],
      },
    ],
  },
  {
    slug: "backend",
    title: "Backend & Database",
    subtitle: "Where data lives, how auth works, and what APIs are",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    color: "text-type-mcp",
    sections: [
      {
        heading: "Database Fundamentals",
        terms: [
          {
            term: "Table",
            plain: "Like a spreadsheet. A 'users' table has columns (name, email, password) and rows (one per user). A 'resources' table stores all the resources.",
            aiTip: "When you say 'I need to store reviews,' AI creates a table with the right columns.",
          },
          {
            term: "Row",
            plain: "One record in a table. One user. One resource. One comment. Each row has a unique ID.",
          },
          {
            term: "Column / Field",
            plain: "A property that every row has. 'email' is a column. 'title' is a column. 'created_at' is a column.",
          },
          {
            term: "Primary Key (ID)",
            plain: "The unique identifier for every row. Usually a UUID (random string) or auto-incrementing number. No two rows can have the same ID.",
          },
          {
            term: "Foreign Key",
            plain: "A column that points to a row in another table. A comment has an 'author_id' that points to a user. This is how tables relate to each other.",
            analogy: "Like a phone number in your contacts that links to a real person. The number isn't the person -- it just points to them.",
          },
          {
            term: "Query",
            plain: "A question you ask the database. 'Give me all resources where category = DevOps' is a query. 'Count all users who signed up this week' is a query.",
          },
          {
            term: "Migration",
            plain: "A file that changes the database structure. Adding a table, adding a column, changing a constraint. Migrations run in order so the database evolves over time.",
            aiTip: "When AI creates a migration file, you run it in Supabase's SQL Editor. It modifies the database schema.",
          },
          {
            term: "SQL",
            plain: "The language databases speak. 'SELECT * FROM users WHERE email = ...' is SQL. You don't usually write it directly -- your framework handles it.",
          },
        ],
      },
      {
        heading: "APIs & Data Flow",
        terms: [
          {
            term: "API (Application Programming Interface)",
            plain: "A way for your frontend to talk to your backend. The frontend says 'give me the user's profile' and the API responds with the data.",
            analogy: "A menu at a restaurant. You don't go into the kitchen -- you read the menu (API), place an order (request), and get your food (response).",
          },
          {
            term: "Endpoint",
            plain: "A specific URL that does a specific thing. '/api/users' might return all users. '/api/resources/create' might create a new resource. Each endpoint handles one job.",
          },
          {
            term: "JSON",
            plain: "The format data travels in. It looks like: {\"name\": \"Jacob\", \"role\": \"admin\"}. Almost every API sends and receives JSON.",
          },
          {
            term: "Server Action",
            plain: "In Next.js, a function that runs on the server when the user does something (like submitting a form). Simpler than building a full API endpoint.",
            aiTip: "When AI writes 'use server' at the top of a function, that code runs on the server, not in the browser.",
          },
          {
            term: "Fetch / API Call",
            plain: "The act of requesting data from an API. 'Fetch the user's profile.' 'Call the resources API.' Same thing.",
          },
        ],
      },
      {
        heading: "Authentication & Security",
        terms: [
          {
            term: "Authentication (Auth)",
            plain: "Proving who you are. Logging in with email/password or GitHub OAuth. 'Are you who you say you are?'",
          },
          {
            term: "Authorization",
            plain: "What you're allowed to do. An admin can delete any post. A regular user can only delete their own. Authentication = who you are. Authorization = what you can do.",
          },
          {
            term: "OAuth",
            plain: "Logging in with another service. 'Sign in with GitHub' or 'Sign in with Google.' You don't create a password -- the other service vouches for you.",
          },
          {
            term: "Session / Token",
            plain: "After you log in, the server gives you a token (like a wristband at a concert). You show it with every request so the server knows you're still logged in.",
          },
          {
            term: "Row Level Security (RLS)",
            plain: "Database rules that control who can see or edit what. 'Users can only update their own profile.' 'Everyone can read resources.' These rules run in the database itself.",
            aiTip: "When AI writes RLS policies, it's setting up security rules at the database level. Take these seriously.",
          },
          {
            term: "Environment Variables (.env)",
            plain: "Secret values (API keys, database passwords) stored outside your code. They're in a .env file that never gets committed to Git. Your code reads them at runtime.",
            aiTip: "Never paste API keys into your code. Always tell AI to use environment variables.",
          },
        ],
      },
    ],
  },
  {
    slug: "tooling",
    title: "Developer Tools",
    subtitle: "Git, npm, the terminal, and the tools that hold it all together",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    color: "text-success",
    sections: [
      {
        heading: "Version Control",
        terms: [
          {
            term: "Git",
            plain: "A system that tracks every change to your code. You can go back to any previous version, see who changed what, and work on features without breaking the main code.",
            analogy: "Track Changes in Google Docs, but for your entire project.",
          },
          {
            term: "Repository (Repo)",
            plain: "Your project's folder, tracked by Git. A repo contains all your code, its history, and configuration.",
          },
          {
            term: "Commit",
            plain: "A snapshot of your code at a point in time. Every time you finish a change, you 'commit' it with a message describing what you did.",
            aiTip: "When AI says 'let me commit this,' it's saving a checkpoint of the current code state.",
          },
          {
            term: "Branch",
            plain: "A parallel version of your code. You create a branch to work on a feature without touching the main code. When it's ready, you merge it back.",
            analogy: "Like drafting a document in a copy. You edit the copy, and when you're happy, you replace the original.",
          },
          {
            term: "Push / Pull",
            plain: "Push = upload your commits to GitHub. Pull = download other people's commits from GitHub. Push sends. Pull receives.",
          },
          {
            term: "Pull Request (PR)",
            plain: "A proposal to merge your branch into the main code. Other people review it, leave comments, and approve or request changes before it's merged.",
          },
          {
            term: "GitHub",
            plain: "A website that hosts your Git repos online. Also has issues (bug tracking), pull requests (code review), and Actions (automation).",
          },
        ],
      },
      {
        heading: "Package Management",
        terms: [
          {
            term: "npm (Node Package Manager)",
            plain: "The app store for JavaScript code. Need a date formatting library? 'npm install date-fns.' Need a UI framework? 'npm install react.' It downloads code other people wrote so you don't have to.",
          },
          {
            term: "package.json",
            plain: "Your project's ID card. Lists the project name, version, scripts (commands), and all the packages it depends on.",
            aiTip: "When AI adds a dependency, it updates package.json. Run 'npm install' to actually download it.",
          },
          {
            term: "node_modules",
            plain: "The folder where npm downloads all your packages. It can be huge (hundreds of MB). Never edit it, never commit it to Git.",
          },
          {
            term: "Dependencies",
            plain: "Other people's code your project uses. React, Tailwind, Supabase -- these are all dependencies. They're listed in package.json.",
          },
        ],
      },
      {
        heading: "The Terminal",
        terms: [
          {
            term: "Terminal / Command Line",
            plain: "A text-based way to control your computer. Instead of clicking, you type commands. 'npm run dev' starts your dev server. 'git push' uploads code.",
            aiTip: "When AI says 'run this command,' it means paste it into your terminal and hit Enter.",
          },
          {
            term: "npm run dev",
            plain: "Starts your local development server. Your site runs at localhost:3000 so you can see changes in real time.",
          },
          {
            term: "npm run build",
            plain: "Packages your code for production. Optimizes, compresses, and prepares it for deployment. If this fails, your site has errors that need fixing.",
          },
          {
            term: "localhost",
            plain: "Your own computer, acting as a server. 'localhost:3000' means 'this machine, port 3000.' Only you can see it -- it's not on the internet yet.",
          },
        ],
      },
    ],
  },
  {
    slug: "frameworks",
    title: "Modern Frameworks",
    subtitle: "What Next.js, React, Supabase, and Tailwind actually do",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    color: "text-type-guide",
    sections: [
      {
        heading: "The Stack",
        terms: [
          {
            term: "Tech Stack",
            plain: "The combination of tools and frameworks your project uses. 'Next.js + Supabase + Tailwind + Vercel' is a stack. Different stacks are good for different things.",
            aiTip: "Tell AI your stack upfront. 'I'm using Next.js with Supabase and Tailwind' helps it generate the right code.",
          },
          {
            term: "React",
            plain: "A JavaScript library for building user interfaces. You build everything as components. React handles updating the screen when data changes. It's the most popular frontend library in the world.",
          },
          {
            term: "Next.js",
            plain: "A framework built on React that adds routing (pages), server-side rendering, API routes, and deployment tools. React is the engine; Next.js is the car.",
            aiTip: "Next.js has specific conventions. Files named 'page.tsx' become pages. Files named 'layout.tsx' become layouts. AI knows these conventions.",
          },
          {
            term: "Supabase",
            plain: "A backend-as-a-service. It gives you a Postgres database, authentication, file storage, and real-time subscriptions without building a backend from scratch.",
            analogy: "Supabase is a pre-built kitchen. Instead of building the oven, fridge, and plumbing yourself, you walk in and start cooking.",
          },
          {
            term: "Tailwind CSS",
            plain: "A utility-first CSS framework. Instead of writing CSS files, you add classes directly to your HTML. 'p-4' adds padding. 'bg-red-500' makes it red. 'rounded-lg' rounds the corners.",
          },
          {
            term: "Vercel",
            plain: "A hosting platform that deploys Next.js apps. Push your code to GitHub, Vercel automatically builds and deploys it. Your site is live in minutes.",
          },
        ],
      },
      {
        heading: "Key Concepts",
        terms: [
          {
            term: "Server Component vs Client Component",
            plain: "Server components render on the server (fast, can access database directly). Client components render in the browser (can be interactive, handle clicks/state). In Next.js, components are server by default. Add 'use client' to make them interactive.",
            aiTip: "When AI adds 'use client' at the top of a file, it's making that component interactive in the browser.",
          },
          {
            term: "App Router",
            plain: "Next.js's file-based routing system. The folder structure IS your URL structure. 'app/about/page.tsx' = '/about'. 'app/resources/[slug]/page.tsx' = '/resources/any-slug'.",
          },
          {
            term: "Dynamic Route",
            plain: "A page that works for any value. '/resources/[slug]' handles '/resources/my-skill' AND '/resources/your-skill.' The [slug] part is a variable.",
          },
          {
            term: "SSR (Server-Side Rendering)",
            plain: "The server builds the HTML before sending it to the browser. Faster first load, better for SEO. Next.js does this by default.",
          },
          {
            term: "API Route / Server Action",
            plain: "Code that runs on the server, triggered by the frontend. Submitting a form calls a server action that saves data to the database.",
          },
          {
            term: "Middleware",
            plain: "Code that runs BETWEEN the request and the response. Often used for authentication: 'Is this user logged in? If not, redirect to /login.'",
          },
        ],
      },
    ],
  },
  {
    slug: "talking-to-ai",
    title: "Talking to AI",
    subtitle: "How knowing terminology makes your AI conversations 10x better",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "text-type-prompt",
    sections: [
      {
        heading: "Before vs After",
        terms: [
          {
            term: "Vague: 'Make it save stuff'",
            plain: "Better: 'Create a server action that inserts a row into the resources table with title, description, and author_id, then redirects to the new resource page.'",
            aiTip: "The more specific your language, the fewer iterations. Using database terms (table, row, insert, column) eliminates ambiguity.",
          },
          {
            term: "Vague: 'Add a login'",
            plain: "Better: 'Set up Supabase Auth with GitHub OAuth. Add a login page at /login with an OAuth button. After login, redirect to the homepage. Use middleware to protect /settings and /resources/new.'",
            aiTip: "Naming the auth provider, the routes to protect, and the redirect behavior gives AI everything it needs in one prompt.",
          },
          {
            term: "Vague: 'Make it look better'",
            plain: "Better: 'Increase spacing between cards to gap-4. Make the heading font-display and text-2xl. Add a subtle border-border and rounded-lg to the container. Use the accent color for the CTA button.'",
            aiTip: "Tailwind class names ARE the vocabulary of design. Learning 10-15 common ones (p-4, gap-4, text-sm, rounded-lg, border, bg-card) lets you describe exactly what you want.",
          },
          {
            term: "Vague: 'It's broken'",
            plain: "Better: 'I'm getting a 500 error when I submit the form. The console shows \"column author_id cannot be null.\" I think the user session isn't being passed to the server action.'",
            aiTip: "Copy the exact error message. Name the file. Describe what you expected vs what happened. AI can diagnose in one shot instead of five back-and-forths.",
          },
        ],
      },
      {
        heading: "Power Phrases",
        terms: [
          {
            term: "'Create a component'",
            plain: "Tells AI to build a reusable UI piece. Follow with what it should look like and what props it should accept.",
          },
          {
            term: "'Add a server action'",
            plain: "Tells AI to write a function that runs on the server. Usually for form submissions, database writes, or API calls.",
          },
          {
            term: "'Add a route at /path'",
            plain: "Tells AI to create a new page. In Next.js, this means creating the right folder and page.tsx file.",
          },
          {
            term: "'Query the [table] table'",
            plain: "Tells AI to read from the database. Follow with what columns you need and how to filter/sort.",
          },
          {
            term: "'Add RLS policies'",
            plain: "Tells AI to write security rules for a database table. Specify who should be able to read, write, update, and delete.",
          },
          {
            term: "'Make it responsive'",
            plain: "Tells AI to make it work on mobile. It'll add Tailwind breakpoint classes (sm:, md:, lg:) to adjust layout by screen size.",
          },
          {
            term: "'Add loading and error states'",
            plain: "Tells AI to handle what the user sees while data is loading and when something goes wrong.",
          },
          {
            term: "'Protect this route'",
            plain: "Tells AI to add authentication. Only logged-in users can access this page; everyone else gets redirected to /login.",
          },
        ],
      },
    ],
  },
];
