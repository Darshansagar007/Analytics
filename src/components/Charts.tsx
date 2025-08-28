import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ApplicationsPerProgram, ApplicationTrends } from "../types";

interface BarProps {
  programData: ApplicationsPerProgram[];
}

interface LineProps {
  trendData: ApplicationTrends[];
}

export const ProgramBarChart: React.FC<BarProps> = ({ programData }) => (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={programData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="program"
        angle={-45}
        textAnchor="end"
        height={50}
        fontSize={12}
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const TrendLineChart: React.FC<LineProps> = ({ trendData }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={trendData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        fontSize={12}
        tickFormatter={(date: any) => new Date(date).toLocaleDateString()}
      />
      <YAxis />
      <Tooltip
        labelFormatter={(date: any) => new Date(date).toLocaleDateString()}
      />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#10B981"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
