export interface Post {
  title: string;
  tags: string;
  text: string;
  image: any;
}


export interface CreatePostInput {
  topic: string;
  socialMedia: "instagram" | "facebook" | "twitter";
  size: "small" | "medium" | "large";
  style: string;
  tags?: boolean;
  additionals?: string;
}
