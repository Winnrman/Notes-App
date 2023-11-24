import React, { useState } from 'react';
import axios from 'axios';
import PricingPlan from '../components/PricingPlan';
import Header from '../components/Header';


const UpgradePage = () => {

    const [currentPlan, setCurrentPlan] = useState("Free Tier");

    const getCurrentPlan = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get('/api/user/plan', config);
            //the response in an array full of objects
            setCurrentPlan(response.data[0].plan);
            // console.log(response.data); //these are objects in an array
        } catch (error) {
            console.error(error);
            // Handle errors, e.g., redirect to login if token is invalid or expired
        }
    };

    const handlePlanChange = (planName) => {
        setCurrentPlan(planName);
    };

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
    return (
        <>
        <Header/>
        <div className = "flex min-h-screen flex-col justify-center items-center bg-gradient-to-bl from-purple-900 to-blue-900">
            <h1 className = "text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text p-2">Upgrade Your Plan</h1>
            <div className = "flex flex-col sm:flex-row justify-center h-full">
                {plans.map((plan, index) => (
                    <PricingPlan plan = {plan} key = {index} handlePlanChange = {handlePlanChange} currentPlan = {currentPlan}/>
                ))}
            </div>
        </div>
        </>
    );
    }

export default UpgradePage;