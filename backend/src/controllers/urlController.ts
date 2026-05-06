import type { Request, Response, NextFunction } from "express";
import { urls } from "../models/url.ts";

function generate_random_slug() {
  return Math.floor(Math.random() * 100);
}

function checkIfURLIsValid(url: string) {
  return !!url.includes("https://");
}

// shorten the url and save in in-memory storage
export const createShortenUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const link_to_shorten = String(req.params.url);
    let random_slug = generate_random_slug();

    urls.push({
      url: link_to_shorten,
      slug: String(random_slug),
      click_count: 0,
    });

    res.send({ url: `http://localhost:3000/api/url/redirect/${random_slug}` });
  } catch (error) {
    next(error);
  }
};

// redirect if requested slug exist
export const redirectToOrigin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const correct_slug = urls.find((url) => url.slug == req.params.slug);

    if (correct_slug) {
      correct_slug.click_count++;
    }

    if (correct_slug && checkIfURLIsValid("https://" + correct_slug.url)) {
      res.redirect("https://" + correct_slug.url);
    }
    // if (correct_slug) res.redirect(correct_slug?.url);
    return;
  } catch (error) {
    next(error);
  }
};

export const getClickCounter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const correct_slug = urls.find((url) => url.slug == req.params.slug);

    if (correct_slug) {
      res.send({ count: correct_slug.click_count });
    }
    res.status(404);
    res.send({ message: "Shorten not found" });
  } catch (error) {
    next(error);
  }
};
