import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { validPassword } from "../../../utils/credentials";
import { issueJWT } from "../../../utils/auth";

const prisma = new PrismaClient();
const userRouter = Router();

// Define the login route handler
const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: `Could not find user with email ${email}`,
      });
      return; // Ensure function exits after sending a response
    }

    // Validate password
    const isValidPassword = validPassword(password, user.hash, user.salt);

    if (isValidPassword) {
      const { token, expires } = issueJWT(user);
      res.status(200).json({
        success: true,
        user: { email: user.email },
        token,
        expiresIn: expires,
      });
    } else {
      res.status(401).json({
        error: {
          message: "Wrong password",
        },
      });
    }
  },
);

// Use the defined route handler in the router
userRouter.post("/login", login);

export default userRouter;
