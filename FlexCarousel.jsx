import { useRef } from "react";
import "./carousel-gallery.css";

/**
 * items: [{ title, subtitle, image, price, badge }]
 */
export default function FlexCarousel({
  items = [],
  title = "Trending now",
  description = "Discover pieces selected for everyday living.",
}) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction * Math.max(260, trackRef.current.clientWidth * 0.75),
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <section className="cg-section cg-flex-carousel" aria-label={title}>
      <header className="cg-heading">
        <div>
          <span className="cg-eyebrow">THE MORROW EDIT</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cg-controls">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
        </div>
      </header>

      <div className="cg-flex-track" ref={trackRef}>
        {items.map((item, index) => (
          <article className="cg-product-card" key={`${item.title || "product"}-${index}`}>
            <div className="cg-product-image">
              {item.badge && <span className="cg-product-badge">{item.badge}</span>}
              <img src={item.image} alt={item.title || "Product"} loading="lazy" />
            </div>
            <div className="cg-product-copy">
              <div>
                <h3>{item.title}</h3>
                {item.subtitle && <p>{item.subtitle}</p>}
              </div>
              {item.price && <strong>{item.price}</strong>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
