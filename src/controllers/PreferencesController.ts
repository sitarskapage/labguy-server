import expressAsyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";

export default class PreferencesController extends Controller {
  constructor() {
    super("preferences");
  }
  get = expressAsyncHandler(async (req, res) => {
    const record = await prisma.preferences.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!record) {
      throw new Error("Record not found");
    }

    const response = record;

    successResponse(res, response);
  });

  update = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    // Clean up the data object
    delete data.background;
    delete data.id;
    delete data.videoRefEtag;
    delete data.imageRefEtag;

    // Prepare the update data object with conditional logic
    const updateQuery = data;

    // Perform the update operation
    const updated = await prisma.preferences.update({
      where: { id },
      data: updateQuery,
    });

    const response = updated;

    successResponse(res, response);
  });
}
