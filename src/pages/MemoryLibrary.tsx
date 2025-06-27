import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Play, 
  Heart, 
  Calendar, 
  Tag,
  Clock,
  Video,
  Download,
  Share,
  Star
} from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

const MemoryLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState<any>(null);
  const [likedMemories, setLikedMemories] = useState<Set<number>>(new Set());

  const memories = [
    {
      id: 1,
      title: "Wedding Day with Sarah",
      date: "June 15, 1982",
      emotion: "joyful",
      duration: "2:34",
      thumbnail: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "A beautiful memory of our wedding day, with grandmother's emotional speech.",
      tags: ["wedding", "family", "celebration"],
      rating: 5,
      views: 23
    },
    {
      id: 2,
      title: "Fishing Trip with Dad",
      date: "August 12, 1987",
      emotion: "nostalgic",
      duration: "3:12",
      thumbnail: "https://images.pexels.com/photos/1001665/pexels-photo-1001665.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "My first successful fishing trip where I caught a salmon with dad's help.",
      tags: ["fishing", "father", "outdoor"],
      rating: 4,
      views: 18
    },
    {
      id: 3,
      title: "Birthday Celebration",
      date: "March 22, 1990",
      emotion: "peaceful",
      duration: "1:45",
      thumbnail: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "A quiet birthday celebration with close family and homemade cake.",
      tags: ["birthday", "family", "cake"],
      rating: 4,
      views: 15
    },
    {
      id: 4,
      title: "Christmas Morning",
      date: "December 25, 1985",
      emotion: "joyful",
      duration: "4:20",
      thumbnail: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "Opening presents under the tree with the whole family gathered around.",
      tags: ["christmas", "family", "presents"],
      rating: 5,
      views: 31
    },
    {
      id: 5,
      title: "Garden with Mom",
      date: "May 8, 1988",
      emotion: "peaceful",
      duration: "2:15",
      thumbnail: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "Planting flowers in the backyard garden, learning about different varieties.",
      tags: ["garden", "mother", "flowers"],
      rating: 4,
      views: 12
    },
    {
      id: 6,
      title: "School Graduation",
      date: "June 10, 1995",
      emotion: "nostalgic",
      duration: "3:45",
      thumbnail: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "Walking across the stage to receive my diploma, family cheering in the audience.",
      tags: ["graduation", "school", "achievement"],
      rating: 5,
      views: 27
    }
  ];

  const emotions = [
    { value: 'all', label: 'All Emotions', color: 'bg-secondary-100 text-secondary-700' },
    { value: 'joyful', label: 'Joyful', color: 'bg-success-100 text-success-700' },
    { value: 'nostalgic', label: 'Nostalgic', color: 'bg-primary-100 text-primary-700' },
    { value: 'peaceful', label: 'Peaceful', color: 'bg-secondary-100 text-secondary-700' }
  ];

  const years = ['all', '2024', '1995', '1990', '1988', '1987', '1985', '1982'];

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'joyful': return 'bg-success-100 text-success-700';
      case 'nostalgic': return 'bg-primary-100 text-primary-700';
      case 'peaceful': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEmotion = selectedEmotion === 'all' || memory.emotion === selectedEmotion;
    
    const matchesYear = selectedYear === 'all' || memory.date.includes(selectedYear);
    
    return matchesSearch && matchesEmotion && matchesYear;
  });

  const handlePlayMemory = (memory: any) => {
    setSelectedMemory(memory);
  };

  const handleLikeMemory = (memoryId: number) => {
    setLikedMemories(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(memoryId)) {
        newLiked.delete(memoryId);
      } else {
        newLiked.add(memoryId);
      }
      return newLiked;
    });
  };

  const handleShareMemory = (memory: any) => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${memory.title} - ${window.location.href}`);
      alert('Memory link copied to clipboard!');
    }
  };

  const handleDownloadMemory = (memory: any) => {
    // Create a temporary link to download the video
    const link = document.createElement('a');
    link.href = memory.videoUrl;
    link.download = `${memory.title}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">Memory Library</h1>
        <p className="text-secondary-600">
          Browse and relive your precious memories. Each video is personalized with AI-generated narration.
        </p>
      </motion.div>

      {/* Video Player Modal */}
      {selectedMemory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMemory(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-cream-200">
              <h2 className="text-xl font-bold text-secondary-800">{selectedMemory.title}</h2>
              <p className="text-secondary-600">{selectedMemory.date}</p>
            </div>
            
            <div className="flex-1 bg-black">
              <VideoPlayer
                src={selectedMemory.videoUrl}
                title={selectedMemory.title}
                poster={selectedMemory.thumbnail}
                className="w-full h-96"
              />
            </div>
            
            <div className="p-4">
              <p className="text-secondary-700 mb-4">{selectedMemory.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.tags.map((tag: string) => (
                    <span key={tag} className="bg-cream-100 text-secondary-600 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search memories, tags, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Emotion Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-secondary-500" />
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="border border-cream-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {emotions.map(emotion => (
                <option key={emotion.value} value={emotion.value}>
                  {emotion.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-secondary-500" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-cream-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-secondary-600">
          Showing {filteredMemories.length} of {memories.length} memories
        </div>
      </div>

      {/* Memory Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={memory.thumbnail}
                alt={memory.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={() => handlePlayMemory(memory)}
                  className="bg-white bg-opacity-90 text-primary-600 p-3 rounded-full hover:bg-opacity-100 transition-all duration-200"
                >
                  <Play className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {memory.duration}
              </div>
              <div className="absolute top-3 left-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEmotionColor(memory.emotion)}`}>
                  {memory.emotion}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors duration-200">
                  {memory.title}
                </h3>
                <div className="flex items-center text-warning-500">
                  {[...Array(memory.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                {memory.description}
              </p>

              <div className="flex items-center text-sm text-secondary-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {memory.date}
                <span className="ml-4 flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  {memory.views} views
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {memory.tags.map(tag => (
                  <span key={tag} className="bg-cream-100 text-secondary-600 px-2 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => handlePlayMemory(memory)}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center text-sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Memory
                </button>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleLikeMemory(memory.id)}
                    className={`p-2 transition-colors duration-200 ${
                      likedMemories.has(memory.id) 
                        ? 'text-error-500 hover:text-error-600' 
                        : 'text-secondary-400 hover:text-secondary-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedMemories.has(memory.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => handleShareMemory(memory)}
                    className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
                  >
                    <Share className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDownloadMemory(memory)}
                    className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMemories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <Search className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-600 mb-2">No memories found</h3>
          <p className="text-secondary-500 mb-6">
            Try adjusting your search terms or filters to find more memories.
          </p>
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200">
            Create New Memory
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryLibrary;