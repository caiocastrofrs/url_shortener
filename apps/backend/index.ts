import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

type Link = {
  url: String;
  slug: String;
};

const slugs: Link[] = [];

const generate_random_slug = () => {
  return Math.floor(Math.random() * 100);
};

app.post("/shorten", (req: Request, res: Response, next: NextFunction) => {
  const link_to_shorten = req.body.url;
  let random_slug = generate_random_slug();

  slugs.push({ url: link_to_shorten, slug: String(random_slug) });
  res.send(`http://localhost:3000/link/${random_slug}`);
});

app.get("/link/:slug", (req: Request, res: Response, next: NextFunction) => {
  const correct_slug = slugs.find(
    (slug) => slug.slug == req.params.slug.slice(0, 2),
  );

  if (correct_slug) res.redirect(correct_slug.url as string);

  res.send("cant process");
});

app.listen(PORT, () => {
  console.log(`init server on ${PORT}`);
});
