import axios from "axios";

const getRecentKeyword = async (item, value, setValue) => {
  try {
    const res = await axios.get(`http://localhost:3000/search?key=${item}`);
    setValue(res.data);
    return value;
  } catch (err) {
    setValue(err.response.data);
    return value;
  }
};

export default getRecentKeyword;
