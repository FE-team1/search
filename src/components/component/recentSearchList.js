import DataRepository from "../../repository/DataRepository";

const RecentSearchList = ({ value }) => {
  const localStorageDataList = JSON.parse(DataRepository.getData());
  console.log(localStorageDataList);
  return (
    value === "검색어를 입력해주세요." &&
    localStorageDataList &&
    localStorageDataList.map((data) => {
      return <div>{data}</div>;
    })
  );
};

export default RecentSearchList;
