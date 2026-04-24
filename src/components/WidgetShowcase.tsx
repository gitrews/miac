import { useState, useEffect } from 'react';

interface WidgetShowcaseProps {
  images: string[];
  interval?: number;
}

export default function WidgetShowcase({ images, interval = 3000 }: WidgetShowcaseProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl border border-slate-200 shadow-lg">
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {/* Full MIS background — clearly visible */}
        <img
          src="./images/screens/widget-bg.png"
          alt="Интерфейс МИС ЕЦП — врач продолжает работу"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Widget as small overlay — top right, like a notification */}
        <div className="absolute top-4 right-4 w-[38%] max-w-[420px]">
          {images.map((src, index) => (
            <div
              key={index}
              className="transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === current ? 1 : 0, pointerEvents: index === current ? 'auto' : 'none', position: index === current ? 'relative' : 'absolute' }}
            >
              <img
                src={src}
                alt={`Виджет ${index + 1}`}
                className="w-full h-auto object-contain drop-shadow-2xl rounded-lg"
              />
            </div>
          ))}
        </div>
        
        {/* Label showing it's an overlay */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
          Виджет поверх МИС — врач работает без переключения окон
        </div>
      </div>
      
      {/* Dot indicators */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-primary-600' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Виджет ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
