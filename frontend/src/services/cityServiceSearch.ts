import axios from "axios";
import type { City } from "../types/city";

export const BASE_URL = "http://localhost:8000/api/cities";

interface CitiesHttpResponse {
  cities: City[];
  total_pages: number;
}

async function fetchCities(
  query: string,
  page: number
): Promise<CitiesHttpResponse> {
  const response = await axios.get<CitiesHttpResponse>(BASE_URL, {
    params: { search: query, page: page },
  });
  return response.data;
}

export default fetchCities;

// GET /api/cities?search=ber&page=1
