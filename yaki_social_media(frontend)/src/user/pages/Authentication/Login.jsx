import React, { useState } from 'react';
import { IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../../redux/Auth/auth.action';
import { useNavigate, useOutletContext } from 'react-router-dom';

const initialValues = { username: '', password: '' };

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { setSnackbarMessage, setOpenSnackbar } = useOutletContext();

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(
      loginUserAction(
        values,
        navigate,
        () => {
          setLoading(false);
          setSnackbarMessage('Welcome back to YAKI Social!');
          setOpenSnackbar(true);
          setLoginAttempts(0);
        },
        () => {
          setLoading(false);
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);

          if (newAttempts >= 3) {
            navigate('/forgot-password');
          } else {
            setSnackbarMessage(`Invalid credentials. Attempt ${newAttempts} of 3.`);
            setOpenSnackbar(true);
          }
        }
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Welcome to YAKI Social
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Connect with friends, share your inspirations, and discover new communities.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="e.g. alexjohnson"
                className={`w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-sm border outline-none transition ${
                  touched.username && errors.username
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
                }`}
              />
              {touched.username && errors.username && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 text-sm border outline-none transition pr-11 ${
                    touched.password && errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="inherit" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* Or separator */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
        <span className="relative px-4 bg-white text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Or continue with
        </span>
      </div>

      {/* Quick Demo Login Shortcut */}
      <button
        onClick={() => {
          navigate('/register');
        }}
        className="w-full py-3 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
      >
        Create New Account
      </button>

    </div>
  );
};

export default Login;
