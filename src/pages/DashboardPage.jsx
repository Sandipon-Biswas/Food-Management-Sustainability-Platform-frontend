/* eslint-disable-next-line no-unused-vars */
import { motion } from "framer-motion";
import {
  Package,
  AlertCircle,
  TrendingUp,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../components/ui/Card";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  // Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load dashboard");

      setDashboard(data);
      console.log(data)
    } catch (err) {
      console.error("Dashboard Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  // Extract API data
  const { profile, inventorySummary, recentLogs } = dashboard;

  const stats = [
    {
      label: "Total Items",
      value: inventorySummary.totalItems || 0,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Expiring Soon",
      value: inventorySummary.expiringSoon || 0,
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Items Used",
      value: 0,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    }, // API nai, 0 rakhlam
    {
      label: "Money Saved",
      value: "$0",
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-100",
    }, // optional
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome {profile?.name}! Here's your overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h3>

        {recentLogs.length === 0 && (
          <p className="text-gray-500">No recent logs available.</p>
        )}

        <div className="space-y-3">
          {recentLogs.map((log, index) => (
            <motion.div
              key={log._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">
                {log.itemName} ({log.category}) — {log.quantity} pcs
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;
