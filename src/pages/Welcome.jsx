// Welcome.js
import React from "react";
import Header from "../components/Header";
import PricingPlan from "../components/PricingPlan"; // Make sure to create this component

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
        "Community support via forums"
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
        "Integration with third-party tools (Slack, Trello, etc.)",
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
  

const Welcome = () => {
    return (
        <div>
            <Header/>
            <div className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-bl from-purple-900 to-blue-900">
                <div className = "h-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl sm:text-6xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Welcome to Noteify!</h1>
                <h1 className="text-md sm:text-2xl font-bold text-slate-300 pb-4">Creating the future of note-taking with AI.</h1>
                <p className="text-sm sm:text-md font-base text-slate-400">Organize, <span className="bg-slate-300 p-1 text-black">annotate</span>, and search your notes with ease.</p>
                
                <div className="flex flex-row gap-2 pt-10">
                    <button className="bg-black/20 hover:bg-white-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/login"}>Login</button>
                    <button className="bg-transparent hover:bg-black/10 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = "/register"}>Create an Account</button>
                </div>
                </div>

            {/* Payment Plans Section */}
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-6xl font-bold text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">Payment Plans</h1>
                <h1 className="text-lg sm:text-2xl font-bold text-slate-300 pb-12">Choose a plan that works for you.</h1>
            <div className="flex flex-col sm:flex-row justify-center h-full">
                  {plans.map((plan, index) => (
                    <PricingPlan key={index} plan={plan} />
                  ))}
                </div>
                </div> 
                </div>


        </div>
    );
}

export default Welcome;
