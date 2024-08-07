import { env } from "process";

export async function getYoutubeData(video_id: string) {
  const api_key = env.YT_API_KEY;
  if (!api_key) throw new Error("no yt api key found");
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?&key=${api_key}&part=snippet,contentDetails&id=${video_id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video data: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      throw new Error("No data available for this video ID");
    }

    return data.items[0];
  } catch (error) {
    throw error;
  }
}
