import axios from "axios";
import type { City } from "../types/city";
import { BASE_URL } from "./cityServiceSearch";

async function patchCity(updatedCity: City) {
  const response = await axios.patch(
    `${BASE_URL}/${updatedCity.uuid}`,
    updatedCity
  );
  return response.data;
}

export default patchCity;
