import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";
import { Prisma } from "@prisma/client";

// Type to lowercase the first letter of a string
type LowercaseFirstLetter<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : S;

// LowercaseModelName ensures that the first letter of Prisma.ModelName is lowercase
// This is necessary because Prisma.ModelName's start with a capital letter, but we need lowercase names to use with Prisma client.
type LowercaseModelName = LowercaseFirstLetter<Prisma.ModelName>;

export class Controller {
  delegate: any;

  constructor(model: LowercaseModelName) {
    this.delegate = prisma[model];
  }

  //UPSERT
  upsert = asyncHandler(async (req: Request, res: Response) => {
    const newRecord = await this.delegate.upsert({
      where: {
        id: req.body.id,
      },
      create: req.body,
      update: req.body,
    });

    res.status(201).json(newRecord);

    return newRecord;
  });

  //READ
  get = asyncHandler(async (req: Request, res: Response) => {
    const records = await this.delegate.findMany();
    res.status(200).json(records);
  });

  //CREATE
  create = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = req.body;
    const newRecord = await this.delegate.create({ data: reqBody });

    res.status(201).json(newRecord);
  });

  //UPDATE SINGLE
  update = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const updatedItem: { [key: string]: unknown } = req.body;

    const updated = await this.delegate.update({
      where: { id: id },
      data: updatedItem,
    });

    res.status(200).json(updated);
  });

  //DELETE SINGLE
  delete = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const deleted = await this.delegate.delete({
      where: { id: id },
    });

    res.status(200).json(deleted);
  });

  //DELETE MANY
  deleteMany = asyncHandler(async (req: Request, res: Response) => {
    const ids: number[] = req.body.ids;

    const deleted = await this.delegate.deleteMany({
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
        this.delegate.update({
          where: { id: update.id },
          data: update.data,
        }),
      ),
    );

    res.status(200).json(updatedItems);
  });

  //CREATE MANY
  createMany = asyncHandler(async (req: Request, res: Response) => {
    const newrecords = req.body.items;

    const createdrecords = await this.delegate.createMany({
      data: newrecords,
      skipDuplicates: true,
    });

    res.status(201).json(createdrecords);
  });
}
