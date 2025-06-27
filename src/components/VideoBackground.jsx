function VideoBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      className="video-bg"
    >
      <source src="/videos/login.mp4" type="video/mp4" />
    </video>
  );
}

export default VideoBackground;
