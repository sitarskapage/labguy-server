import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export class Controller {
  service;

  constructor(service: any) {
    this.service = service;
  }

  //READ
  get = asyncHandler(async (req: Request, res: Response) => {
    const entries = await this.service.findMany();
    res.status(200).json(entries);
  });

  //CREATE
  create = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;
    const newEntry = await this.service.create({ data: reqBody });

    res.status(201).json(newEntry);
  });

  //UPDATE SINGLE
  update = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const updatedItem: { [key: string]: unknown } = req.body;

    const updated = await this.service.update({
      where: { id },
      data: updatedItem,
    });

    res.status(200).json(updated);
  });

  //DELETE SINGLE
  delete = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const deleted = await this.service.delete({
      where: { id },
    });

    res.status(200).json(deleted);
  });

  //DELETE MANY
  deleteMany = asyncHandler(async (req: Request, res: Response) => {
    const ids: number[] = req.body.ids;

    const deleted = await this.service.deleteMany({
      where: { id: { in: ids } },
    });

    res.status(200).json(deleted);
  });

  //UPDATE MANY
  updateMany = asyncHandler(async (req: Request, res: Response) => {
    const updates: { id: number; data: { [key: string]: unknown } }[] =
      req.body.updates;

    const updatedItems = await Promise.all(
      updates.map((update) =>
        this.service.update({
          where: { id: update.id },
          data: update.data,
        }),
      ),
    );

    res.status(200).json(updatedItems);
  });

  //CREATE MANY
  createMany = asyncHandler(async (req: Request, res: Response) => {
    const newEntries = req.body.items;

    const createdEntries = await this.service.createMany({
      data: newEntries,
      skipDuplicates: true,
    });

    res.status(201).json(createdEntries);
  });
}
