"use client";

import { useState, useEffect } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import MultiUploadModal from "@/components/MutliModal";

const ModalProvider = () => {
    const [isMounted, setisMounted] = useState(false);
    
    useEffect(() => {
        setisMounted(true);
    },[]);
    
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />

            <MultiUploadModal />
        </>
    );
}

export default ModalProvider;