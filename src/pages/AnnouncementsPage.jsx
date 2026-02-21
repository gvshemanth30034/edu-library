import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const announcements = [
    { date: '28 May 2024', message: 'New semester study materials uploaded for all departments' },
    { date: '25 May 2024', message: 'Database maintenance scheduled for Saturday 3AM-6AM' },
    { date: '22 May 2024', message: 'Request feature now available for suggesting new resources' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Announcements</h1>
          <p className="text-blue-100 text-lg">Stay updated with the latest library news and updates</p>
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
          <div className="announcements-list space-y-6">
            {announcements.length > 0 ? (
              announcements.map((announcement, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-blue-600 bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 mb-2">{announcement.date}</p>
                      <p className="text-gray-700 leading-relaxed">{announcement.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No announcements at this time</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
