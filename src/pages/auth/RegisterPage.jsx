import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const RegisterPage = () => {
    const { createUserWithEmail } = React.useContext(AuthContext);
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validatePassword = (pwd) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
        
        if (!pwd) {
            setPasswordError('Password is required');
            return false;
        }
        
        if (pwd.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }
        
        if (!passwordRegex.test(pwd)) {
            setPasswordError('Password must contain at least one letter, one number, and one symbol');
            return false;
        }
        
        setPasswordError('');
        return true;
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            validatePassword(e.target.value);
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validatePassword(password)) {
            return;
        }

        if (!name || !email) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmail(email, password);
            const user = userCredential.user;
            
            console.log('User registered:', user);
            
            // Navigate to home page after successful registration
            navigate('/', { replace: true });
        } catch (err) {
            console.error('Error registering user:', err);
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join EcoFood for sustainable living</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-2 mb-4">{passwordError}</p>
                    )}
                    
                    {error && (
                        <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full mb-4"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-600 hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                </form>
            </Card>
        </motion.div>
    );
};

export default RegisterPage;