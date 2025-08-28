import React from "react";
import type { ApplicationsPerProgram } from "../types";

interface Props {
  programData: ApplicationsPerProgram[];
  totalApplicants: number;
}

const ProgramTable: React.FC<Props> = ({ programData, totalApplicants }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Program Summary
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Program
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">
              Applications
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {programData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-gray-900">{item.program}</td>
              <td className="py-3 px-4 text-right text-gray-900">
                {item.count}
              </td>
              <td className="py-3 px-4 text-right text-gray-600">
                {((item.count / totalApplicants) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProgramTable;
