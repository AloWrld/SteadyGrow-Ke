import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
import { TrendingUp, Users, MessageCircle, Share2 } from 'lucide-react';
import { fetchAnalytics } from '../services/mockService';
import { AnalyticsMetric } from '../types';

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsMetric[]>([]);

  useEffect(() => {
    fetchAnalytics().then(setData);
  }, []);

  const growthData = [
    { name: 'Week 1', followers: 4000, engagement: 2400 },
    { name: 'Week 2', followers: 4500, engagement: 1398 },
    { name: 'Week 3', followers: 5100, engagement: 3800 },
    { name: 'Week 4', followers: 6000, engagement: 4200 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <select className="bg-white border border-gray-300 rounded-md text-sm px-3 py-2 shadow-sm focus:outline-none focus:border-primary">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>All Time</option>
        </select>
      </div>

      {/* High-level stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.map((metric) => (
          <div key={metric.platform} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{metric.platform}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">{metric.followers.toLocaleString()}</span>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +{(metric.engagementRate * 1.2).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-500">
               <span>{metric.postsLast30Days} posts</span>
               <span>{metric.engagementRate}% eng. rate</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Total Audience Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="followers" stroke="#4F46E5" strokeWidth={3} activeDot={{ r: 8 }} name="Followers" />
                <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={3} name="Interactions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement by Platform */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Engagement by Platform (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="platform" type="category" width={100} axisLine={false} tickLine={false} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="engagementRate" fill="#818CF8" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
         <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5" /> AI Growth Recommendations
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
               <h4 className="font-semibold mb-2 text-indigo-100">Best Time to Post</h4>
               <p className="text-2xl font-bold">Wed, 6:00 PM</p>
               <p className="text-xs text-indigo-200 mt-1">Based on last 30 days activity</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
               <h4 className="font-semibold mb-2 text-indigo-100">Top Content Format</h4>
               <p className="text-2xl font-bold">Short Video</p>
               <p className="text-xs text-indigo-200 mt-1">Generate 40% more engagement</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
               <h4 className="font-semibold mb-2 text-indigo-100">Trending Hashtag</h4>
               <p className="text-2xl font-bold">#FutureTech</p>
               <p className="text-xs text-indigo-200 mt-1">Relevance score: 98/100</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;