import "./pagesStyles.css";
import { useEffect,useState } from "react";

export const Home =() => {

    const [quote,setQuote] = useState([]);
    const [randNum,setRandNum] = useState(0);
    const [loading,setLoading] = useState(false);



useEffect(()=> {
    setLoading(true);
    const rand = Math.round(Math.random()*100);
    setRandNum(rand);


fetch('https://type.fit/api/quotes')
.then(res => res.json())
.then(data => setQuote(data.slice(0,101)))
.catch(err => console.log(err));
setLoading(false);
},[]);
    
    
    return (

     <div className="homeContainer">
       {loading? <h1>Loading ....</h1>:    <>
     <h3 className="greeting">Hello, Mr/Mrs.Librarian, be inspired</h3>
    <h1 className="quotes">{quote[randNum]?.text}</h1>
    <h3 className="author">-{quote[randNum]?.author}</h3>
    </>
       }
    
    
     </div>


    );
}