import React, { useState } from 'react';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { forgotPasswordAction } from '../../../redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    dispatch(
      forgotPasswordAction(email, (message, success) => {
        setLoading(false);
        setSnackbar({ open: true, message, severity: success ? 'success' : 'error' });
      })
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Forgot Password
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Enter your registered email address to receive password reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="w-full py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : 'Send Reset Link'}
        </button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
          >
            ← Back to Login
          </button>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ borderRadius: '1rem', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
