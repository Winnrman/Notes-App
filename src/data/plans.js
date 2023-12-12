const plans = [
    {
      name: "Free Tier",
      price: "$0/mo",
      features: [
        "Create and save notes (text only)",
        "Basic editing tools (bold, italic, underline)",
        "Maximum of 50 notes",
        "Access by web only",
        "Basic search functionality",
        "Community support via forums",
        "Ability to share notes wih others, but not collaborate"
      ],
      selected: true
    },
    {
      name: "Pro Tier",
      price: "30-Day Free Trial, then $4/mo",
      features: [
        "Everything included in Free Tier",
        "Enhanced note capabilities (lists, tables, and code snippets)",
        "Attach images and links to notes",
        "Unlimited note creation",
        "Cross-platform access (web, mobile, tablet)",
        "Advanced search with filters and tags",
        "Offline access and synchronization",
        "Priority email support",
        "Basic collaboration features (e.g., share notes with edit/view permissions)"
      ],
      selected: false
    },
    {
      name: "Enterprise Tier",
      price: "$80/yr",
      features: [
        "Everything included in Free and Pro Tiers",
        "Advanced collaboration tools (real-time editing, version history, comments)",
        "Integration with third-party tools (Slack, Trello, Excel, etc.)",
        "Enhanced security features (end-to-end encryption, single sign-on)",
        "Admin panel for user management and access control",
        "Custom branding options",
        "Dedicated customer support manager",
        "Data export and backup options",
        "Training sessions and resources for team members"
      ],
      selected: false
    }
  ];