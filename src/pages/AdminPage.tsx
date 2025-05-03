import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Film, Star, Trash, Check, X, Edit, Plus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useMediaStore } from '../store/mediaStore';
import { useReviewStore } from '../store/reviewStore';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('media');
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useAuthStore();
  const { allMedia } = useMediaStore();
  const { mediaReviews } = useReviewStore();
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Redirecting...
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <ShieldCheck className="mr-3 text-purple-500" size={28} />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('media')}
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'media'
                ? 'border-b-2 border-purple-500 text-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Film size={16} className="mr-2" />
              Media Library
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'reviews'
                ? 'border-b-2 border-purple-500 text-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Star size={16} className="mr-2" />
              Reviews
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'users'
                ? 'border-b-2 border-purple-500 text-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              Users
            </div>
          </button>
        </div>
        
        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {activeTab === 'media' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Media Library</h2>
                <Button size="sm" leftIcon={<Plus size={16} />}>
                  Add New Media
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Pricing
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {allMedia.map((media) => (
                      <tr key={media.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={media.poster} 
                              alt={media.title}
                              className="h-10 w-auto rounded mr-3"
                            />
                            <div>
                              <div className="font-medium">{media.title}</div>
                              <div className="text-xs text-gray-400">
                                {media.genres.slice(0, 2).join(', ')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            media.type === 'movie'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {media.type === 'movie' ? 'Movie' : 'Series'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {media.releaseYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{media.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>
                            {media.buyPrice && (
                              <div>Buy: ${media.buyPrice}</div>
                            )}
                            {media.rentPrice && (
                              <div>Rent: ${media.rentPrice}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            leftIcon={<Edit size={14} />}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            leftIcon={<Trash size={14} />}
                            className="text-red-500 hover:text-red-400"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Review Management</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Media
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {/* Mock reviews - in a real app, we'd have an API endpoint for pending reviews */}
                    {[...reviews, {
                      id: 'pending-1',
                      userId: '2',
                      userName: 'Jane Smith',
                      userAvatar: 'https://i.pravatar.cc/150?img=5',
                      mediaId: '3',
                      rating: 6,
                      content: 'While it has its moments, I found the pacing to be off and some of the plot points were predictable.',
                      hasSpoilers: false,
                      tags: ['predictable', 'slow-paced'],
                      likes: 0,
                      createdAt: '2023-04-25T14:30:00Z',
                      isApproved: false
                    }].map((review) => {
                      const media = allMedia.find(m => m.id === review.mediaId);
                      
                      return (
                        <tr key={review.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img 
                                src={review.userAvatar || 'https://i.pravatar.cc/150?img=1'} 
                                alt={review.userName}
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <span>{review.userName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {media ? media.title : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{review.rating}/10</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm line-clamp-2">
                              {review.hasSpoilers && (
                                <span className="bg-red-900 text-red-100 text-xs px-1.5 py-0.5 rounded mr-1">
                                  SPOILER
                                </span>
                              )}
                              {review.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              review.isApproved
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {review.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            {!review.isApproved ? (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                leftIcon={<Check size={14} />}
                                className="text-green-500 hover:text-green-400 mr-2"
                              >
                                Approve
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                leftIcon={<X size={14} />}
                                className="text-yellow-500 hover:text-yellow-400 mr-2"
                              >
                                Unpublish
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              leftIcon={<Trash size={14} />}
                              className="text-red-500 hover:text-red-400"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={user.avatar || 'https://i.pravatar.cc/150?img=1'} 
                              alt={user.name}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            leftIcon={<Edit size={14} />}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            leftIcon={<Trash size={14} />}
                            className="text-red-500 hover:text-red-400"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;