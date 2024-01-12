"use client ";

import useMultiUploadModal from "@/hooks/useMultiUploadModal";
import Modal from "./Modal";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import uniqid from "uniqid";

import Button from "./Button";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useUploadModal from "@/hooks/useUploadModal";

const MultiUploadModal = () => {
  const [isLoading, setisLoading] = useState(false);
  const MultiUploadModal = useMultiUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const UploadModal = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      MultiUploadModal.onClose();
    }
  };

  const onUploadSubmit: SubmitHandler<FieldValues> = async (values) => {
    UploadModal.onOpen();
    MultiUploadModal.onClose();
    };
    

    const onSongUpload:any = async (link: String) => {
    }

    const onPlaylistUpload:any = async (link: String) => {
    }

  return (
    <Modal
      title="Upload a song"
      description="Upload your song to the cloud using"
      isOpen={MultiUploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-y-4"
      >
        <Button disabled={isLoading} type="submit" onClick={onUploadSubmit}>
          Upload a Song Using Mp3
        </Button>

        <Input
          id="Youtube link"
          disabled={isLoading}
          {...register("Youtube link", { required: true })}
          placeholder="Youtube link"
        />

        <Button disabled={isLoading} type="submit" onClick={onSongUpload}>
          Upload a Song Using Youtube
        </Button>

        <Input
          id="Playlist link"
          disabled={isLoading}
          {...register("Playlist link", { required: true })}
          placeholder="Playlist link"
        />

        <Button disabled={isLoading} type="submit" onClick={onPlaylistUpload}>
          Upload a Song Using Playlist
        </Button>
      </form>
    </Modal>
  );
};

export default MultiUploadModal;
