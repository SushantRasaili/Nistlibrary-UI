import axios from "axios";
import { useState,useEffect } from "react";
import SearchBar from "../components/SearchBar";
import StudentProfile from "../components/StudentProfile";


const SearchStds =() => {

   const fetchStds = async() => {
    try {
        const res = await axios.get("http://localhost:5000/searchStudents?search="+"");
        if(res) {
            setStdDatas(res.data);
        }
        else 
           console.log("Sorry can't fetch the students details");
    }
    catch(err) {
        console.log(err);
    }
   }

    useEffect(()=> {
        fetchStds();
    },[]);

    const [stdDatas,setStdDatas] = useState([]);


    const handleChange = async (e) => {

    try {
        const res = await axios.get(`http://localhost:5000/searchStudents?search=${e.target.value}`);
        if(res) {
            setStdDatas(res.data);

        }
        else 
        alert("No students with that name exist");
    }
    catch(err) {
        console.log(err);
    }



    }

    return(
   <div className="searchStudentsContainer">

<h3 style={{marginBottom:"10px"}}>Search Students here</h3>
<SearchBar name="searchStudents" onChange={handleChange} />

<div className="studentsCards">


{stdDatas.slice(0,15).map((student) => {
    return (
<StudentProfile key={student._id}  
id={student._id}
 name={student.name} semester={student.semester}
 roll={student.roll}
 address={student.address} course={student.course}/>
    );
})}

</div>
 
   </div>
    );
}

export default SearchStds;