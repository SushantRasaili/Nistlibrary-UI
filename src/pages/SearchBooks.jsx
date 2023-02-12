import axios from "axios";
import "./pagesStyles.css";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { useState,useEffect } from "react";

const SearchBooks =() => {

    const fetchBooks = async() => {
        try {
            const res = await axios.get("http://localhost:5000/searchBooks?search="+"");
            if(res) {
                setBookDatas(res.data)
            }
           
            else
            console.log("Sorry can't fetch the books details");
                }
                catch(err) {
                    console.log(err);
                }
    }

    useEffect(()=> {
         fetchBooks();
    },[]);

    const [bookDatas,setBookDatas] = useState(
        []
    );

    
    const handleChange = async (e) => {
       
        try {
    const res = await axios.get(`http://localhost:5000/searchBooks?search=${e.target.value}`);
    if(res) {
        console.log(res.data);
        setBookDatas(res.data)
    }
   
    else
    alert("No such books found");
        }
        catch(err) {
            console.log(err);
        }

    }

    return(
   <div className="searchBooksContainer">

<h3 className="searchTitle">Please enter the book name you are searching for</h3>
<div className="searchDiv">
<SearchBar name="searchBooks" onChange={handleChange} />
{/* <input type="text" className="searchBox" 
name="searchBooks" 
placeholder="Search here...."
onChange={handleChange} /> */}
<FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} size="1x" />
</div>
<h4 className="tableTitle">Book Lists</h4>
<table className="table">
<thead className="tableHead">
<th className="tableHeadItem">Book Name</th>
<th className="tableHeadItem">Publications</th>
<th className="tableHeadItem">Pages</th>
<th className="tableHeadItem">Available</th>
<th className="tableHeadItem">Operations</th>
</thead>

<tbody>
    {
        bookDatas.slice(0,15).map((data) => {
            return(
<tr  className="tableBody" key={data._id}>
<td className="tableBodyItem">{data.bookname}</td>
<td className="tableBodyItem">{data.publication}</td>
<td className="tableBodyItem">{data.pages}</td>
<td className="tableBodyItem"> {data.available} </td>
<td className="tableBodyItem"> <Link className="addDel" 
to="/addOrDeleteBooks">Add or Delete </Link></td>
</tr>
            )

        })
    }

{/* 
<tr  className="tableBody">
<td className="tableBodyItem">Advanced Java</td>
<td className="tableBodyItem">Kriti</td>
<td className="tableBodyItem">590 </td>
<td className="tableBodyItem"> 30 </td>
<td className="tableBodyItem"> 
<Link className="addDel" 
to="/addOrDeleteBooks">Add or Delete </Link>
</td>
</tr> */}

</tbody>


</table>
   </div>
    );
}

export default SearchBooks;