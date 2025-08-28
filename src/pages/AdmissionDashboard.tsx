import React, { useState, useEffect } from "react";
import { Users, UserCheck, UserX, RefreshCw } from "lucide-react";
import { fetchAdmissions } from "../api/admissions";
import StatCard from "../components/StatCard";
import { ProgramBarChart, TrendLineChart } from "../components/Charts";
import DateFilter from "../components/DateFilter";
import ProgramTable from "../components/Table";
import type { AdmissionsData } from "../types";

const AdmissionDashboard: React.FC = () => {
  const [data, setData] = useState<AdmissionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdmissions();
      setData(res);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error || !data)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  const filteredTrendData = data.applicationTrends.filter(
    (item) => item.date >= fromDate && item.date <= toDate
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admission Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              University Admin Portal Dashboard
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Applicants"
            value={data.totalApplicants}
            icon={<Users className="w-6 h-6 text-blue-600" />}
            color="text-blue-600"
          />
          <StatCard
            title="Verified Applicants"
            value={data.verifiedApplicants}
            icon={<UserCheck className="w-6 h-6 text-green-600" />}
            color="text-green-600"
          />
          <StatCard
            title="Rejected Applicants"
            value={data.rejectedApplicants}
            icon={<UserX className="w-6 h-6 text-red-600" />}
            color="text-red-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Applications per Program
            </h3>
            <ProgramBarChart programData={data.applicationsPerProgram} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Trends
            </h3>
            <DateFilter
              fromDate={fromDate}
              toDate={toDate}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
            />
            <div className="mt-4">
              <TrendLineChart trendData={filteredTrendData} />
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <ProgramTable
          programData={data.applicationsPerProgram}
          totalApplicants={data.totalApplicants}
        />
      </div>
    </div>
  );
};

export default AdmissionDashboard;
