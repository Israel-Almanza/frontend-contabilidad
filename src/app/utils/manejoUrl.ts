import { BASE_URL } from "../constans/contantes";

export const buildImageUrl = (
  value: any,
) => {

  return `${BASE_URL}${value}`;
};