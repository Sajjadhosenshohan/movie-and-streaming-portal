import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, Star, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MediaCard from '../components/media/MediaCard';
import MediaGrid from '../components/media/MediaGrid';
import Button from '../components/ui/Button';
import { useMediaStore } from '../store/mediaStore';

const HomePage: React.FC = () => {
  const { 
    loadAllMedia, 
    getFeatured, 
    getNewReleases, 
    getEditorsPicks,
    isLoading 
  } = useMediaStore();
  
  useEffect(() => {
    loadAllMedia();
  }, [loadAllMedia]);
  
  const featuredMedia = getFeatured()[0]; // Get the first featured media
  const newReleases = getNewReleases();
  const editorsPicks = getEditorsPicks();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        {featuredMedia && (
          <section 
            className="relative h-[70vh] md:h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.7)), url(${featuredMedia.backdrop || featuredMedia.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            
            <div className="container mx-auto px-4 h-full flex items-end pb-16 md:pb-24 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  {featuredMedia.title}
                </h1>
                
                <div className="flex items-center mb-4 text-sm">
                  <div className="flex items-center text-yellow-400 mr-4">
                    <Star className="fill-yellow-400 mr-1" size={16} />
                    <span>{featuredMedia.rating}/10</span>
                  </div>
                  <span className="mr-4">{featuredMedia.releaseYear}</span>
                  <span className="mr-4">{featuredMedia.duration}</span>
                  <span>{featuredMedia.type === 'movie' ? 'Movie' : 'Series'}</span>
                </div>
                
                <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                  {featuredMedia.synopsis}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to={`/media/${featuredMedia.id}`}>
                    <Button 
                      size="lg" 
                      leftIcon={<Play size={20} className="ml-0.5" />}
                    >
                      Watch Now
                    </Button>
                  </Link>
                  
                  <Link to="/browse">
                    <Button 
                      variant="outline" 
                      size="lg"
                      leftIcon={<Search size={20} />}
                    >
                      Browse All
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
        
        <div className="container mx-auto px-4 py-12">
          {/* New Releases Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                <TrendingUp className="mr-2 text-purple-500" />
                New Releases
              </h2>
              <Link to="/browse?sort=latest" className="text-purple-500 hover:text-purple-400 transition-colors text-sm">
                View All
              </Link>
            </div>
            
            <MediaGrid 
              media={newReleases.slice(0, 4)} 
              isLoading={isLoading}
              emptyMessage="No new releases available at this time."
            />
          </section>
          
          {/* Editor's Picks Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                <Star className="mr-2 text-purple-500" />
                Editor's Picks
              </h2>
              <Link to="/browse?tag=editors-pick" className="text-purple-500 hover:text-purple-400 transition-colors text-sm">
                View All
              </Link>
            </div>
            
            <MediaGrid 
              media={editorsPicks.slice(0, 4)} 
              isLoading={isLoading}
              emptyMessage="No editor's picks available at this time."
            />
          </section>
          
          {/* Categories Showcase */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse by Genre</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Family'].map((genre) => (
                <Link 
                  key={genre}
                  to={`/browse?genre=${genre}`}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-center h-24 hover:bg-gray-700 transition-colors hover:shadow-lg hover:shadow-purple-900/20"
                >
                  <span className="text-lg font-medium">{genre}</span>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Subscription CTA */}
          <section className="mt-16 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Unlimited Movies & TV Shows
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Get access to exclusive content, early releases, and ad-free streaming.
            </p>
            <Button size="lg">
              Start Free Trial
            </Button>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;