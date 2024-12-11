import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Generic error state
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset all errors
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    let hasError = false;

    // Validate Name
    if (!trimmedName) {
      setNameError('Name is required.');
      hasError = true;
    }

    // Validate Email
    if (!trimmedEmail) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email.');
      hasError = true;
    }

    // Validate Password
    if (!trimmedPassword) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (trimmedPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      hasError = true;
    }

    if (hasError) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('role', data.data.role);

      toast.success('Registration successful!');
      navigate(`/seller/${data.data.userId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${
                nameError ? 'border-red-500' : ''
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            {nameError && (
              <p className="text-red-600 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${
                emailError ? 'border-red-500' : ''
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${
                passwordError ? 'border-red-500' : ''
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center">{`Error: ${error}`}</p>
        )}

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
