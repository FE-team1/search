import DataRepository from "../../repository/DataRepository";

const RecentSearchList = ({ value, data }) => {
  return (
    value === "검색어를 입력해주세요." &&
    data &&
    data.map((item) => {
      return <div>{item}</div>;
    })
  );
};

export default RecentSearchList;
