'use client'


import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";


import Modal from "./Modal"
import useAuthModal from "@/hooks/useAuthModal";


const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);
    
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    

    return(
    <Modal
        title="Welcome back"
        description="Sign in to your account to continue"
        isOpen = {isOpen}
        onChange= {onChange}
    >
            <Auth
                theme="dark"
                providers={['github', 'google']}
                magicLink
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e',
                            }
                    }
                }
                }} />
    </Modal>
    )
}

export default AuthModal;