import axios from "axios";
import { IVideos } from "../Interface/Interface";

const api = "http://localhost:4000/api/";

export const getVideos = async () => {
  return await axios.get<IVideos[]>(api + "get");
};

export const postVideo = async (video: IVideos) => {
  return await axios.post(api + "post", video);
};

export const getVideo = async (id: string) => {
  return await axios.get<IVideos[]>(api + "get/" + id);
};

export const updateVideo = async (id: string, video: IVideos) => {
  return await axios.put(api + "update/" + id, video);
};

export const deleteVideo = async (id: string) => {
  return await axios.delete(api + "delete/" + id);
}

