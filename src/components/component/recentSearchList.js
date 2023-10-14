import DataRepository from "../../repository/DataRepository";

const RecentSearchList = ({ value, data }) => {
  return (
    value.length &&
    data.map((item) => {
      return <div>{item}</div>;
    })
  );
};

export default RecentSearchList;
