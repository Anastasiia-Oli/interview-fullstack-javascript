import express from "express";
import { City } from "../utils/citiesLoader";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// GET /api/cities?search=ber&page=1
router.get("/", async (req, res) => {
  try {
    const search = req.query.search?.toString() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const regex = new RegExp("^" + search, "i");

    const total = await City.countDocuments({ cityName: { $regex: regex } });

    const cities = await City.find({ cityName: { $regex: regex } })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      total_pages: Math.ceil(total / limit),
      current_page: page,
      cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/cities
router.post("/", async (req, res) => {
  try {
    const { cityName, count } = req.body;

    if (!cityName || typeof count !== "number") {
      return res.status(400).json({ message: "Invalid data" });
    }

    const exists = await City.findOne({ cityName });
    if (exists) {
      return res
        .status(409)
        .json({ message: "City with this name already exists" });
    }

    const newCity = new City({ uuid: uuidv4(), cityName, count });
    await newCity.save();

    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/cities/:uuid
router.delete("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const deletedCity = await City.findOneAndDelete({ uuid });

    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted", deletedCity });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/cities/:uuid
router.patch("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { cityName, count } = req.body;

    // Check for the fields to update
    if (!cityName && typeof count !== "number") {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updateData: Partial<{ cityName: string; count: number }> = {};
    if (cityName) updateData.cityName = cityName;
    if (typeof count === "number") updateData.count = count;

    const updatedCity = await City.findOneAndUpdate(
      { uuid },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City updated", updatedCity });
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
