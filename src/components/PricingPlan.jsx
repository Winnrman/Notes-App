// PricingPlan.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const PricingPlan = ({ plan }) => {

  const history = useNavigate();

  const handleSelectPlan = () => {
    history('/checkout');
  };

  return (
    <>
    {plan.selected ? (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black/20 m-4 h-auto justify-between flex flex-col ring-2 ring-slate-100 shadow-2xl shadow-white">
      <div className="px-6 py-4 flex flex-col h-full justify-between">
        <div>
        <div className="font-bold text-3xl text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text mb-2">{plan.name}</div>
        <p className="text-gray-100 text-base font-semibold mb-3">
          {plan.price}
        </p>
        <ul className="list-disc">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 list-none text-gray-100/60 py-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
          {feature}</li>
          ))}
        </ul>
        </div>

        {plan.selected ? (
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded w-full ">
            Active Plan
          </button>
        ) : (
          <button className="bg-slate-900/50 hover:bg-slate-900/80 text-white font-bold py-2 px-4 rounded w-full">
            Change to {plan.name} Plan
          </button>
        )}
      </div>
    </div>
    ) : (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black/20 m-4 h-auto justify-between flex flex-col hover:scale-[101%] animation-ease-in-out transition-all duration-300 ring-2 ring-slate-600 hover:shadow-2xl hover:shadow-white">
      <div className="px-6 py-4 flex flex-col h-full justify-between">
        <div>
        <div className="font-bold text-3xl text-gradient bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text mb-2">{plan.name}</div>
        <p className="text-gray-100 text-base font-semibold mb-3">
          {plan.price}
        </p>
        <ul className="list-disc">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 list-none text-gray-100/60 py-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
          {feature}</li>
          ))}
        </ul>
        </div>
          {plan.selected ? (
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded w-full">
              Active Plan
            </button>
          ) : (
            <button className="bg-slate-900/50 hover:bg-slate-900/80 text-white font-bold py-2 px-4 rounded w-full" onClick={handleSelectPlan}>
              Select Plan
            </button>
          )}
      
          

      </div>
    </div>
    )}
    </>
  );
};


export default PricingPlan;
