const SearchList = ({ value }) => {
  return (
        <div>
          {value.map((item) => {
            return <div style={{color:'#0C090A', paddingTop: '7px'}}>{item}</div>;
          })}
        </div>
  );
};

export default SearchList;
