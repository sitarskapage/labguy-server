import expressAsyncHandler from "express-async-handler";
import { MediaController } from "./MediaController";
import { successResponse } from "../utils/responses";
import { Request, Response } from "express";
import { prisma } from "../prismaclient";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { ThreedRef } from "@prisma/client";
import { getAllFilesSize } from "../utils/helpers";

interface ModelFile extends Express.Multer.File {
  destination: string;
  filename: string;
}

export class ThreedController extends MediaController {
  private validateModelFile(files: Express.Multer.File[]): ModelFile {
    const modelFile = files.find((file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      return ext === ".gltf" || ext === ".glb";
    }) as ModelFile;

    if (!modelFile) {
      throw new Error(
        `No .gltf or .glb file found in: ${files.map((f) => f.originalname).join(", ")}`
      );
    }

    return modelFile;
  }

  private async createMediaEntry(
    modelFile: ModelFile,
    host: string
  ): Promise<ThreedRef> {
    const filePath = path.resolve(modelFile.destination, modelFile.filename);
    const fileBuffer = await fs.readFile(filePath);
    const etag = crypto.createHash("md5").update(fileBuffer).digest("hex");
    const extension = path.extname(modelFile.filename).toLowerCase();
    const public_id = path.parse(modelFile.filename).name;
    const filename = modelFile.filename;
    const url = `${host}/uploads/models/${public_id}/${modelFile.filename}`;
    const bytes = await getAllFilesSize(modelFile.destination);

    return {
      etag,
      public_id,
      path: filePath,
      mediaType: "THREE_D",
      filename,
      extension,
      bytes,
      url,
    };
  }

  upload = expressAsyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const host = `${req.protocol}://${req.get("host")}`;

    try {
      const modelFile = this.validateModelFile(files);
      const mediaEntry = await this.createMediaEntry(modelFile, host);

      const result = await prisma.threedRef.upsert({
        where: { etag: mediaEntry.etag },
        create: mediaEntry,
        update: mediaEntry,
      });

      return successResponse(res, result);
    } catch (error) {
      // Cleanup uploaded files on error
      await Promise.all(
        files.map((file) =>
          fs.unlink(path.resolve(file.destination, file.filename)).catch(() => {
            /* ignore cleanup errors */
          })
        )
      );
      throw error;
    }
  });
}
