// FeaturedVideo.tsx
import React from 'react';

const FeaturedVideo = () => {
  // Update youtubeVideoId with the actual YouTube video ID
  const youtubeVideoId = 'dQw4w9WgXcQ';
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <section id="featured" className="mb-5 mt-5 flex items-center">
      <div className="grid grid-cols-1 justify-center pl-3">
        <iframe
          width="320"
          height="180"
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className="p-2">
          *future home of the Featured Creator highlight video
        </p>
      </div>
    </section>
  );
};

export default FeaturedVideo;
