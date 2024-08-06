import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateSlug } from "../utils/generateSlug";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import { Controller, LowercaseModelName } from "./Controller";

export abstract class ProjectWorkController extends Controller {
  delegate: any;

  constructor(model: LowercaseModelName) {
    super(model);
    this.delegate = prisma[model];
  }

  abstract createData(req: Request): any;
  abstract updateData(req: Request): any;

  get = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.delegate.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    successResponse(res, items);
  });

  getOne = asyncHandler(async (req, res) => {
    const id: number = parseInt(req.params.id, 10);

    const records = await this.delegate.findUnique({
      where: { id: id },
      include: { general: true },
    });
    successResponse(res, records);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.createData(req);

    const createdRecord = await this.delegate.create({
      data,
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });

    successResponse(res, createdRecord);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);
    delete req.body.id;
    delete req.body.generalId;

    const updateData = this.updateData(req);

    const updatedRecord = await this.delegate.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });

    successResponse(res, updatedRecord);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);

    const deleted = await this.delegate.delete({
      where: { id: postId },
    });

    successResponse(res, deleted);
  });
}
