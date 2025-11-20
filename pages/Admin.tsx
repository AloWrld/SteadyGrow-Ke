import React from 'react';
import { Users, Shield, Activity, Search } from 'lucide-react';

const Admin: React.FC = () => {
  // Mock user data
  const users = [
    { id: 1, name: 'Alice Freeman', email: 'alice@example.com', plan: 'Pro', status: 'Active', joined: '2023-09-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@tech.co', plan: 'Free', status: 'Active', joined: '2023-10-01' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@studio.io', plan: 'Pro', status: 'Suspended', joined: '2023-08-20' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        Admin Panel
      </h1>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,240</p>
               </div>
               <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                  <Users className="w-6 h-6" />
               </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-gray-500">Active Automations</p>
                  <p className="text-2xl font-bold text-gray-900">3,850</p>
               </div>
               <div className="p-3 bg-green-100 rounded-full text-green-600">
                  <Activity className="w-6 h-6" />
               </div>
            </div>
         </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
           <h2 className="font-medium text-gray-900">User Management</h2>
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-indigo-900 mr-4">Edit</a>
                    <a href="#" className="text-red-600 hover:text-red-900">Disable</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;