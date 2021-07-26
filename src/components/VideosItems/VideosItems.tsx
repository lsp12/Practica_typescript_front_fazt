import React from "react";
import { IVideos } from "../../Interface/Interface";
import ReactPlayer from "react-player";
import  '../../App.css'
import { useHistory } from "react-router-dom";
import { deleteVideo } from "../../Services/ServicesApi";

interface Props {
  video: IVideos;
  LoadVideo: () => void;
}

const VideosItems = ({ video, LoadVideo }: Props) => {
  const history = useHistory();
  const handleDelete = async (id:string)=>{
    await deleteVideo(id)
    LoadVideo();
  }
      
  return (
    <div className="col-md-4">
      <div className="card video-card">
        <div key={video.id} className="card-body">
          <div className="d-flex justify-content-between">
            <h3 onClick={()=>history.push('/Update/'+video.id)} >{video.title}</h3>
            <span onClick={()=>video.id && handleDelete(video.id)} className="text-danger">X</span>
          </div>
          <p>{video.description}</p>
          <div className="ratio ratio-16x9">
            <ReactPlayer url={video.url} playing={false} width="100%" height="100%"/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosItems;
