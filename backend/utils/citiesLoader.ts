import fs from "fs/promises";
import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  uuid: string;
  cityName: string;
  count: number;
}

const CitySchema = new Schema<ICity>({
  uuid: { type: String, required: true, unique: true },
  cityName: { type: String, required: true },
  count: { type: Number, required: true },
});

export const City = mongoose.model<ICity>("City", CitySchema);

export const loadCitiesFromFile = async (filePath: string): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const cities = JSON.parse(data);

    if (!Array.isArray(cities)) {
      throw new Error("Parsed data is not an array");
    }

    await City.insertMany(cities);
    console.log("Cities loaded into DB");
  } catch (error) {
    console.error("Failed to load cities:", error);
  }
};

export const loadCitiesFromFileWithCheck = async (
  filePath: string
): Promise<void> => {
  try {
    const existing = await City.findOne();
    if (!existing) {
      await loadCitiesFromFile(filePath);
    } else {
      console.log("Cities already exist in DB, skipping insert");
    }
  } catch (error) {
    console.error("Failed to check or load cities:", error);
  }
};
