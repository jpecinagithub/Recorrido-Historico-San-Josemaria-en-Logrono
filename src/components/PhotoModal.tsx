import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/assets';
import type { AlbumPhoto } from '@/data/album';

interface PhotoModalProps {
  photo: AlbumPhoto | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const PhotoModal = ({ 
  photo, 
  onClose, 
  onPrevious, 
  onNext,
  hasPrevious = false,
  hasNext = false 
}: PhotoModalProps) => {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {/* Previous button */}
          {hasPrevious && onPrevious && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
          
          {/* Next button */}
          {hasNext && onNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}
          
          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-muted">
              <img
                src={getAssetPath(photo.src)}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-bold text-foreground">
                  {photo.title}
                </h2>
                {photo.year && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground shrink-0 bg-secondary px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4" />
                    {photo.year}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {photo.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoModal;
