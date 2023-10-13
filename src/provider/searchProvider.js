import { createContext, useContext, useEffect, useState } from "react";
import DataRepository from "../repository/DataRepository";

const SearchContext = createContext();
export const useData = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([DataRepository.getData()]);

  // useEffect(() => {
  //   const data = DataRepository.getData();
  //   if (data) {
  //     setSearchData(data);
  //     console.log("searchData는?", data);
  //   }
  // }, []);

  return <SearchContext.Provider value={[searchData, setSearchData]}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
