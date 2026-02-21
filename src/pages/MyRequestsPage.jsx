import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MY_REQUESTS_DATA } from '../data/studentResourcesData';

export const MyRequestsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const filteredRequests = useMemo(() => {
    return MY_REQUESTS_DATA.filter((request) => {
      const matchesSearch =
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || request.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Requests</h1>
          <p className="text-blue-100 text-lg">Track your submitted resource requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-sm text-teal-600 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="uiExtension-filterSection mb-8">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search your requests..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="uiExtension-searchInput w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            <div className="uiExtension-categoryFilter flex flex-wrap gap-2 mb-6">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`uiExtension-categoryBtn px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredRequests.length}</span> request
              {filteredRequests.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <RequestItem key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">No requests found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RequestItem = ({ request }) => {
  const statusStyle =
    request.status === 'Approved'
      ? 'bg-green-100 text-green-700'
      : request.status === 'Pending'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';

  return (
    <div className="border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
              {request.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{request.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {request.category}
            </span>
            <span>Submitted: {request.submittedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
