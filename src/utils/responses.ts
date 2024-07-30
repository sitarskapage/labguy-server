import { Response } from "express";

export function successResponse(res: Response, data: object) {
  res.status(200).json(data);
}

export const badRequestResponse = (res: Response, message: string) => {
  res.status(400).json({ error: { message } });
};
