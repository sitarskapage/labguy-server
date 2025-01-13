import expressAsyncHandler from "express-async-handler";
import { MediaController } from "./MediaController";
import { badRequestResponse, successResponse } from "../utils/responses";
import getYouTubeID from "get-youtube-id";
import { Request, Response } from "express";
import { prisma } from "../prismaclient";
import { env } from "process";

async function fetchData(endpoint: string) {
  try {
    const response = await fetch(endpoint);

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

async function getVideoData(req: Request, res: Response): Promise<any> {
  const { youtube_url, soundcloud_url, vimeo_url } = req.body;
  let videoData;

  switch (true) {
    case !!youtube_url: {
      const yt_api_key = env.YT_API_KEY;
      if (!yt_api_key) throw new Error("no yt api key found");

      const video_id = getYouTubeID(youtube_url);
      const ytEndpoint = `https://www.googleapis.com/youtube/v3/videos?&key=${yt_api_key}&part=snippet,contentDetails&id=${video_id}`;

      if (!video_id) {
        badRequestResponse(res, "Invalid YouTube URL");
        return;
      }

      videoData = await fetchData(ytEndpoint);
      break;
    }
    case !!vimeo_url: {
      throw new Error("Vimeo data fetching not implemented");
    }
    case !!soundcloud_url: {
      throw new Error("SoundCloud data fetching not implemented");
    }
    default:
      badRequestResponse(res, "No valid URL provided");
      return;
  }

  return videoData;
}

export class VideoController extends MediaController {
  constructor() {
    super("videoRef");
  }
  get = expressAsyncHandler(async (req, res) => {
    const videoArray = await prisma.videoRef.findMany();

    successResponse(res, videoArray);
  });

  upsert = expressAsyncHandler(async (req: Request, res: Response) => {
    const videoData = await getVideoData(req, res);

    const reference = {
      etag: videoData.etag,
      public_id: videoData.id,
      yt_url: req.body.youtube_url,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      thumbnail: videoData.snippet.thumbnails.high.url,
      duration: videoData.contentDetails.duration,
      definition: videoData.contentDetails.definition,
    };

    const mediaRef = await prisma.videoRef.upsert({
      where: { etag: reference.etag },
      update: reference,
      create: reference,
    });

    successResponse(res, mediaRef);
  });
}
