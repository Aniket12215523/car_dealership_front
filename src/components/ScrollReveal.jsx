import { useEffect, useRef } from 'react';

function ScrollReveal({ children, threshold = 0.2, animationClass = 'reveal-visible', enabled = true }) {
  const ref = useRef();

  useEffect(() => {
    if (!enabled) return; // Don't observe if disabled (during preloader)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animationClass, threshold, enabled]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

export default ScrollReveal;
