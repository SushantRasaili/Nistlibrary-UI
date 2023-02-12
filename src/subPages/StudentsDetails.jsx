import {Link,useLocation} from "react-router-dom";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { set } from "mongoose";


const StudentsDetails =() => {
    const location = useLocation();
    let stdId = location.pathname.split("/")[2];
    const queryArr = location.search.split("=");
 
    const course = queryArr[3];
    const sem = queryArr[2].split("&")[0];
    const stdName = queryArr[1].split("&")[0];

    const filterBooks = async (booksArr,borrowedBooks) => {
        if(borrowedBooks && borrowedBooks.length>0) {
            setFilteredBooks(booksArr.filter((book) => {  
                return !(borrowedBooks.some((borrowBook) => {
                 return borrowBook.bookId===book._id;
                     })  
                       );         
                            
                             })
            );
           }
           else {
            setFilteredBooks(booksArr);
           }
    }


                // PERFORM EXCEEDED DAYS AND FINE OPERATION
        const setFine =(expiryDates) => {
            const curDate = new Date();
            const expiryDate = new Date(expiryDates);
               

            if(curDate>expiryDate) {
                console.log(curDate);
                const exceededMills = curDate - expiryDate;
                const exceededDays = Math.floor(exceededMills/(1000*60*60*24));
                    return exceededDays*5;
            }
            else {
                return 0;
            }
        }

                    // PERFORM EXCEEDED DAYS CALCULATION
        const moreDays =(expiryDates) => {
            const curDate = new Date();
            const expiryDate = new Date(expiryDates);
               

            if(curDate>expiryDate) {
                console.log(curDate);
                const exceededMills = curDate - expiryDate;
                const exceededDays = Math.floor(exceededMills/(1000*60*60*24));
                    return exceededDays;
            }
            else {
                return 0;
            }
        }



    const getBooks = async () => { 
        // var filterBooks; 
        try {
            const borrowedBooksDtls = await axios.get(`http://localhost:5000/borrowedBooks/${stdId}`);
            if(borrowedBooksDtls) {
                setBorrowedBooks(borrowedBooksDtls.data);
                const borrowedBooks = borrowedBooksDtls.data;

                // const borrowedDate =  new Date(borrowedBooks.borrowedDate);
                // console.log(borrowedBooksDtls.data.expiryDate);
                // setFine(expiryDate);
               


                const res = await axios.get(`http://localhost:5000/books/${course}?sem=${sem}`);
                if(res) {
                // setBooks(res.data);
                const booksArr = res.data;
                console.log(booksArr);
              
                filterBooks(booksArr,borrowedBooks);
    
                }
                else {
                    console.log("Sorry no books found");
                }
            }
           
        }
        catch(err) {
            console.log(err);
        }
    }

    // const [books,setBooks] = useState([]);
    const [filteredBooks,setFilteredBooks] = useState([]);
    const [borrowedBooks,setBorrowedBooks] = useState([]);
    const [fineInf,setFineInf] = useState({
        fine: 0,
        exceeded: 0
    });

   
    useEffect(()=> {
       getBooks();
   
    },[]);


                // WHEN LEND BUTTON IS PRESSED
    const handleLend = async(bookId,name,pub) => {
             console.log(name);
             try {
               const res = await  axios.post("http://localhost:5000/lendBook",{
                stdId,
                 stdName: stdName,
                course,
               sem, 
                bookId,
                bookName: name,
                pub
               });
                if(res) {
                    console.log(res);
                    window.location.reload(true);
                }
                else {
                    console.log("sorry");
                }
             }
             catch(err) {
                console.log(err);
             }
    }



                        // WHEN DELETE BUTTON IS PRESSED
            const handleDelBorrowed = async (borrowId) => {
                try {
                    const deleted = await axios.delete("http://localhost:5000/delBorrowBooks",{data:{borrowId}});
                    if(deleted) {
                        window.location.reload(true);
                    }
                    else {
                        console.log("Sorry delete operation can't be performed in this book try again..");
                    }
                }
               catch(err) {
                console.log(err);
               }

            }

    return(
        <div className="studentContainer">
            <div className="studentProfile">
            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/25/reading-310397_960_720.png" 
            className="studentDetailsImg"
            alt="studentProfile" />
            <h3 className="stdName">
                {/* also send the id of the student along with link like addStudents/sudent._id?search=? */}
                <Link to={`/addStudents/${stdId}?mode=update`} className="updateLink">
                <FontAwesomeIcon icon={faEdit} style={{color:"#7FB77E",cursor:"pointer"}}>
                    </FontAwesomeIcon>
                </Link> {stdName}, {course} </h3>
            </div>

            <div className="borrowedDetails">
            <h3>Borrowed Books</h3>
            <table className="table">
                <thead className="tableHead">
                    <th className="tableHeadItem">Book Name</th>
                    <th className="tableHeadItem">Publication</th>
                    <th className="tableHeadItem">Borrowed Date</th>
                    <th className="tableHeadItem">Expiry Date</th>
                    <th className="tableHeadItem">Fine(Rs)</th>
                    <th className="tableHeadItem">Exceeded Day</th>
                    <th className="tableHeadItem">Delete</th>
                </thead>
                <tbody>
                 
                 {borrowedBooks.map((book) => {
                    return (
                        <tr className="tableBody" key={book._id}>
                        <td className="tableBodyItem">{book.bookname}</td>
                        <td className="tableBodyItem">{book.publication}</td>
                        <td className="tableBodyItem">{new Date(book.borrowedDate).toDateString()}</td>
                        <td className="tableBodyItem">{new Date(book.expiryDate).toDateString()}</td>
                        <td className="tableBodyItem">{setFine(book.expiryDate)}</td>
                        <td className="tableBodyItem">{moreDays(book.expiryDate)}</td>
                        <td className="tableBodyItem">
                        <button className="stdDtlsButtons delBtn" 
                        onClick={()=> {handleDelBorrowed(book._id)}}>Delete </button>
                        </td>
                    </tr>
                    );
                 })}
                    
                </tbody>
            </table>

            </div>


            <div className="availableBooks">
            <h3>Available Books for {stdName}</h3>
            <table className="table">
                <thead className="tableHead">
                    <th className="tableHeadItem">Book Name</th>
                    <th className="tableHeadItem">Publication</th>
                    <th className="tableHeadItem">Pages</th>
                    <th className="tableHeadItem">Lend Book</th>
                </thead>
                <tbody>
                {filteredBooks.map((book)=>{
                        return(
                            <tr className="tableBody" key={book._id}>
                            <td className="tableBodyItem">{book.bookname}</td>
                            <td className="tableBodyItem">{book.publication}</td>
                            <td className="tableBodyItem">{book.pages}</td>
                            <td className="tableBodyItem">
                             <button className="lendBtn stdDtlsButtons"
                              onClick={()=> {handleLend(book._id,book.bookname,book.publication)}}>
                             Lend Now 
                             </button>
                                </td>
                            </tr>
                        );
                    })}
                  
                </tbody>
            </table>
            </div>


         </div>
    )


}

export default StudentsDetails