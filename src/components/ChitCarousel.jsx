import { useState, useRef, useEffect } from "react";

const carouselImages = [
  { id: 1, src: "/carousel/image1.jpg", alt: "40 Lakhs Chit Referral" },
  { id: 2, src: "/carousel/image2.jpg", alt: "20 Lakhs Chit Referral" },
  { id: 3, src: "/carousel/image3.jpg", alt: "10 Lakhs Chit Referral" },
  { id: 4, src: "/carousel/image4.jpg", alt: "5 Lakhs Chit Referral" },
];

// Triplicate the images to allow seamless infinite scrolling in both directions
const extendedImages = [...carouselImages, ...carouselImages, ...carouselImages];

export default function ChitCarousel() {
  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId;
    let lastTime = performance.now();
    const speed = 0.05; // pixels per millisecond

    const animate = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Only auto-scroll if not hovered and not manually dragging
      if (!isHovered.current && !isDragging.current) {
        carousel.scrollLeft += speed * deltaTime;
      }

      // Infinite loop boundary checks
      const children = carousel.children;
      if (children.length > 0) {
        let setWidth = 0;
        for (let i = 0; i < carouselImages.length; i++) {
          setWidth += children[i].offsetWidth + 24; // 24px is gap-6
        }

        // If scrolled past the second set, instantly jump back by one set width
        if (carousel.scrollLeft >= setWidth * 2) {
          carousel.scrollLeft -= setWidth;
          if (isDragging.current) scrollLeftStart.current -= setWidth;
        } 
        // If scrolled backwards before the first set, instantly jump forward
        else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += setWidth;
          if (isDragging.current) scrollLeftStart.current += setWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Set initial scroll position to the middle set
    setTimeout(() => {
      if (!carousel.children.length) return;
      let setWidth = 0;
      for (let i = 0; i < carouselImages.length; i++) {
        setWidth += carousel.children[i].offsetWidth + 24;
      }
      carousel.scrollLeft = setWidth;
    }, 100);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiply for slightly faster drag
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="w-full py-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Chit Referral Bonanza
        </h2>
        <p className="mt-2 text-slate-600 dark:text-neutral-400">
          Scroll to see our exclusive bumper bonanza offers
        </p>
      </div>

      {/* Draggable Auto-Scrolling Container */}
      <div 
        ref={carouselRef}
        className="flex w-full gap-6 overflow-x-auto hide-scrollbar pb-8 px-4 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => (isHovered.current = true)}
        onTouchEnd={() => (isHovered.current = false)}
      >
        {extendedImages.map((img, idx) => (
          <div 
            key={`${img.id}-${idx}`} 
            className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] overflow-hidden rounded-2xl shadow-md border border-slate-200 dark:border-neutral-800 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl select-none"
            onClick={() => {
              if (!isDragging.current) setSelectedImage(img);
            }}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-auto object-cover rounded-2xl pointer-events-none"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/800x600/1e3a8a/ffffff?text=${img.alt.replace(/ /g, '+')}`;
              }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-2xl flex items-center justify-center cursor-pointer">
              <span className="opacity-0 hover:opacity-100 bg-white/90 text-slate-900 px-4 py-2 rounded-full font-medium shadow-sm transition-opacity duration-300 pointer-events-none">
                Click to view
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Document Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/1200x800/1e3a8a/ffffff?text=${selectedImage.alt.replace(/ /g, '+')}`;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
