import React from 'react'
import { FaBuilding } from "react-icons/fa";

const PlacementOpportunities = () => {
    const companies = [
        { name: "Google", vacancy: "Software Engineer", strategy: "AI & Cloud Expansion", logo: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg" },
        { name: "Microsoft", vacancy: "Data Analyst", strategy: "Azure & AI Focus", logo: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg" },
        { name: "Amazon", vacancy: "Operations Manager", strategy: "E-commerce & Logistics", logo: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg" },
        { name: "Tesla", vacancy: "Embedded Systems Engineer", strategy: "EV & Automation Growth", logo: "https://images.seeklogo.com/logo-png/32/2/tesla-logo-png_seeklogo-329764.png" }
    ];
  return (
    <div>
      <section className="mb-8 mt-6">
                              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaBuilding /> Placement Opportunities</h2>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                  {companies.map((company, index) => (
                                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                          <img src={company.logo} alt={company.name} className="w-12 h-12 mb-2" />
                                          <h3 className="font-semibold">{company.name}</h3>
                                          <p className="text-sm">Vacancy: {company.vacancy}</p>
                                          <p className="text-xs text-gray-600">Strategy: {company.strategy}</p>
                                      </div>
                                  ))}
                              </div>
                          </section>
    </div>
  )
}

export default PlacementOpportunities
