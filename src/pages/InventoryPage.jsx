import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Modal from '../components/ui/Modal';

const InventoryPage = () => {
  
  const [items, setItems] = useState([
    { id: 1, name: 'Apples', category: 'Fruits', quantity: 5, expiry: '2025-11-25', status: 'good' },
    { id: 2, name: 'Milk', category: 'Dairy', quantity: 2, expiry: '2025-11-21', status: 'expiring' },
    { id: 3, name: 'Bread', category: 'Grains', quantity: 1, expiry: '2025-11-20', status: 'expiring' },
    { id: 4, name: 'Carrots', category: 'Vegetables', quantity: 10, expiry: '2025-11-28', status: 'good' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory</h1>
          <p className="text-gray-600">Manage your food items and track expiration dates</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2 inline" />
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {item.status === 'good' ? 'Fresh' : 'Expiring Soon'}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expires:</span>
                <span className="font-medium">{item.expiry}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="flex-1 text-sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="danger" className="text-sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Item Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Item">
        <form className="space-y-4">
          <InputField label="Item Name" placeholder="e.g., Apples" />
          <InputField label="Category" placeholder="e.g., Fruits" />
          <InputField label="Quantity" type="number" placeholder="e.g., 5" />
          <InputField label="Expiry Date" type="date" />
          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">Add Item</Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default InventoryPage;