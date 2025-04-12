import express from "express";
import auth from "../middleware/auth.js";
import { Url } from "../models/Url.js";
import shortid from "shortid";
const router = express.Router();
router.post("/", auth, async (req, res) => {
  console.log("Create URL route hit", process.env.BACKEND_URL);
  try {
    const { longUrl, customAlias, expiresAt } = req.body;
    const shortId = customAlias || shortid.generate();
    if (customAlias) {
      const existingUrl = await Url.findOne({ shortId });
      if (existingUrl) {
        return res.status(400).json({ message: "Custom alias already in use" });
      }
    }

    // Create new URL
    const url = new Url({
      userId: req.user.id,
      longUrl,
      shortId,
      customAlias: customAlias || null,
      expiresAt: expiresAt || null,
    });

    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all URLs for a user
router.get("/", auth, async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
