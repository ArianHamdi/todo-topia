import CircularProgressBar from "@/components/CircularProgressBar";
import { useCategories } from "@/hooks/api/todo";

const Home = () => {
  const { data } = useCategories();

  console.log("categories", data);

  return (
    <div>
      <CircularProgressBar percentage={50} stroke="yellowgreen" />
    </div>
  );
};

export default Home;
