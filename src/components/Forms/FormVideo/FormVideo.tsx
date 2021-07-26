import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IParams, IVideos } from "../../../Interface/Interface";
import * as service from "../../../Services/ServicesApi";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";


const FormVideo = () => {
  type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  const initial = {id:"", title: "", url: "", description: "" };
  const [video, setVideo] = useState<IVideos>(initial);
  const param = useParams<IParams>();
  const history=useHistory()
  const getVideo =async(ids: string)=>{
    const res = await service.getVideo(ids);
    const { id,title,description,url } =res.data[0];
    
    setVideo({id,title, url, description});
    /* console.log(video)
    console.log(param) */
  }

  const handleInputChange = (event: InputChange) => {
    setVideo({ ...video, [event.target.name]: event.target.value });
  };

  useEffect(()=>{
    if (param.id) getVideo(param.id);
  }, [param.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!param.id){
      await service.postVideo(video);
      toast.success("Video guardado con exito");
    }else{
      const res =await service.updateVideo(param.id,video);
      console.log(res.data)
      toast.success("Video update success");
      history.push("/")
    }

    setVideo(initial);
    
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>new video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="write title the video"
                  onChange={handleInputChange}
                  autoFocus
                  //limpiar los inputs con el value
                  value={video.title}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  placeholder="https://somesite.com"
                  onChange={handleInputChange}
                  //limpiar los inputs con el value
                  value={video.url}
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  name="description"
                  rows={3}
                  placeholder="write a description"
                  onChange={handleInputChange}
                  //limpiar los inputs con el value
                  value={video.description}
                ></textarea>
              </div>
              {param.id ? (
                <button className="btn btn-dark">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVideo;
