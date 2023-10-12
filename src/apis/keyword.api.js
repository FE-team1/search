import axios from "axios";

const getKeyword = async () => {
  const res = await axios.get("http://localhost:3000/products");
  console.log(res.data);
  return res.data;
};

export default getKeyword;
