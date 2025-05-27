import express from "express";
import { authenticateUser } from "../middlewares/validateTokenHandler.js";
import { longUrl, redirectToOriginalUrl, deleteUrl, getAllLinksForLoggedInUser } from "../controllers/linkControllers.js";

const router = express.Router();

// POST to create a short URL
router.post("/shorten", authenticateUser, longUrl);

// GET to redirect using short URL 
router.get("/:shortUrl", redirectToOriginalUrl); 

// delete short url 
router.delete("/delete-url/:_id", authenticateUser, deleteUrl);


// Example: Verify this middleware runs before your route
router.get("/api/links", authenticateUser, getAllLinksForLoggedInUser);

export default router;
