import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed, check your credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          className="w-full mb-3 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
          className="w-full mb-3 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Log in
        </button>      </form>
    </div>
  );
};

export default Login;