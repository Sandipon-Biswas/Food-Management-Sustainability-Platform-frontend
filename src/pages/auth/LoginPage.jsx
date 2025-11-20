/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Leaf } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { Link, Navigate, useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {

 const { signInWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmail(email, password)
      .then((userCredential) => {
        // Signed in    
        const user = userCredential.user;
        if (user) {
          navigate('/', { replace: true });
        }
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        alert('Failed to sign in. Please check your credentials and try again.');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your EcoFood account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full mb-4">
            Sign In
          </Button>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 hover:underline font-medium">
              Register
            </Link>
           
          </p>
        </form>
      </Card>
    </motion.div>
  );
};

export default LoginPage;