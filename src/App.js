import './App.css';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import {Home} from "./pages/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import SearchBooks from './pages/SearchBooks';
import SearchStds from './pages/SearchStds';
import ChangeClass from './pages/ChangeClass';
import AddBooks from './pages/AddBooks';
import AddStudents from './pages/AddStudents';
import AddODelBooks from './subPages/AddODelBooks';
import StudentsDetails from './subPages/StudentsDetails';



function App() {
  return (
<div className="App">



 <TopBar />
<Router>
<SideBar />


    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route path="/searchBooks" element={<SearchBooks/>} />
    <Route exact path="/searchStudents" element={<SearchStds/>} />
    <Route path="/changeClass" element={<ChangeClass/>} />
    <Route path="/addBooks" element={<AddBooks/>} />
    <Route path="/addStudents/:stdId" element={<AddStudents/>} />
    <Route path="/addStudents" element={<AddStudents/>} />
    <Route path="/addOrDeleteBooks" element={<AddODelBooks/>} />
    <Route path="/studentDetails/:id" element={<StudentsDetails/>} />

  </Routes>
</Router>





</div>
  );
}

export default App;
