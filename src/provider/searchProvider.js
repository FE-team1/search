import { createContext, useContext, useState } from "react";
import DataRepository from "../repository/DataRepository";

const SearchContext = createContext();
export const useData = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([DataRepository.getData()]);

  return <SearchContext.Provider value={[searchData, setSearchData]}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
