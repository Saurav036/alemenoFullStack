import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";
import Courses from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetailPage";

function App() {
  return (
    <div className='flex relative'>
      <Navbar/>

      <Routes>
        <Route path="login" element={<Login/>}/>
          {/* <Route path="/" element={<Dashboard/>}> */}

          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="courses" element={<Courses/>} />
          <Route path="courses/:id" element={<CourseDetailPage/>} />
          {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
