/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Package, AlertCircle, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';

const DashboardPage = () => {
  const stats = [
    { label: 'Total Items', value: '42', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Expiring Soon', value: '5', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Items Used', value: '127', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Money Saved', value: '$342', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const consumptionData = [
    { day: 'Mon', items: 5 },
    { day: 'Tue', items: 8 },
    { day: 'Wed', items: 6 },
    { day: 'Thu', items: 9 },
    { day: 'Fri', items: 7 },
    { day: 'Sat', items: 10 },
    { day: 'Sun', items: 6 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 30, color: '#10b981' },
    { name: 'Fruits', value: 25, color: '#f59e0b' },
    { name: 'Dairy', value: 20, color: '#3b82f6' },
    { name: 'Grains', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 10, color: '#6b7280' },
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
        <p className="text-gray-600">Welcome back! Here's your food sustainability overview.</p>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Consumption</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="items" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {['Added 3 apples to inventory', 'Logged consumption: 2 eggs', 'Item expired: Milk (500ml)', 'Budget alert: 75% spent'].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <ChevronRight className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{activity}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;