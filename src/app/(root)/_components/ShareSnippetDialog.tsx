import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useMutation } from 'convex/react';
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { X, Share, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function ShareSnippetDialog( { onClose}: { onClose: () => void }) {
  const [title, setTitle] =useState('');
  const [ isSharing, setIsSharing] = useState(false);
  const { language, getCode} = useCodeEditorStore();
  const createSnipppet= useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);
    try {
      const code= getCode();
      await createSnipppet({title, code, language});
      onClose();
      setTitle('');
      toast.success('Snippet shared successfully!');
    } catch (error) {
      console.error('Error sharing snippet:', error);
      toast.error('Failed to share snippet. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl p-6 w-full max-w-md modern-border"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-glow">
              <Share className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Share Code Snippet</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleShare} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Snippet Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 glass-dark border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-500"
              placeholder="Enter a descriptive title..."
              required
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 glass-dark rounded-xl border border-white/10">
            <Code className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Language: </span>
            <span className="text-sm font-medium text-indigo-400">{language}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost px-6 py-3 rounded-xl text-gray-400 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSharing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Share className="w-4 h-4" />
                  <span>Share Snippet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ShareSnippetDialog