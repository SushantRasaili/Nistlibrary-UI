import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney,faBookOpenReader,
    faUser,faArrowUp,faCartPlus,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


export const SideBar =() => {

    return(
       <section className="sideBarContainer">
       <Link to="/" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faHouseChimney} size="3x"/>
        <h4 >Welcome Home</h4>
       </div>
       </Link>

<Link to="/searchBooks" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faBookOpenReader} size="3x"/>
        <h4>Search Books</h4>
       </div>
</Link>


<Link to="/searchStudents" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faUser} size="3x"/>
        <h4>Search Students</h4>
       </div>
</Link>



<Link to="/changeClass" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faArrowUp} size="3x"/>
        <h4>Change students class</h4>
       </div>
</Link>


       
<Link to="/addBooks" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faCartPlus} size="3x"/>
        <h4>Add Books</h4>
       </div>
</Link>

<Link to="/addStudents" style={{textDecoration:"none"}}>
       <div className="items">
       <FontAwesomeIcon icon={faUserPlus} size="3x"/>
        <h4>Add Students</h4>
       </div>
</Link>

       </section>

    )
}