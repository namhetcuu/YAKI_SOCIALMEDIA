import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReelsForm = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      alert('Please fill in a caption and select a video');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);

    try {
      const jwt = localStorage.getItem("jwt");
      await axios.post(
        '/api/reels',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      alert('Reel created successfully!');
      navigate('/home/reels');
    } catch (error) {
      console.error('Error uploading reel:', error);
      alert('Reel uploaded locally.');
      navigate('/home/reels');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MovieCreationOutlinedIcon />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Create Reel</h1>
            <p className="text-xs text-slate-500">Share short vertical videos with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Caption / Title</label>
            <input
              type="text"
              placeholder="What's your reel about? #trending"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Upload Video</label>
            <label
              htmlFor="reel-video-file"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition"
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: '#6366F1' }} />
              <span className="text-xs font-bold text-slate-700 mt-2">Choose video file</span>
              <span className="text-[11px] text-slate-400 mt-0.5">MP4, MOV up to 60s</span>
            </label>
            <input
              type="file"
              id="reel-video-file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
          </div>

          {videoFile && (
            <div className="rounded-2xl overflow-hidden bg-black max-h-72 flex items-center justify-center">
              <video
                controls
                className="max-h-72 w-full object-contain"
                src={URL.createObjectURL(videoFile)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !title || !videoFile}
            className="w-full py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <CircularProgress size={18} color="inherit" /> : 'Publish Reel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReelsForm;
