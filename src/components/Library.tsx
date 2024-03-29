"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useMultiUploadModal from "@/hooks/useMultiUploadModal";


const Library = () => {

    const { user } = useUser();
    const multiUploadModal = useMultiUploadModal();
    const uploadModal = useUploadModal();
    const authModal = useAuthModal();

    
    const onClick = () => {
      if (!user) {
        console.log("user not logged in", user);
        authModal.onOpen();
      } else {

        return multiUploadModal.onOpen();

        // return uploadModal.onOpen();
      }
  };

  return (
    <div className="flex flex-col">
      <div
        className="
                flex
                items-center
                justify-between
                px-4
                pt-5
                "
      >
        <div
          className="
                inline-flex
                items-center
                gap-x-2"
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="
                    text-neutral-400
                    font-medium
                    text-md"
          >
            Playlists
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition"
        ></AiOutlinePlus>
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-2
            px-3
            "
      >
        List on Songs
      </div>
    </div>
  );
};

export default Library;
