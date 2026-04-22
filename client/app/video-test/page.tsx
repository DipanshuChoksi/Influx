"use client";

import VideoPlayer from "../components/ui/VideoPlayer";

export default function VideoPlayerTestPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-20 flex flex-col items-center gap-10">
      <h1 className="text-4xl font-black text-white">Video Player Test Page</h1>
      
      <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-4 border-indigo-500/50 shadow-2xl shadow-indigo-500/20">
        <VideoPlayer 
          videoUrl="/media/video.webm" 
          title="Test Video (Inline)" 
          inline={true} 
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-slate-400">Modal Mode:</p>
        <VideoPlayer 
          videoUrl="/media/video.webm" 
          title="Test Video (Modal)" 
        />
      </div>
    </div>
  );
}
