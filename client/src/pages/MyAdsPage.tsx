import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../store/useUser';
import { useNavigate, Link } from 'react-router-dom';
import AdCard from '../components/AdCard';

interface UserPost {
  ID: number;
  Name: string;
  Price: string;
  imageUrl: string | null;
  CreatedDate: string;
  location: string;
}

const MyAdsPage: React.FC = () => {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: userLoading, status } = useUser();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // 1. Check user authentication status ONCE on component mount.
  useEffect(() => {
    status();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once.

  // 2. This effect handles redirection or data fetching after the auth check.
  useEffect(() => {
    if (!userLoading) { // Wait until the initial auth check is done.
      if (user) {
        // User is logged in, fetch their posts.
        setPostsLoading(true);
        axios.get<UserPost[]>(`${apiUrl}/api/products/mine`, { withCredentials: true })
          .then(response => {
            setPosts(response.data);
            setError(null);
          })
          .catch(err => {
            setError('Failed to fetch your ads. Please try again later.');
            console.error(err);
          })
          .finally(() => {
            setPostsLoading(false);
          });
      } else {
        // Auth check is done, but there's no user. Redirect.
        navigate('/login');
      }
    }
  }, [user, userLoading, navigate, apiUrl]);

  // 3. Handle loading states.
  if (userLoading || (postsLoading && user)) {
    return <div className="text-center p-10">Loading...</div>;
  }
  
  // If we reach here and there's no user, it means the redirect is happening.
  if (!user) {
    return null;
  }
  
  // 4. Handle error state.
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // 5. Render the page content.
  return (
    <div className="flex justify-center">
        <div className="w-6xl mt-1.5 p-4">
            <h1 className="text-3xl font-bold mb-6 border-b pb-4">My Ads</h1>
            {posts.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600">You haven't posted any ads yet.</p>
                <Link to="/post" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                    Post Your First Ad
                </Link>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {posts.map(post => (
                <AdCard
                    key={post.ID}
                    title={post.Name}
                    Price={Number(post.Price)}
                    imgUrl={post.imageUrl ? `${apiUrl}/uploads/products/${post.imageUrl}` : '/profile/user-icon.webp'}
                    createdDate={post.CreatedDate}
                    location={post.location}
                />
                ))}
            </div>
            )}
        </div>
    </div>
  );
};

export default MyAdsPage;