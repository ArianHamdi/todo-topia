import axios from "@/lib/axios";

export const getCategories = async () => {
  const { data } = (await axios.get("/category")).data;
  return data;
};
