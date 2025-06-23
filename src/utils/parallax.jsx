export function setupParallax() {
  const carSection = document.querySelector(".car-section");

  if (!carSection) return;

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.4;
    carSection.style.backgroundPositionY = `-${offset}px`;
  });
}
