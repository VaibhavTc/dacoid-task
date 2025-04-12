import express from "express";
const router = express.Router();
import { Url } from "../models/Url.js";
import { ClickEvent } from "../models/Clickevent.js";
import useragent from "express-useragent";
const skipRoutes = ["dashboard", "login", "register", "profile"];
router.get("/:shortId", useragent.express(), async (req, res, next) => {
  const { shortId } = req.params;
  if (skipRoutes.includes(shortId)) {
    return next();
  }
  try {
    console.log("shortId", shortId);

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
      return res.status(410).json({ message: "URL has expired" });
    }

    url.clicks++;
    await url.save();

    const clickEvent = new ClickEvent({
      urlId: url._id,
      ip: req.ip,
      device: req.useragent.isMobile ? "Mobile" : "Desktop",
      browser: req.useragent.browser,
    });

    clickEvent
      .save()
      .catch((err) => console.error("Error saving click event:", err));

    return res.redirect(url.longUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
