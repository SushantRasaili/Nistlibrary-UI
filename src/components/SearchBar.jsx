
const SearchBar =(props) => {

    return(
        <input type="text" className="searchBox" 
        name={props.name} 
        placeholder="Search here..."
        onChange={props.onChange} />
    );
}

export default SearchBar;