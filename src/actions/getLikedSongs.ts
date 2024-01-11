import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  // Fetch the session
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData.session) {
    console.error("Session error:", sessionError);
    return [];
  }

  // Fetch liked songs
  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, Songs(*)')
    .eq('user_id', sessionData.session.user?.id)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error("Error fetching liked songs:", error);
    return [];
  }

  // Map and return the data
  return data.map(item => item.Songs || {});
};

export default getLikedSongs;
