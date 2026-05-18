'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiUpload, FiCheckCircle, FiAlertCircle, FiLoader, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import Sidebar from '@/app/components/ui/Sidebar';

export default function IngestPage() {
  const [path, setPath] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState<{ movies: number; tvShows: number; errors: string[] } | null>(null);

  const handlePickFolder = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ingest/pick', { withCredentials: true });
      if (response.data.success) {
        setPath(response.data.path);
      }
    } catch (err: any) {
      console.error('Folder picker failed:', err);
    }
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path) return;

    setStatus('loading');
    setMessage('Scanning and copying media files...');
    setSummary(null);

    try {
      const response = await axios.post('http://localhost:5000/api/ingest', { sourcePath: path }, { withCredentials: true });
      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message);
        setSummary(response.data.summary);
      } else {
        setStatus('error');
        setMessage(response.data.message || 'Ingestion failed');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to connect to ingestion service');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      <Sidebar />

      <main className="pl-20 md:pl-64 min-h-screen">
        {/* Decorative Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 p-8 md:p-12 max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                System Admin
              </span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-none">
              Media <span className="text-indigo-500">Ingestion</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Scan your local storage and automatically import movies and TV series into your Influx library with smart metadata
              matching.
            </p>
          </motion.div>

          {/* Main Ingestion Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
          >
            <form onSubmit={handleIngest} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-wider">Source Configuration</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative group flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiFolder className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      placeholder="/path/to/your/media/folder"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handlePickFolder}
                    className="px-6 h-[58px] bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 text-indigo-400 font-bold whitespace-nowrap group active:scale-95"
                  >
                    <FiSearch className="group-hover:scale-110 transition-transform" />
                    Pick Folder
                  </button>
                </div>
                <div className="flex items-center gap-2 ml-1">
                  <FiAlertCircle className="text-slate-500" size={14} />
                  <p className="text-xs text-slate-500">Ensure the directory is accessible by the server process.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !path}
                className="w-full h-16 bg-white text-slate-950 hover:bg-indigo-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-black rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <FiLoader className="animate-spin text-2xl" />
                ) : (
                  <FiUpload className="group-hover:-translate-y-1 transition-transform text-2xl" />
                )}
                <span className="text-lg uppercase tracking-tight">
                  {status === 'loading' ? 'Ingesting Library...' : 'Start Import Process'}
                </span>
              </button>
            </form>

            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`p-6 rounded-2xl border backdrop-blur-md flex flex-col md:flex-row items-start gap-6 ${
                      status === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : status === 'error'
                          ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    <div className="mt-1 p-3 rounded-xl bg-current/10">
                      {status === 'success' ? (
                        <FiCheckCircle size={24} />
                      ) : status === 'error' ? (
                        <FiAlertCircle size={24} />
                      ) : (
                        <FiLoader size={24} className="animate-spin" />
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{status === 'loading' ? 'In Progress' : 'Status Update'}</h4>
                        <p className="text-slate-300 font-medium">{message}</p>
                      </div>

                      {summary && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-colors">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                              Movies Found
                            </span>
                            <span className="text-3xl font-black text-white">{summary.movies}</span>
                          </div>
                          <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-purple-500/30 transition-colors">
                            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                              TV Shows Found
                            </span>
                            <span className="text-3xl font-black text-white">{summary.tvShows}</span>
                          </div>
                        </div>
                      )}

                      {summary?.errors && summary.errors.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <p className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2">
                            <FiAlertCircle size={12} /> Errors encountered
                          </p>
                          <div className="bg-rose-500/5 rounded-xl p-3 border border-rose-500/10">
                            <ul className="text-xs space-y-1.5 text-slate-400">
                              {summary.errors.map((err, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-rose-500">•</span>
                                  {err}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Guidelines Section */}
          <div className="grid md:grid-cols-2 gap-8 pb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 hover:bg-slate-900/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-xl font-black">01</span>
              </div>
              <h3 className="font-bold text-xl text-white mb-4">Movies Logic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Place movie files (mp4, mkv, etc.) directly in the root of the source folder.
                <br />
                <br />
                <span className="text-slate-500 italic">Example: /Media/Inception.mp4</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 hover:bg-slate-900/60 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-xl font-black">02</span>
              </div>
              <h3 className="font-bold text-xl text-white mb-4">TV Series Logic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Create a folder for each TV Series. Episodes should be named with standard S00E00 format.
                <br />
                <br />
                <span className="text-slate-500 italic">Example: /Media/Breaking Bad/S01E01.mkv</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
