import { Router } from "express";

import {
  createShortenUrl,
  getClickCounter,
  redirectToOrigin,
} from "../controllers/urlController.ts";

const router = Router();

router.post("/shorten", createShortenUrl);
router.get("/redirect/:slug", redirectToOrigin);
router.get("/:slug", getClickCounter);

export default router;
