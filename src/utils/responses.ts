import { Response } from "express";

export function successResponse(res: Response, data: object) {
  res.status(200).json(data);
  return data;
}
