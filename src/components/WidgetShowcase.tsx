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
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-slate-200 shadow-lg">
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <img
          src="./images/screens/widget-bg.png"
          alt="Интерфейс МИС ЕЦП"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === current ? 1 : 0, pointerEvents: index === current ? 'auto' : 'none' }}
            >
              <img
                src={src}
                alt={`Виджет ${index + 1}`}
                className="max-w-[85%] max-h-[80%] object-contain drop-shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
