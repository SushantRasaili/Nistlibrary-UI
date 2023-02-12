import {useState, useRef} from "react";
import axios from "axios";


const AddBooks =() => {

    const [booksDetails,setBooksDetails] = useState({
        bookName: "",
        publication: "",
        pages: null,
        quantity: null,
        bim : 0,
        csit: 0,
        bca: 0
    });

    const bimElem = useRef();
    const csitElem = useRef();
    const bcaElem = useRef();




    const handleChange =(e) => {
        const {name,value} = e.target;

        setBooksDetails({...booksDetails,[name]:value});
        
    }

    // CheckBoxes Handle Functions
    const handleChangeBim = () => {
       if(bimElem.current.checked) {
        var bimSem = prompt("Please enter the semester of book bim");
        if( bimSem<=8 && bimSem!=="" && bimSem!==null) {
            setBooksDetails({...booksDetails,bim:bimSem});
        }
        else {
            alert("Semester must be from 0 to 8");
            bimElem.current.checked = false;
        }
        }
        else {
            setBooksDetails({...booksDetails,bim:0});
        }
    }

    const handleChangeCsit = () => {
       if(csitElem.current.checked) {
        const csitSem = prompt("Please enter the semester of book csit");
        if( csitSem<=8 && csitSem!=="" && csitSem!==null) {
            setBooksDetails({...booksDetails,csit:csitSem})
        }
        else {
            alert("Semester must be from 0 to 8");
            csitElem.current.checked = false;
        }

       }
       else {
        setBooksDetails({...booksDetails,csit:0});
       }
    }

    const handleChangeBca = () => {
       if(bcaElem.current.checked) {
        const bcaSem = prompt("Please enter the semester of book bca");
        if( bcaSem<=8 && bcaSem!=="" && bcaSem!=null && bcaSem!==null) {
            setBooksDetails({...booksDetails,bca:bcaSem})
        }
        else {
            alert("Semester must be from 0 to 8");
            bcaElem.current.checked = false;
        }
       }
       else {
        setBooksDetails({...booksDetails,bca:0});
       }
    }




    const handleSubmit =async (e) => {
        e.preventDefault();

        //SEND DATA booksDetails to the server
        try {
           const res = await axios.post("http://localhost:5000/addBooks",booksDetails);
           if(res) 
           alert(`${res.data.bookname} book has been added`);
           else
           alert("Sorry unsuccsess to add books");
        }
        catch(err) {
            console.log(err);
        }

        // console.log(booksDetails);
        
    }

    return(
   <div className="addBooksContainer">
  <div className="addBooksBox">
    <h1>Please fill all the required field properly below</h1>

    <div className="formDiv">
        <form onSubmit={handleSubmit}>
            <div className="formSubDiv">
                <label className="formLabel">Book Name:</label>
                <input className="formInp" onChange={handleChange} type="text" name="bookName"/>
            </div>

            <div className="formSubDiv">
                <label className="formLabel">Publication:</label>
                <input className="formInp" onChange={handleChange} type="text" name="publication"/>
            </div>

            <div className="formSubDiv">
                <label className="formLabel">Pages:</label>
                <input className="formInp" onChange={handleChange} type="number" name="pages"/>
            </div>

            <div className="formSubDiv">
                <label className="formLabel">Quantity:</label>
                <input className="formInp" onChange={handleChange} type="number" name="quantity"/>
            </div>

            <div className="formSubDiv">
                <label className="formLabel">Available for:</label>
                <div className="checkBoxList">

                    <div className="checkBoxItem">
                    <input className="checkBoxMargin" id="bim" type="checkbox" ref={bimElem} onChange={handleChangeBim} name="bim" value="BIM" />
                    <label className="checkBoxMargin" htmlFor="bim">BIM</label>
                    </div>
              
                    <div className="checkBoxItem">
                    <input className="checkBoxMargin" id="csit" type="checkbox" ref={csitElem} onChange={handleChangeCsit} name="csit" value="CSIT" />
                    <label className="checkBoxMargin" htmlFor="csit">CSIT</label>
                     </div>

                    <div className="checkBoxItem">
                    <input className="checkBoxMargin" id="bca" type="checkbox" ref={bcaElem} onChange={handleChangeBca} name="bca" value="BCA" />
                    <label className="checkBoxMargin" htmlFor="bca">BCA</label>
                    </div>

                </div>
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


export default AddBooks;