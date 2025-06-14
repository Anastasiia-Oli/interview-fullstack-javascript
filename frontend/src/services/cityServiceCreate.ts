import axios from "axios";
import { BASE_URL } from "./cityServiceSearch";

async function postCity(cityName: string, count: number) {
  const response = await axios.post(BASE_URL, {
    cityName,
    count,
  });
  return response.data;
}

export default postCity;
