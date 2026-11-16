import { useEffect, useState } from "react";
import "./carousel-gallery.css";

/**
 * images: [{ src, title, category, alt }]
 */
export default function Gallery({
  images = [],
  title = "A closer look",
  columns = 3,
}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  if (!images.length) return null;

  return (
    <section className="cg-section cg-gallery" aria-label={title}>
      <header className="cg-heading">
        <div>
          <span className="cg-eyebrow">VISUAL JOURNAL</span>
          <h2>{title}</h2>
        </div>
        <span className="cg-image-count">{String(images.length).padStart(2, "0")} IMAGES</span>
      </header>

      <div
        className="cg-gallery-grid"
        style={{ "--gallery-columns": Math.min(4, Math.max(1, columns)) }}
      >
        {images.map((image, index) => (
          <button
            type="button"
            className={`cg-gallery-item ${index % 5 === 0 ? "cg-gallery-tall" : ""}`}
            key={`${image.src}-${index}`}
            onClick={() => setSelected(image)}
            aria-label={`Open ${image.title || `image ${index + 1}`}`}
          >
            <img
              src={image.src}
              alt={image.alt || image.title || "Gallery image"}
              loading="lazy"
            />
            <span className="cg-gallery-overlay">
              {image.category && <small>{image.category}</small>}
              {image.title && <strong>{image.title}</strong>}
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="cg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title || "Image preview"}
          onClick={() => setSelected(null)}
        >
          <button
            className="cg-lightbox-close"
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close preview"
          >
            ×
          </button>
          <img
            src={selected.src}
            alt={selected.alt || selected.title || "Gallery preview"}
            onClick={(event) => event.stopPropagation()}
          />
          {selected.title && <p>{selected.title}</p>}
        </div>
      )}
    </section>
  );
}
