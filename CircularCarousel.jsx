import { useEffect, useState } from "react";
import "./carousel-gallery.css";

/**
 * items: [{ title, subtitle, image }]
 */
export default function CircularCarousel({
  items = [],
  title = "Explore the collection",
  autoPlay = false,
  interval = 3500,
}) {
  const [active, setActive] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (!autoPlay || count < 2) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % count),
      interval
    );
    return () => window.clearInterval(timer);
  }, [autoPlay, count, interval]);

  const move = (step) => {
    if (count) setActive((current) => (current + step + count) % count);
  };

  if (!count) return null;

  return (
    <section className="cg-section cg-circular" aria-label={title}>
      <header className="cg-heading">
        <div>
          <span className="cg-eyebrow">CURATED FOR YOU</span>
          <h2>{title}</h2>
        </div>
        <div className="cg-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next">→</button>
        </div>
      </header>

      <div className="cg-orbit-stage">
        <div className="cg-orbit cg-orbit-one" />
        <div className="cg-orbit cg-orbit-two" />
        {[-2, -1, 0, 1, 2].map((offset) => {
          const index = (active + offset + count) % count;
          const item = items[index];
          const isActive = offset === 0;
          return (
            <button
              type="button"
              key={`${index}-${offset}`}
              className={`cg-orbit-card ${isActive ? "is-active" : ""}`}
              style={{
                "--cg-x": `${offset * 145}px`,
                "--cg-scale": isActive ? 1 : Math.max(0.68, 0.92 - Math.abs(offset) * 0.1),
                "--cg-opacity": isActive ? 1 : Math.max(0.35, 0.85 - Math.abs(offset) * 0.2),
                zIndex: 10 - Math.abs(offset),
              }}
              onClick={() => setActive(index)}
              aria-label={`Show ${item.title || "item"}`}
            >
              <img src={item.image} alt={item.title || "Carousel item"} />
              {isActive && (
                <span className="cg-orbit-caption">
                  <strong>{item.title}</strong>
                  {item.subtitle && <small>{item.subtitle}</small>}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="cg-pagination">
        {items.map((item, index) => (
          <button
            type="button"
            key={`${item.title || "item"}-${index}`}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
