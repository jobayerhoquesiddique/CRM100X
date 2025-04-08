// App information
export const APP_INFO = {
  name: "CRM 100X",
  version: "1.0.0",
  copyright: "© 2025 Jobayer Hoque Siddique",
};

// User details
export const ADMIN_USER = {
  name: "Jobayer Hoque Siddique",
  email: "jobayer@example.com",
  role: "Administrator",
  bio: "Experienced admin with expertise in system management and user administration.",
};

// Navigation items
export const NAVIGATION = {
  main: [
    { name: "Dashboard", icon: "dashboard", path: "/" },
    { name: "Contacts & Leads", icon: "users", path: "/contacts" },
    { name: "Sales Pipeline", icon: "pipeline", path: "/pipeline" },
    { name: "Tasks & Calendar", icon: "calendar", path: "/tasks" },
    { name: "Email Campaigns", icon: "mail", path: "/email" },
    { name: "Analytics", icon: "chart", path: "/analytics" },
    { name: "Documents", icon: "file", path: "/documents" },
    { name: "AI Assistant", icon: "bot", path: "/ai" },
    { name: "Integrations", icon: "plugs", path: "/integrations" },
    { name: "Settings", icon: "settings", path: "/settings" },
    { name: "Notifications", icon: "bell", path: "/notifications", badge: 8 },
  ],
};

// CRM Stats
export const CRM_STATS = [
  { title: "Total Contacts", value: "3,842", change: "+12%", trend: "up" },
  { title: "New Leads", value: "267", change: "+24%", trend: "up" },
  { title: "Deals Won", value: "$198k", change: "+18%", trend: "up" },
  { title: "Conversion Rate", value: "24.8%", change: "+3.2%", trend: "up" }
];

// CRM Recent Deals
export const RECENT_DEALS = [
  { id: 1, name: "Enterprise Software License", value: "$125,000", stage: "Negotiation", probability: 75, company: "Acme Corp", contact: "John Smith" },
  { id: 2, name: "Cloud Migration Project", value: "$84,500", stage: "Proposal", probability: 60, company: "TechGiant Inc", contact: "Lisa Wong" },
  { id: 3, name: "Annual Support Contract", value: "$36,000", stage: "Closed Won", probability: 100, company: "Globex Systems", contact: "Michael Johnson" },
  { id: 4, name: "Security Assessment", value: "$18,750", stage: "Discovery", probability: 30, company: "Initech LLC", contact: "Robert Chen" },
  { id: 5, name: "Data Analytics Platform", value: "$67,200", stage: "Closed Won", probability: 100, company: "Hooli Tech", contact: "Sarah Williams" },
];

// CRM Tasks
export const UPCOMING_TASKS = [
  { id: 1, title: "Call with TechGiant stakeholders", due: "Today, 2:30 PM", priority: "High", assigned: "You" },
  { id: 2, title: "Send proposal to Initech", due: "Tomorrow, 10:00 AM", priority: "Medium", assigned: "You" },
  { id: 3, title: "Follow up with Globex Systems", due: "Apr 10, 11:30 AM", priority: "Medium", assigned: "Mark Taylor" },
  { id: 4, title: "Quarterly review preparation", due: "Apr 12, 9:00 AM", priority: "High", assigned: "You" },
  { id: 5, title: "Update CRM data for Acme Corp", due: "Apr 15, 5:00 PM", priority: "Low", assigned: "Jennifer Lee" },
];

// Theme configuration
export const THEME = {
  primary: "blue",
  secondary: "indigo",
  accent: "teal",
  danger: "red",
  warning: "amber",
  success: "emerald",
  info: "sky",
};