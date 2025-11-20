import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { User, Camera, Save, DollarSign, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

const ProfilePage = ({ user, setUser }) => {
  const [name, setName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john@example.com');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [householdSize, setHouseholdSize] = useState('4');
  const [budget, setBudget] = useState('500');
  const [dietaryPreferences, setDietaryPreferences] = useState('vegetarian');

  const handleSave = () => {
    setUser({ ...user, name, email });
    alert('Profile updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
              {name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
            <p className="text-gray-600 text-sm mb-4">{email}</p>
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2 inline" />
              Change Photo
            </Button>
          </div>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Household Size"
                type="number"
                value={householdSize}
                onChange={(e) => setHouseholdSize(e.target.value)}
                icon={Users}
              />
              <InputField
                label="Monthly Budget ($)"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                icon={DollarSign}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </label>
              <select
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="none">No Restrictions</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="glutenfree">Gluten-Free</option>
                <option value="halal">Halal</option>
              </select>
            </div>
            <Button onClick={handleSave} className="w-full">
              <Save className="w-5 h-5 mr-2 inline" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProfilePage;