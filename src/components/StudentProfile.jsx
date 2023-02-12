import "./componentsCss.css";
// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";



const StudentProfile =({id,name,semester,roll,address,course}) => {


    // const [courses,setCourse] = useState("");
    // if(course=="BIM") {
    //     setCourse("bim");
    // }
    // else if(course=="csit")  {
    //     setCourse("csit");
    // }
    // else {
    //     setCourse("bca");
    // }

return(
<div className="studentProfileCard">
<img src="https://images.pexels.com/photos/13528086/
pexels-photo-13528086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="student"
className="studentImg" />
<div className="stream">
    <p>{course}</p>
</div>
  
<Link to={`/studentDetails/${id}?name=${name}&sem=${semester}&course=${course}`} style={{textDecoration:"none"}}>
<h3 className="studentName">{name}</h3>
        </Link>
<p className="studentSemester">Semester: {semester}, {roll}</p>
<div className="address">
    <FontAwesomeIcon className="addItem" icon={faLocationDot} />
    <h4 className="addItem">{address}</h4>
</div>
</div>
);
}

export default StudentProfile;