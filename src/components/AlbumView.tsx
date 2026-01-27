import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Sparkles } from 'lucide-react';
import { ALBUM_PHOTOS, type AlbumPhoto } from '@/data/album';
import { getAssetPath } from '@/lib/assets';
import PhotoModal from './PhotoModal';

const AlbumView = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const openPhoto = (photo: AlbumPhoto, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
    setSelectedIndex(-1);
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedPhoto(ALBUM_PHOTOS[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (selectedIndex < ALBUM_PHOTOS.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedPhoto(ALBUM_PHOTOS[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              Álbum Histórico
              <Sparkles className="h-4 w-4 text-accent" />
            </h1>
            <p className="text-sm text-muted-foreground">
              Logroño 1915–1925 · {ALBUM_PHOTOS.length} fotos
            </p>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="p-4 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {ALBUM_PHOTOS.map((photo, index) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openPhoto(photo, index)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={getAssetPath(photo.src)}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-semibold text-sm truncate">
                {photo.title}
              </h3>
              {photo.year && (
                <span className="flex items-center gap-1 text-white/80 text-xs mt-1">
                  <Calendar className="h-3 w-3" />
                  {photo.year}
                </span>
              )}
            </div>
            
            {/* Year badge (always visible) */}
            {photo.year && (
              <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                {photo.year}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        onClose={closePhoto}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={selectedIndex > 0}
        hasNext={selectedIndex < ALBUM_PHOTOS.length - 1}
      />
    </div>
  );
};

export default AlbumView;
