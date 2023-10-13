import DataRepository from "../../repository/DataRepository";

const RecentSearchList = ({ value, dataList }) => {
  const localStorageDataList = DataRepository.getData();
  console.log(localStorageDataList);
  return (
    value === "검색어를 입력해주세요." &&
    dataList.map((data) => {
      return <div>{data}</div>;
    })
  );
};

export default RecentSearchList;
