import axios from "@/lib/axios";

export const createTodo = async () => {
  const { data } = await axios.get("/todoLists/2");
  return data;
};
