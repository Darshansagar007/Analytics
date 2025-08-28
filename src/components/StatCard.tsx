import React from "react";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<Props> = ({ title, value, icon, color }) => {
  const getHighlightColor = (val: number) => {
    if (val > 1000) return "border-red-500 bg-red-50";
    if (val > 500) return "border-orange-500 bg-orange-50";
    return "border-gray-200 bg-white";
  };

  return (
    <div
      className={`p-6 rounded-xl border-2 shadow-sm transition-all hover:shadow-md ${getHighlightColor(
        value
      )}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`p-3 rounded-full ${
            color.includes("blue")
              ? "bg-blue-100"
              : color.includes("green")
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
