interface YouTubeEmbedProps {
  videoId: string;
  width?: number | string;
  height?: number | string;
}

export default function YouTubeEmbed({
  videoId,
  width = 560,
  height = 315,
}: YouTubeEmbedProps) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-video-container" style={{ maxWidth: `${width}px` }}>
      <iframe
        width={width}
        height={height}
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
