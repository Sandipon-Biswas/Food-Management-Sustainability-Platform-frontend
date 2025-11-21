import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, ClipboardList, Trash2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Modal from "../components/ui/Modal";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    category: "",
    date: "",
  });
  const token = localStorage.getItem("token");

  // Fetch all logs on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:3000/food-log", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/food-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName: formData.itemName,
          quantity: Number(formData.quantity),
          category: formData.category,
          date: formData.date || new Date().toISOString().split("T")[0],
        }),
      });
      if (!res.ok) throw new Error("Failed to add log");
      const newLog = await res.json();
      setLogs([newLog, ...logs]); // add new log to top
      setIsModalOpen(false);
      setFormData({ itemName: "", quantity: "", category: "", date: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/food-log/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete log");
      setLogs(logs.filter((log) => log._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Consumption Logs
          </h1>
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
          <Card key={log._id || log.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {log.itemName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {log.category} • Qty: {log.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <p className="text-sm font-medium text-gray-800">
                  {log.date ? log.date.split("T")[0] : ""}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteLog(log._id)}
                  className="flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Log Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Consumption Log"
      >
        <form className="space-y-4" onSubmit={handleAddLog}>
          <InputField
            label="Item Name"
            placeholder="e.g., Apples"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            required
          />
          <InputField
            label="Quantity"
            type="number"
            placeholder="e.g., 2"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
          />
          <InputField
            label="Category"
            placeholder="e.g., Fruits"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
          <InputField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">
              Add Log
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default LogsPage;
