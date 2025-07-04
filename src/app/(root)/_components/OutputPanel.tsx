"use client"
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { AlertTriangle, CheckCircle, Copy, Terminal, Play, Zap, Monitor, Activity } from 'lucide-react';
import React, { useState } from 'react'
import RunningCodeSkeleton from './RunningCodeSkeleton';
import { motion } from 'framer-motion';

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const hasContent = output || error;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(output || error || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative slide-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="glass rounded-3xl p-6 relative overflow-hidden card-hover modern-border">
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-indigo-500/5 opacity-50" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl blur opacity-30" />
                <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-pink-600 to-indigo-600 shadow-glow-pink modern-border">
                  <Terminal className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-pink-400" />
                  Output Console
                </h2>
                <p className="text-sm text-gray-400">
                  Execution results and logs
                </p>
              </div>
            </div>

            {hasContent && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 glass-dark hover:bg-pink-500/20 rounded-xl transition-all duration-300 group modern-border"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-pink-400 transition-colors font-medium">Copy</span>
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Output container */}
          <div className="relative">
            <div className="code-block border-pink-500/20">
              {/* Console header */}
              <div className="code-header bg-gradient-to-r from-pink-500/10 to-indigo-500/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-glow"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-glow"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-glow"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-3 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-pink-400" />
                    Console Output
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isRunning && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow"></div>
                      <span className="text-xs text-green-400">Running</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Console content */}
              <div className="relative bg-black/60 p-6 h-[600px] overflow-auto font-mono text-sm">
                {/* Modern overlay effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
                </div>

                {isRunning ? (
                  <RunningCodeSkeleton />
                ) : error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 text-red-400"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mt-1 border border-red-500/30">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-red-300 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Execution Error
                      </div>
                      <pre className="whitespace-pre-wrap text-red-400/90 leading-relaxed">{error}</pre>
                    </div>
                  </motion.div>
                ) : output ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3 text-emerald-400 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-emerald-300 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Execution Successful
                      </span>
                    </div>
                    <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed pl-11">{output}</pre>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600/50 mb-6 subtle-bounce">
                        <Play className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Ready to Execute</h3>
                      <p className="text-gray-500 max-w-sm text-balance">
                        Run your code to see the output and results here
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;