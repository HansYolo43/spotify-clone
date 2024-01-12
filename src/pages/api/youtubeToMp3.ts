// // src/pages/api/youtubeToMp3.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createClient } from '@supabase/supabase-js';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { youtubeLink } = req.body;

//   if (!youtubeLink) {
//     return res.status(400).json({ error: 'No YouTube link provided' });
//   }

//   try {
//     // Fetch the MP3 download link from RapidAPI
//     const mp3Response = await fetch(`https://youtube-to-mp3-download.p.rapidapi.com/mp3/${encodeURIComponent(youtubeLink)}`, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': process.env.RAPIDAPI_KEY,
//         'x-rapidapi-host': 'youtube-to-mp3-download.p.rapidapi.com'
//       }
//     });

//     if (!mp3Response.ok) {
//       throw new Error('Failed to convert YouTube video to MP3');
//     }

//     const mp3Data = await mp3Response.json();
//       const mp3Link = mp3Data.link; // Ensure this matches the API response structure for the MP3 link
      
      

//     // Initialize Supabase client
//     const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//     // Upload MP3 to Supabase
//     const fileName = `songs/${Date.now()}.mp3`;
//     const { data, error } = await supabase.storage.from('songs').upload(fileName, await fetch(mp3Link).then(r => r.blob()), {
//       cacheControl: '3600',
//       upsert: false
//     });

//     if (error) {
//       throw error;
//     }

//     // Respond with the URL to the uploaded MP3
//     const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
//     return res.status(200).json({ fileUrl });
    
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// }
