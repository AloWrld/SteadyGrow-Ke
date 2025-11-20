import React from 'react';
import { Facebook, Linkedin, Video, Youtube, CheckCircle, AlertCircle } from 'lucide-react';

const SocialSpeech: React.FC = () => {
  const accounts = [
    {
      platform: 'Facebook & Instagram',
      icon: <Facebook className="w-6 h-6" />,
      color: 'bg-blue-600',
      connected: true,
      username: 'Tech Startups Daily'
    },
    {
      platform: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'bg-blue-700',
      connected: true,
      username: 'John Doe'
    },
    {
      platform: 'TikTok for Business',
      icon: <Video className="w-6 h-6" />, // Lucide doesn't have TikTok, using Video generic
      color: 'bg-black',
      connected: false
    },
    {
      platform: 'YouTube',
      icon: <Youtube className="w-6 h-6" />,
      color: 'bg-red-600',
      connected: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Social Speech</h1>
        <p className="mt-1 text-gray-500">Connect your social accounts to enable automatic posting and analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div key={acc.platform} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${acc.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                {acc.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{acc.platform}</h3>
                <div className="flex items-center mt-1">
                  {acc.connected ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Connected as <span className="font-medium">{acc.username}</span></span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">Not connected</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-full sm:w-auto ${
                acc.connected 
                  ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                  : 'bg-primary text-white hover:bg-indigo-700 shadow-sm'
              }`}
            >
              {acc.connected ? 'Manage' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">Note regarding account limits</h4>
        <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
           <li>You can connect up to 3 accounts per platform on the Pro plan.</li>
           <li>Tokens for Facebook and LinkedIn need refreshing every 60 days.</li>
           <li>TikTok requires a Business Account.</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialSpeech;