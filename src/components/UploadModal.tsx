"use client "

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import  uniqid  from "uniqid";


import Button from "./Button";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";


const UploadModal = () => {
    const[isLoading , setisLoading] = useState(false);
    const UploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })


    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            UploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setisLoading(true);

            const imagefile = values.image?.[0];
            const songFile = values.song?.[0];

       
            console.log(songFile);

            if (!imagefile || !songFile || !user) {
                toast.error("Please select a image and a song");
                return;
            }

            const uniqueid = uniqid();

            const {
                data: songData,
                error: songError
            } = await supabaseClient.storage
                .from("Songs")
                .upload(`${values.title}-${uniqueid}.mp3`, songFile, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (songError) {
            setisLoading(false);
            return toast.error("Failed to upload song");
            }
            

            // Upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage
                .from("images")
                .upload(`${values.title}-${uniqueid}.png`, imagefile, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (imageError) {
            setisLoading(false);
            return toast.error("Failed to upload image"); 
            }

            const {
                error: supabaseError
            } = await supabaseClient.from("Songs").insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path
            });

            if(supabaseError) {
                setisLoading(false);
                return toast.error("Failed to upload song");
            }

            router.refresh();
            setisLoading(false);
            toast.success("Song uploaded successfully");
            reset();
            UploadModal.onClose();
            


            
        } catch (error) {
            
            toast.error(error.message);
        }finally {
            setisLoading(false);
        }
    }

    return (
        <Modal
            title="Upload a song"
            description="Upload your song to the cloud"
            isOpen = {UploadModal.isOpen}
            onChange={onChange}
        >
            <form
                
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >

                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song"
                />

                <Input
                    id="Song Author"
                    disabled={isLoading}
                    {...register('Song Author', { required: true })}
                    placeholder="Song Author"
                />
                <div>
                    <div className="pb-1">
                        Select a song
                    </div>
                    <Input
                        placeholder="test" 
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3*"
                    {...register('song', { required: true })}
                    />
                </div>
                <div
                    >
                    <div className="pb-1">
                        Select a image
                    </div>
                    <Input
                        placeholder="test" 
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept=".png*"
                    {...register('image', { required: true })}
                />
                </div>

                <Button disabled={isLoading} type="submit">
                    Upload
                </Button>
                    

            </form>
            
        </Modal>
    );
}

export default UploadModal