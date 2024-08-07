import expressAsyncHandler from "express-async-handler";
import { MediaController } from "./MediaController";
import { badRequestResponse, successResponse } from "../utils/responses";
import getYouTubeID from "get-youtube-id";
import { getYoutubeData } from "../utils/getYoutubeData";
import { Request, Response } from "express";
import { prisma } from "../prismaclient";

async function getVideoData(req: Request, res: Response): Promise<any> {
  const { youtube_url, soundcloud_url, vimeo_url } = req.body;
  let videoData;

  switch (true) {
    case !!youtube_url: {
      const video_id = getYouTubeID(youtube_url);
      if (!video_id) {
        badRequestResponse(res, "Invalid YouTube URL");
        return;
      }
      videoData = await getYoutubeData(video_id);
      break;
    }
    case !!soundcloud_url: {
      throw new Error("SoundCloud data fetching not implemented");
    }
    case !!vimeo_url: {
      throw new Error("Vimeo data fetching not implemented");
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

  upsert = expressAsyncHandler(async (req: Request, res: Response) => {
    const videoData = await getVideoData(req, res);

    const reference = {
      etag: videoData.etag,
      id: videoData.id,
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
