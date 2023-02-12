import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddStudents =() => {

    const location = useLocation();
    let flag = location.search.split("=")[1];
    

    const [mode,setMode] = useState(flag?flag:"");
    

    const [stdDetails,setStdDetails] = useState({
            name: "",
            roll:"",
            course:"",
            semester: "",
            address: "",
            email:""
    });

    const [file,setFile] = useState(null);

 

const handleChange =(e) => {
const {name,value} = e.target;

setStdDetails({...stdDetails,[name]:value});

}

    const handleSubmit = async(e) => {
        e.preventDefault();
  
        if(mode!=="update") {
            try {
                const res = await axios.post("http://localhost:5000/addStudents",stdDetails);
                if(res)
                    alert(`${res.data.name} has been added.`);
                  else 
                  alert("Something went wrong");
            
                  }
                 catch(err) {
                    console.log(err);
                 }            
        }
        else {
            // do the updatation code here, also first make the api 
        }
   
    }


    return(
   <div className="addStudentsContainer">
<div className="addStudentsBox">
<h1 style={{textAlign: "center"}}>Fill up the correct information of the students</h1>

<div className="formDiv">
<form onSubmit={handleSubmit}>
   

    <div className="formSubDiv">
<label className="formLabel">Name:</label>
<input type="text" name="name" className="formInp" onChange={handleChange} />
</div>

<div className="formSubDiv">
<label className="formLabel">Roll no:</label>
<input type="number" name="roll" className="formInp" onChange={handleChange} />
</div>

<div className="formSubDiv">
    <label className="formLabel">Course:</label>
    <select name="course" className="formInp" onChange={handleChange} >
<option value="BIM">Select the course</option>
<option value="BIM">BIM</option>
<option value="CSIT">CSIT</option>
<option value="BCA">BCA</option>
    </select>
    </div>

    <div className="formSubDiv">
<label className="formLabel">Semester:</label>
{/* <select name="semester" className="formInp" onChange={handleChange}>

<option value="BIM">Select the semester</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>

</select> */}
<input type="number" name="semester" className="formInp" onChange={handleChange} />
</div>

<div className="formSubDiv">
<label className="formLabel">Address:</label>
<input type="text" name="address" className="formInp" onChange={handleChange} />
</div>


<div className="formSubDiv">
<label className="formLabel">Email:</label>
<input type="email" name="email" className="formInp" onChange={handleChange} />
</div>

<div className="formSubDiv">
<label className="formLabel" htmlFor="pPhoto">Photo:
<FontAwesomeIcon className="plusIcon" icon={faFileCirclePlus} />

</label>
<input type="file" id="pPhoto" name="photo" className="formInp"
 onChange={(e)=>setFile(e.target.files[0])} style={{display: "none"}}
 />

</div>


<div className="formSubDiv">
<p className="hide"></p>
<button className="formBtn">Submit</button>
</div>


</form>

</div>

</div>

   </div>
    );
}

export default AddStudents;