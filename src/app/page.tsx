"use client";

import Image from "next/image";
import "./globals.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CircularProgress, Switch } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PaletteIcon from "@mui/icons-material/Palette";
import TagIcon from "@mui/icons-material/Tag";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import CachedIcon from "@mui/icons-material/Cached";
import { TextField } from "@/ui/TextField";
import { createPost } from "@/api/posts/posts";
import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";
import { POST_SIZE, SOCIAL_PLATFORM } from "@/constants/constants";
import { CreatePostInput, Post } from "@/types/post/post";
import { useRouter, useSearchParams } from "next/navigation";
import { notify } from "@/utils/alert";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isNewUser = searchParams.get("new_user");

    if (isNewUser) {
      notify({ text: "User successfully registered", type: "success" });
      router.replace("/", { scroll: false });
    }
  }, [searchParams]);

  const [post, setPost] = useState<Post | null>(null);
  const [postSettings, setPostSettings] = useState<CreatePostInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePostInput>({
    defaultValues: {
      tags: false,
    },
  });

  const generatePost = async (data: CreatePostInput) => {
    try {
      setIsLoading(true);
      const res = await createPost(data);

      setPost(res);
    } catch (err) {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<CreatePostInput> = async (data) => {
    setPostSettings(data);
    await generatePost(data);
  };

  const regeneratePost = async () => await generatePost(postSettings!);

  return (
    <>
      <h1 className="!text-4xl mb-5">Create Your AI-Powered Post</h1>
      <p className="mb-10">Generate text and images for any social platform with advanced customization</p>

      <div className="flex gap-10 justify-between relative">
        {isLoading ? (
          <div className="flex justify-center items-center w-full min-h-[400px]">
            <CircularProgress size={60} />
          </div>
        ) : post ? (
          <div className="max-w-[600px] flex flex-col gap-4">
            <div className="flex w-full flex-col border gap-5 pb-4">
              <Image src={post.image} className="w-full" width={400} height={400} alt="AI image" />
              <h2 className="!text-xl px-4">{post.title}</h2>

              <div className="flex flex-col gap-2 px-4">
                <span className="whitespace-pre-line">{post.text}</span>
                <span className="text-blue-400">{post.tags}</span>
              </div>
            </div>

            <div className="flex gap-5 w-full">
              <Button
                className="hover:bg-grey-200"
                label="Back to Settings"
                icon={<SettingsIcon color="primary" />}
                onClick={() => setPost(null)}
              />

              <Button
                className="hover:bg-grey-200"
                label="Regenerate Post"
                icon={<CachedIcon color="primary" />}
                onClick={regeneratePost}
              />
            </div>
          </div>
        ) : (
          <form className="w-[600px] flex flex-col gap-8 pb-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              placeholder="Enter your topic or idea..."
              icon={<TipsAndUpdatesIcon />}
              label="Topic or Idea"
              register={register}
              registerName="topic"
            />

            <TextField
              placeholder="Select social media platform"
              icon={<AutoAwesomeIcon />}
              label="Social Media Platform"
              selectList={SOCIAL_PLATFORM}
              defaultValue={SOCIAL_PLATFORM[0].value}
              register={register}
              registerName="socialMedia"
            />

            <TextField
              placeholder="Select Post Size"
              icon={<TipsAndUpdatesIcon />}
              label="Post Size"
              selectList={POST_SIZE}
              defaultValue={POST_SIZE[0].value}
              register={register}
              registerName="size"
            />

            <TextField
              placeholder="Creative, Funny, Interesting..."
              icon={<PaletteIcon />}
              label="Post Style"
              register={register}
              registerName="style"
            />

            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <TagIcon color="primary" />

                <div className="flex flex-col gap-1">
                  <span>Include Hashtags</span>
                  <span className="!text-sm text-secondary">Add relevant hashtags to your post</span>
                </div>
              </div>

              <Controller
                name="tags"
                control={control}
                render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
              />
            </div>

            <TextField
              placeholder="Add your additional instructions..."
              icon={<AddIcon />}
              label="Additional Instructions"
              register={register}
              registerName="additionals"
            />

            <Button
              label="Generate Post"
              className="hover:bg-gray-200 transition-colors duration-300"
              type="submit"
              disabled={isLoading}
              icon={<TipsAndUpdatesIcon color="primary" />}
            />
          </form>
        )}

        <div className="h-fit sticky top-26 hidden lg:block min-w-[400px]">
          <Image src="/colorfull-bg.png" width={400} height={400} alt="AI image" />
        </div>
      </div>
    </>
  );
}
