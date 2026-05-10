import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-transparent overflow-hidden flex items-center justify-center rounded-xl shadow-2xl" ref={ref}>
      <img 
        src={props.image} 
        alt={`Page ${props.number}`} 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = `https://via.placeholder.com/800x450/1e3a8a/ffffff?text=Page+${props.number}+Missing`;
        }}
      />
    </div>
  );
});

Page.displayName = 'Page';

export default function FlipbookViewer({ pages, onClose }) {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  if (!pages || pages.length === 0) return null;

  // In a single-page view (usePortrait=true), the last page is pages.length - 1
  const isLastPage = currentPage >= pages.length - 1;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="absolute -top-12 right-0 sm:-right-8 sm:-top-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close Flipbook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Previous Button */}
        {currentPage > 0 && (
          <button 
            className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 sm:bg-white/10 sm:hover:bg-white/20 text-white rounded-full p-2 sm:p-3 transition-colors z-50 backdrop-blur-sm"
            onClick={handlePrev}
            aria-label="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {!isLastPage && (
          <button 
            className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 sm:bg-white/10 sm:hover:bg-white/20 text-white rounded-full p-2 sm:p-3 transition-colors z-50 backdrop-blur-sm"
            onClick={handleNext}
            aria-label="Next Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="w-full flex-1 h-full min-h-[50vh] max-h-[80vh] flex items-center justify-center py-2 sm:py-8">
          <HTMLFlipBook 
            ref={flipBookRef}
            width={900} 
            height={500} 
            size="stretch"
            minWidth={300}
            maxWidth={1200}
            minHeight={200}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="flipbook-container mx-auto"
            usePortrait={true} // Single page view to maximize space for wide banners
            onFlip={onFlip}
          >
            {pages.map((imgUrl, index) => (
              <Page key={index} image={imgUrl} number={index + 1} />
            ))}
          </HTMLFlipBook>
        </div>
        
        <div className="absolute -bottom-8 sm:-bottom-10 text-white/50 text-xs sm:text-sm pointer-events-none text-center w-full">
          Use arrows, swipe, or click corners to turn pages
        </div>
      </div>
    </div>
  );
}
