import { CreatePostInput, Post } from "@/types/post/post";
import { endpoints } from "../endpoints";
import axiosInstance from "@/utils/axios";

export const createPost = async (data: CreatePostInput): Promise<Post> => {
  try {
    const res = await axiosInstance.post<Post>(endpoints.createPost, data);

    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export interface UserPost {
  id: number;
  createAt: string;
  image: string;
  title: string;
  text: string;
  tags: string | null;
  isPublished: boolean;
  platform: string;
}

export const getPostById = async (id: string | number): Promise<Post> => {
  try {
    const res = await axiosInstance.get<Post>(endpoints.getPostById(id));

    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const getPosts = async (): Promise<UserPost[]> => {
  try {
    
    const res = await axiosInstance.get<UserPost[]>(endpoints.getPosts);

    return res.data;
  } catch (error) {
    throw new Error();
  }
};
