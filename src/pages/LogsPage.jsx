import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ClipboardList } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Modal from '../components/ui/Modal';

const LogsPage = () => {
  const [logs, setLogs] = useState([
    { id: 1, item: 'Apples', quantity: 2, category: 'Fruits', date: '2025-11-19', time: '10:30 AM' },
    { id: 2, item: 'Milk', quantity: 1, category: 'Dairy', date: '2025-11-19', time: '08:15 AM' },
    { id: 3, item: 'Bread', quantity: 3, category: 'Grains', date: '2025-11-18', time: '07:45 PM' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Consumption Logs</h1>
          <p className="text-gray-600">Track your daily food consumption</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2 inline" />
          Add Log
        </Button>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{log.item}</h3>
                  <p className="text-sm text-gray-600">{log.category} • Qty: {log.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{log.date}</p>
                <p className="text-sm text-gray-600">{log.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Log Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Consumption Log">
        <form className="space-y-4">
          <InputField label="Item Name" placeholder="e.g., Apples" />
          <InputField label="Quantity" type="number" placeholder="e.g., 2" />
          <InputField label="Category" placeholder="e.g., Fruits" />
          <InputField label="Date" type="date" />
          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">Add Log</Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default LogsPage;