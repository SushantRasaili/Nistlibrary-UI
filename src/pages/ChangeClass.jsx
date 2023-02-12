import {useState} from "react";
import axios from 'axios';



const ChangeClass =() => {

    const [semesterDetails,setSemesterDetails] = useState({
        course: "",
        fromSem: null,
        toSem: null
    });



    const handleChange =(e) => {
        const {name,value} = e.target;

setSemesterDetails({...semesterDetails,[name]: value});

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {course,fromSem,toSem} = semesterDetails;
        const text = `Do you really want to change the semester of ${course} from ${fromSem} to ${toSem}`;
        if(window.confirm(text) === true) {
            try {
                if(course && fromSem && toSem) {
                    const res = await axios.post("http://localhost:5000/changeClass",semesterDetails);
                    if(res)
                    alert(res.data);
                    else
                    alert("Something went wrong, please try again");
                }
                 else {
                     alert("Please fill all the required field properly");
                 }
            }
       catch(err) {
        console.log(err);
       }
        }
        else {
            alert("Please be sure before you change the class");
        }
      

    }

    return(
   <div className="changeClassContainer">
<div className="changeClassBox">
<h1 style={{textAlign: "center"}}>Please be sure before you change the semester</h1>

<div className="formDiv">
<form onSubmit={handleSubmit}>
    <div className="formSubDiv">
    <label className="formLabel">Course:</label>
    <select name="course" className="formInp" onChange={handleChange} >
<option value="BIM">Select the course</option>
<option value="BIM">BIM</option>
<option value="CSIT">CSIT</option>
<option value="BCA">BCA</option>
    </select>
{/* <input type="text" name="course" className="formInp" /> */}
    </div>

    <div className="formSubDiv">
<label className="formLabel">From Semester:</label>
<input type="number" name="fromSem" className="formInp" onChange={handleChange} />
</div>

<div className="formSubDiv">
<label className="formLabel">To Semester:</label>
<input type="number" name="toSem" className="formInp" onChange={handleChange} />
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

export default ChangeClass;