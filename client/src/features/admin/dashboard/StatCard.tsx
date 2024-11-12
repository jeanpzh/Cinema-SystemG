// StatCard.jsx
import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string; // Clase de Tailwind para el color de fondo
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 flex items-center`}>
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-gray-700 text-lg font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
