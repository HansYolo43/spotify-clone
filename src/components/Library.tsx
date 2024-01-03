"use client";

import { TbPlaylist } from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";

const Library = () => {

    const onClick = () => {
    }

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
                gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="
                    text-neutral-400
                    font-medium
                    text-md">
                        Playlists
                    </p>
                </div>
                <AiOutlinePlus
                    onCLick={onClick}
                    size={20}
                    className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition"
                >

                </AiOutlinePlus>
            </div>
            <div className="
            flex
            flex-col
            gap-y-2
            mt-2
            px-3
            ">
                List on Songs
            </div>
        </div>
    )
}

export default Library;