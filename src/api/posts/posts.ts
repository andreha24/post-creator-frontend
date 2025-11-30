import { CreatePostInput, Post } from "@/types/post/post";
import { endpoints } from "../endpoints";
import axios from "axios";

export const createPost = async (data: CreatePostInput): Promise<Post> => {
  try {
    const res = await axios.post<Post>(endpoints.createPost, data);

    return res.data;
  } catch (error) {
    throw new Error();
  }
};
