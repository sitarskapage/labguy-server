import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { verifyToken } from "../middleware/auth";
import { issueJWT } from "../utils/auth";
import { validPassword, genPassword } from "../utils/credentials";
import { sendResetEmail } from "../utils/email";
import { prisma } from "../prismaclient";
import validator from "validator";
import { env } from "process";

const SignupController = {
  //LOGIN
  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate email
    validator.isEmail(email);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: { message: "User not found" } });
      return;
    }

    // Validate password
    try {
      validPassword(password, user.hash, user.salt);
    } catch (err) {
      res.status(401).json({ error: { message: (err as Error).message } });
    }

    const { token, expires } = issueJWT(user);

    res.status(200).json({
      success: true,
      user: { email: user.email },
      token,
      expiresIn: expires,
    });
  }),

  //FORGOT
  forgot: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    validator.isEmail(email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(200).json({});
      return;
    }

    // Generate a reset token
    let { token, expires } = issueJWT(user, 60000 * 15);

    token = token.slice(7);

    const ref = req.get("referer");

    const resetLink = `${ref}${env.DASHBOARD_ADMIN_PATH}/reset?token=${encodeURI(token)}`;

    const lastPreferences = await prisma.preferences.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Send reset link via email
    await sendResetEmail(resetLink, email, lastPreferences?.artists_name);

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      link: resetLink,
      expiresIn: expires,
    });
  }),

  //RESET
  reset: asyncHandler(async (req: Request, res: Response) => {
    let token = req.query.token as string;

    token = decodeURI(token);
    const { password } = req.body;

    if (!token) {
      res.status(400).json({ error: { message: "Reset token not found" } });
      return;
    }

    // Verify token
    const user = await verifyToken(token);

    if (!user) {
      res.status(404).json({ error: { message: "Invalid or expired token" } });
      return;
    }

    const { salt, hash } = genPassword(password);

    // Update the user's password
    await prisma.user.update({
      where: { email: user.email },
      data: {
        hash,
        salt,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  }),
};

export default SignupController;
