import { Shield, Star, MapPin, User } from 'lucide-react';

const ReviewCard = ({ location, title, review, createdAt, username, rating = 5 }) => (
  <div className="bg-gradient-to-br from-purple-800/60 to-pink-700/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
    {/* Location and Rating Header */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <div className="bg-purple-900/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
          <MapPin className="h-4 w-4 text-yellow-300" />
          <span className="text-sm text-yellow-300">{location}</span>
        </div>
      </div>
      
      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-purple-300'}`}
          />
        ))}
      </div>
    </div>

    {/* Review Content */}
    <div className="space-y-3 mb-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-purple-200 leading-relaxed">{review}</p>
    </div>

    {/* Footer with User and Date */}
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-2">
          {username?.charAt(0) || 'A'}
        </div>
        <div>
          <div className="text-white font-medium">{username || 'Anonymous'}</div>
          <div className="text-xs text-purple-300">Shakti Shield User</div>
        </div>
      </div>
      
      <div className="text-xs text-purple-300">
        {new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </div>
    </div>
  </div>
);

export default ReviewCard;