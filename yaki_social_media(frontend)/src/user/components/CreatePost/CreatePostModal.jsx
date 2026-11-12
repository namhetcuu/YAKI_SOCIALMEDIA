import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Modal,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import { useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { uploadToCloudinary } from '../../../shared/utils/uploadToCloudiary';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../../redux/Post/post.action';

const CreatePostModal = ({ handleClose, open }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth.user?.id;

  const formik = useFormik({
    initialValues: { caption: '', image: '', video: '' },
    validate: (values) =>
      values.caption.trim() ? {} : { caption: 'Please write something...' },
    onSubmit: async (values, { resetForm }) => {
      if (!userId) return;
      setIsLoading(true);
      try {
        await dispatch(createPostAction(userId, values));
        resetForm();
        setMediaPreview(null);
        handleClose();
      } catch (error) {
        console.error('Error creating post:', error);
      }
      setIsLoading(false);
    },
  });

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create instant local preview
    setMediaPreview(URL.createObjectURL(file));
    setIsLoading(true);
    try {
      const fileUrl = await uploadToCloudinary(file, type);
      if (fileUrl) {
        await formik.setFieldValue(type, fileUrl);
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    }
    setIsLoading(false);
  };

  const handleAiAssist = () => {
    const aiIdeas = [
      "Excited to share our latest project milestone! 🚀 Hard work really pays off when you love what you build. #Innovation #Tech",
      "Finding peace in little moments between busy work days. 🌿☕ What's your go-to way to reset?",
      "Exploring new creative directions for 2026. What do you think about minimalist UI trends? ✨",
    ];
    const randomIdea = aiIdeas[Math.floor(Math.random() * aiIdeas.length)];
    formik.setFieldValue('caption', randomIdea);
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-base">Create Post</h2>
            <IconButton
              onClick={handleClose}
              size="small"
              className="text-slate-400 hover:text-slate-700"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
            
            {/* Author info & privacy indicator */}
            <div className="flex items-center gap-3">
              <Avatar
                src={auth.user?.profilePicture || ''}
                sx={{ width: 44, height: 44 }}
              />
              <div>
                <p className="font-bold text-sm text-slate-900">
                  {auth.user ? `${auth.user.firstName || ''} ${auth.user.lastName || ''}`.trim() || auth.user.username : 'User'}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-max mt-0.5">
                  <PublicRoundedIcon sx={{ fontSize: 12 }} />
                  <span>Public</span>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                name="caption"
                rows={4}
                placeholder="What's happening? Share with your friends..."
                value={formik.values.caption}
                onChange={formik.handleChange}
                className="w-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none resize-none bg-transparent"
              />
              {formik.errors.caption && formik.touched.caption && (
                <p className="text-xs text-red-500">{formik.errors.caption}</p>
              )}
            </div>

            {/* Media Preview Box */}
            {mediaPreview && (
              <div className="relative rounded-2xl overflow-hidden max-h-56 bg-slate-100 group border border-slate-200">
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMediaPreview(null);
                    formik.setFieldValue('image', '');
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                >
                  <CloseRoundedIcon fontSize="small" />
                </button>
              </div>
            )}

            {/* Attachment Dock */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-600">Add to your post</span>
              <div className="flex items-center gap-1">
                <input
                  type="file"
                  id="image-upload-post"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'image')}
                />
                <label
                  htmlFor="image-upload-post"
                  className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 cursor-pointer transition flex items-center justify-center"
                  title="Upload photo"
                >
                  <ImageOutlinedIcon fontSize="small" />
                </label>

                <button
                  type="button"
                  onClick={handleAiAssist}
                  className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 cursor-pointer transition flex items-center justify-center"
                  title="AI Caption Assist"
                >
                  <AutoAwesomeIcon fontSize="small" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formik.values.caption.trim()}
              className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={18} color="inherit" />
                  <span>Publishing...</span>
                </>
              ) : (
                'Post'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
