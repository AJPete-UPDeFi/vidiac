// FeaturedVideo.tsx
import React from "react";

const FeaturedVideo = () => {
    // Update youtubeVideoId with the actual YouTube video ID
    const youtubeVideoId = "dQw4w9WgXcQ";
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

    return (
        <section id="featured" className="flex items-center mt-5 mb-5">
            <div className="pl-3 justify-center grid grid-cols-1">
                <iframe
                    width="320"
                    height="180"
                    src={youtubeUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
                <p className="p-2">*future home of the Featured Creator highlight video</p>
            </div>
        </section>
    );
};

export default FeaturedVideo;