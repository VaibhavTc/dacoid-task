import express from "express";
import auth from "../middleware/auth.js";
import { ClickEvent } from "../models/Clickevent.js";
import { Url } from "../models/Url.js";

const router = express.Router();

router.get("/:urlId", auth, async (req, res) => {
  try {
    const { urlId } = req.params;

    const url = await Url.findOne({ _id: urlId, userId: req.user.id });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    const clickEvents = await ClickEvent.find({ urlId });

    const clicksByDate = {};
    const deviceBreakdown = {};
    const browserBreakdown = {};

    clickEvents.forEach((event) => {
      const date = new Date(event.timestamp).toISOString().split("T")[0];

      clicksByDate[date] = (clicksByDate[date] || 0) + 1;

      deviceBreakdown[event.device] = (deviceBreakdown[event.device] || 0) + 1;

      browserBreakdown[event.browser] =
        (browserBreakdown[event.browser] || 0) + 1;
    });

    res.json({
      url,
      totalClicks: clickEvents.length,
      clicksByDate,
      deviceBreakdown,
      browserBreakdown,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
