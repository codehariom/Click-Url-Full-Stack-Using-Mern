import expressAsyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import { Url } from "../models/urlModel.js"; 
import { User }from "../models/userModel.js"

export const longUrl = expressAsyncHandler(async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    try {
      new URL(original_url);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ error: "Unauthorized: Username missing" });
    }

    // Find the user document
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique short URL
    let short_url;
    let exists;
    do {
      short_url = nanoid(5);
      exists = await Url.findOne({ short_url });
    } while (exists);

    // Save the new short URL
    const newUrl = new Url({
      userId: user.id, 
      original_url,
      short_url,
      click: 0
    });

    await newUrl.save();

    return res.status(200).json({
      message: "Short URL created successfully",
      short_url: `${req.protocol}://${req.get("host")}/${short_url}`,
      original_url,
      click: newUrl.click,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



//  short url to long url redirected to original url 

export const redirectToOriginalUrl = expressAsyncHandler(async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const foundUrl = await Url.findOne({ short_url: shortUrl });

    if (foundUrl) {
      foundUrl.click++;
      await foundUrl.save();
      return res.redirect(foundUrl.original_url);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all url details 
export const getAllLinksForLoggedInUser = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Debug: Print the user ID being searched
    // console.log("Searching for user ID:", req.user._id);

    const userLinks = await Url.find({ userId: req.user._id });

    // Debug: Print raw results from DB
    // console.log("Raw DB results:", userLinks);

    if (!userLinks || userLinks.length === 0) {
      return res.status(200).json({ links: [] }); // Return empty array instead of error
    }

    const formattedLinks = userLinks.map((link, index) => ({
      _id: link._id,
      sr_no: index + 1,
      original_url: link.original_url,
      short_url: `${req.protocol}:/${req.get("host")}/${link.short_url}`,
      click: link.click,
      date: link.createdAt.toISOString().split("T")[0],
    }));

    return res.status(200).json({ links: formattedLinks });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// delete short url from database 
export const deleteUrl = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted = await Url.findByIdAndDelete(_id);

    if (deleted) {
      return res.status(200).json({ message: "URL deleted successfully" });
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
});




