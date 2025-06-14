import axios from "axios";
import { BASE_URL } from "./cityServiceSearch";

async function deleteCity(uuid: string) {
  const response = await axios.delete(`${BASE_URL}/${uuid}`);
  return response.data;
}

export default deleteCity;
