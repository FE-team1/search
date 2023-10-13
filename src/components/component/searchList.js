const SearchList = ({ value }) => {
    return (
        <>
            {value.map((item) => {
                return <div>{item}</div>;
            })}
        </>
    );
};

export default SearchList;
