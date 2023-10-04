import { useRouter } from 'next/router';

const Category = () => {
  const {
    query: { id },
  } = useRouter();

  return <h1>Category Page {id}</h1>;
};

export default Category;
