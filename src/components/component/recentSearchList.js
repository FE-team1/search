const RecentSearchList = ({ value, dataList }) => {
  return (
    value === "검색어를 입력해주세요." &&
    dataList.map((data) => {
      return <div>{data}</div>;
    })
  );
};

export default RecentSearchList;
