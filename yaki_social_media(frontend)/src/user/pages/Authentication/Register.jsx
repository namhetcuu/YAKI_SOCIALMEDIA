import React, { useState } from 'react';
import { CircularProgress, Avatar } from '@mui/material';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../../redux/Auth/auth.action';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { uploadToCloudinary } from '../../../shared/utils/uploadToCloudiary';

const interestsList = [
  { id: 'photography', label: 'Photography', icon: '📷' },
  { id: 'tech', label: 'Tech', icon: '⚙' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'travel', label: 'Travel', icon: '✈' },
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'food', label: 'Food', icon: '🍽' },
  { id: 'science', label: 'Science', icon: '🔬' },
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSnackbarMessage, setOpenSnackbar } = useOutletContext();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    avatar: '',
  });

  const [selectedInterests, setSelectedInterests] = useState([
    'photography',
    'tech',
    'travel',
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file, 'image');
      setFormData((prev) => ({ ...prev, avatar: url }));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCompleteRegistration = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setSnackbarMessage('Please fill in required fields');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    dispatch(
      registerUserAction(
        {
          ...formData,
          profilePicture: formData.avatar,
        },
        navigate,
        () => {
          setLoading(false);
          setSnackbarMessage('Account created successfully! Welcome to YAKI Social.');
          setOpenSnackbar(true);
        },
        (msg) => {
          setLoading(false);
          setSnackbarMessage(`Registration failed: ${msg}`);
          setOpenSnackbar(true);
        }
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
      
      {/* 1. Stepper & Progress Bar (Exact Match with Image 4) */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? '50%' : '100%'}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
          {step === 1 ? 'Account Setup' : 'Final Touches'}
        </span>
      </div>

      {/* 2. Step 1: Account Information */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Join thousands of creators sharing their thoughts and inspirations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Alex"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Johnson"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (!formData.email || !formData.password) {
                setSnackbarMessage('Please enter email and password');
                setOpenSnackbar(true);
                return;
              }
              setStep(2);
            }}
            className="w-full py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer mt-4"
          >
            Continue to Profile
          </button>
        </div>
      )}

      {/* 3. Step 2: Final Touches (Exact Match with Image 4) */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome to YAKI Social
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Let's customize your feed. Pick a username and tell us what you love.
            </p>
          </div>

          {/* Avatar Upload Ring (Image 4) */}
          <div className="flex justify-center my-2">
            <div className="relative">
              <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-600">
                <Avatar
                  src={formData.avatar || ''}
                  sx={{ width: 80, height: 80 }}
                  className="bg-white"
                >
                  {formData.firstName?.charAt(0) || 'U'}
                </Avatar>
              </div>

              <input
                type="file"
                id="avatar-reg"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <label
                htmlFor="avatar-reg"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-sm"
              >
                <CameraAltRoundedIcon sx={{ fontSize: 15 }} />
              </label>
            </div>
          </div>

          {/* Inputs Row: Full Name + Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                value={`${formData.firstName} ${formData.lastName}`.trim()}
                onChange={(e) => {
                  const parts = e.target.value.split(' ');
                  setFormData((prev) => ({
                    ...prev,
                    firstName: parts[0] || '',
                    lastName: parts.slice(1).join(' ') || '',
                  }));
                }}
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="@username"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Bio (Optional) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-600">Bio</label>
              <span className="text-[11px] text-slate-400">Optional</span>
            </div>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little bit about yourself..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none resize-none"
            />
          </div>

          {/* Interests Selector (Matching Image 4) */}
          <div>
            <p className="text-xs font-bold text-slate-600 mb-2">
              Choose Interests <span className="text-slate-400 font-normal">(Select at least 3)</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {interestsList.map((interest) => {
                const selected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                      selected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{interest.icon}</span>
                    <span>{interest.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons: Complete Profile & Skip */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleCompleteRegistration}
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="inherit" />
                  <span>Setting up your account...</span>
                </>
              ) : (
                'Complete Profile'
              )}
            </button>

            <button
              type="button"
              onClick={handleCompleteRegistration}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition cursor-pointer py-1"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Register;
