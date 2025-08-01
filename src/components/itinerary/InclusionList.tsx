"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface InclusionListProps {
  title: string;
  items: string[];
  type: 'inclusions' | 'exclusions';
}

const InclusionList = ({ title, items, type }: InclusionListProps) => {
  const Icon = type === 'inclusions' ? CheckCircle : XCircle;
  const iconColor = type === 'inclusions' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <Icon className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${iconColor}`} />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InclusionList; 