import axios from "@/lib/axios";

export const createTodo = async () => {
  const { data } = await axios.post("/hello");
  return data;
};
