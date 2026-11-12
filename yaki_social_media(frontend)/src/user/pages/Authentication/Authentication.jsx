import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const isLogin = location.pathname === '/login';

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      
      {/* 1. Auth Header (Matching Image 4) */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
            <span className="text-lg font-black">⚡</span>
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">
            YAKI<span className="text-indigo-600">Social</span>
          </span>
        </div>

        {/* Right Switch link */}
        <div className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-3">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button
            onClick={() => navigate(isLogin ? '/register' : '/login')}
            className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-800 hover:border-indigo-500 hover:text-indigo-600 font-bold transition cursor-pointer bg-white shadow-2xs"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </header>

      {/* 2. Form Center Stage */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl">
          <Outlet context={{ setSnackbarMessage, setOpenSnackbar }} />
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="py-6 text-center text-xs text-slate-400">
        © 2026 YAKI Social, Inc. All rights reserved.
      </footer>

      {/* Snackbar feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.toLowerCase().includes('success') ? 'success' : 'error'}
          sx={{ borderRadius: '1rem', fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Authentication;
