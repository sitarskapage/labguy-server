import { Response } from "express";

export function successResponse(res: Response, data: object) {
  res.status(200).json(data);
}

export const badRequestResponse = (res: Response, message: string) => {
  res.status(400).json({ error: { message } });
};

export const notFoundResponse = (res: Response, message: string) => {
  res.status(404).json({ error: { message } });
};
