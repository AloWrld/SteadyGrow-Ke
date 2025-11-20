import React, { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, Check, Plus, Zap, Image as ImageIcon, Trash2, Sparkles } from 'lucide-react';
import { UserProfile, Post, Platform, DriveFile } from '../types';
import MediaPicker from '../components/MediaPicker';
import { fetchPosts, createPost } from '../services/mockService';

interface HomeProps {
  user: UserProfile;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  // State
  const [autoPostingEnabled, setAutoPostingEnabled] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<DriveFile | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Manual Post Form
  const [manualText, setManualText] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postTime, setPostTime] = useState('');
  const [frequency, setFrequency] = useState('once');

  useEffect(() => {
    // Load posts
    fetchPosts().then((data) => {
      setScheduledPosts(data);
      setLoading(false);
    });
  }, []);

  const handleMediaSelect = (file: DriveFile) => {
    setSelectedMedia(file);
    setIsMediaPickerOpen(false);
  };

  const handleManualPost = async () => {
    if (!manualText && !selectedMedia) return;

    setLoading(true);
    const newPost = await createPost({
      content: manualText,
      mediaUrl: selectedMedia?.thumbnailLink,
      scheduledTime: `${postDate}T${postTime}:00.000Z`,
      platforms: [Platform.FACEBOOK, Platform.LINKEDIN] // Default for now
    });
    setScheduledPosts([...scheduledPosts, newPost]);
    setManualText('');
    setSelectedMedia(null);
    setLoading(false);
    alert("Post scheduled successfully via AI Engine!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header / Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.displayName}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            🌍 {user.country}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            📍 {user.region}
          </span>
          <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
            🎯 Niche: {user.niche}
          </span>
        </div>
      </div>

      {/* SECTION 1: AUTOMATIC POSTING */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="text-yellow-500 w-5 h-5" />
              Automatic Posting
            </h2>
            <p className="text-sm text-gray-500 mt-1">Let AI handle your growth automatically.</p>
          </div>
          <div className="flex items-center">
            <span className={`mr-3 text-sm font-medium ${autoPostingEnabled ? 'text-primary' : 'text-gray-500'}`}>
              {autoPostingEnabled ? 'Active' : 'Paused'}
            </span>
            <button
              onClick={() => setAutoPostingEnabled(!autoPostingEnabled)}
              className={`${
                autoPostingEnabled ? 'bg-primary' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                aria-hidden="true"
                className={`${
                  autoPostingEnabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
        
        {autoPostingEnabled && (
          <div className="p-6 bg-indigo-50/30 space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI Direction</label>
                <textarea 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-sm"
                  rows={3}
                  placeholder="e.g., Post motivational quotes about tech startups every morning..."
                />
             </div>
             <div className="flex flex-wrap gap-4 items-end">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                   <select className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm py-2 pl-3 pr-10">
                     <option>2 posts / day</option>
                     <option>1 post / day</option>
                     <option>3 posts / week</option>
                   </select>
                </div>
                <div className="flex-grow"></div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Use Media Folder
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Save Automation
                </button>
             </div>
          </div>
        )}
      </section>

      {/* SECTION 2: MANUAL POSTING */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Plus className="text-primary w-5 h-5" />
            Create New Post
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Prompt (AI Enhanced)</label>
                <textarea 
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 h-32 resize-none"
                  placeholder="Write your post idea here or let AI suggest one..."
                />
                <div className="mt-1 flex justify-end">
                   <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                     <Sparkles className="w-3 h-3" /> Enhance with AI
                   </button>
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Attachment</label>
                {selectedMedia ? (
                  <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={selectedMedia.thumbnailLink || 'https://via.placeholder.com/40'} className="w-10 h-10 rounded object-cover" alt="Selected" />
                      <div className="text-sm overflow-hidden">
                         <p className="font-medium truncate max-w-[150px]">{selectedMedia.name}</p>
                         <p className="text-xs text-gray-500">{selectedMedia.mimeType}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedMedia(null)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                  >
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm">Select from Drive or Upload</span>
                  </button>
                )}
             </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg h-fit">
             <h3 className="font-medium text-gray-900 text-sm">Scheduling</h3>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                 <input 
                   type="date" 
                   value={postDate}
                   onChange={(e) => setPostDate(e.target.value)}
                   className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" 
                 />
               </div>
               <div>
                 <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                 <input 
                   type="time" 
                   value={postTime}
                   onChange={(e) => setPostTime(e.target.value)}
                   className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" 
                 />
               </div>
             </div>

             <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Repeat</label>
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
                >
                  <option value="once">Don't repeat</option>
                  <option value="daily">Every Day</option>
                  <option value="weekly">Every Week</option>
                  <option value="monthly">Every Month</option>
                </select>
             </div>

             <div className="pt-4 flex gap-3">
               <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                 Preview
               </button>
               <button 
                onClick={handleManualPost}
                disabled={loading}
                className="flex-1 bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                 {loading ? 'Processing...' : <><Check className="w-4 h-4" /> Schedule</>}
               </button>
             </div>
             
             <div className="text-xs text-gray-500 mt-2 flex items-start gap-1">
               <span className="text-green-600 font-bold">AI Tip:</span> 
               Based on your niche, the best time to post is today at 6:00 PM.
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SCHEDULED & RECYCLED */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="text-secondary w-5 h-5" />
            Queue & History
          </h2>
          <div className="flex gap-2">
            <button className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">Scheduled</button>
            <button className="text-xs font-medium px-3 py-1 text-gray-500 hover:text-gray-700">Recycled</button>
            <button className="text-xs font-medium px-3 py-1 text-gray-500 hover:text-gray-700">Published</button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {scheduledPosts.length === 0 ? (
             <div className="p-8 text-center text-gray-500 text-sm">
               No posts in queue. Start creating!
             </div>
          ) : (
            scheduledPosts.map((post) => (
              <div key={post.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  {post.mediaUrl ? (
                    <img src={post.mediaUrl} alt="Post media" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     {post.isRecycled && (
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                         <RefreshCw className="w-3 h-3 mr-1" /> Recycled
                       </span>
                     )}
                     <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(post.scheduledTime).toLocaleString()}
                     </span>
                  </div>
                  <p className="text-sm text-gray-900 truncate">{post.content}</p>
                  <div className="mt-2 flex gap-2">
                    {post.platforms.map(p => (
                      <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                   <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Edit">
                     <Sparkles className="w-4 h-4" />
                   </button>
                   <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <MediaPicker 
        isOpen={isMediaPickerOpen} 
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  );
};

export default Home;