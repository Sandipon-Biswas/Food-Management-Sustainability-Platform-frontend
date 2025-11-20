import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, BookOpen, Calendar, Package, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ResourcesPage = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  
  const resources = [
    { id: 1, title: 'Reducing Food Waste', category: 'Tips', description: 'Learn practical ways to minimize food waste in your household', icon: Leaf },
    { id: 2, title: 'Sustainable Shopping Guide', category: 'Guide', description: 'Make eco-friendly choices when grocery shopping', icon: BookOpen },
    { id: 3, title: 'Meal Planning Basics', category: 'Tips', description: 'Plan meals efficiently to reduce waste and save money', icon: Calendar },
    { id: 4, title: 'Composting 101', category: 'Guide', description: 'Turn food scraps into nutrient-rich compost', icon: Leaf },
    { id: 5, title: 'Storage Tips', category: 'Tips', description: 'Proper food storage to extend shelf life', icon: Package },
    { id: 6, title: 'Zero Waste Kitchen', category: 'Guide', description: 'Transform your kitchen into a zero-waste zone', icon: Leaf },
  ];

  const filteredResources = filterCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === filterCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sustainability Resources</h1>
        <p className="text-gray-600">Explore guides and tips for sustainable food management</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Tips">Tips</option>
          <option value="Guide">Guides</option>
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <resource.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap ml-2">
                    {resource.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full text-sm">
                  <Eye className="w-4 h-4 mr-2 inline" />
                  View Resource
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourcesPage;