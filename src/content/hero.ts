// Background video for the home hero (earth on the right, headline on the left).
// Put the licensed, converted files in public/video/ (see README → "Hero video").
// Until they exist, the home page shows the animated globe (components/motion/hero-globe.tsx).
export const heroVideo = {
  sources: [
    { src: "/video/hero-earth.webm", type: "video/webm" },
    { src: "/video/hero-earth.mp4", type: "video/mp4" },
  ],
  poster: "/video/hero-earth-poster.webp",
};
