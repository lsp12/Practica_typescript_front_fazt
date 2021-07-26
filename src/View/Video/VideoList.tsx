import React, { useEffect, useState } from "react";
import { IVideos } from "../../Interface/Interface";
import { getVideos } from "../../Services/ServicesApi";
import VideosItems from '../../components/VideosItems/VideosItems'


const Video = () => {
  const [videos, setVideos] = useState <IVideos[]> ([]);

  const loadVideos = async () => {
    const videos = await getVideos ();

    const OrdenVideos= videos.data.map(video=>{
      return {...video,
        published_at: video.published_at ? new Date(video.published_at) : new Date()
      }
    }).sort((a,b)=>b.published_at.getTime())
      
    setVideos(OrdenVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => (
        <VideosItems key={video.id} video={video} LoadVideo={loadVideos}/>
      ))}
    </div>
  );
};

export default Video;
