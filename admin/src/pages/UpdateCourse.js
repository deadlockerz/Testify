import { useEffect, useState } from "react"
import axios  from  "axios";
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
    const[inputCourse, setinputCourse]=useState({
});


const{id}=useParams() 

//get single user from server 
// const fetchSingleUser= async()=>{
//     const res = await axios.get(`http://localhost:5000/readuser/${id}`)
//     console.log(res);
//     setinputCourse({
//         name:res.data.name,
//         email:res.data.email,
//         password:res.data.password,
//     });
//     }
//     useEffect(()=>{  // to synchronize a component wit an external System
//        fetchSingleUser(); 
//     },[]);



const handlechange = (event)=>{
    setinputCourse(
        {
            ...inputCourse,  //...it is a spread operator -- to create a copy of the current user
            [event.target.name]:event.target.value,
        }
    )
}

const handleSubmit=async(e)=>{
    e.preventDefault()  
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/courses/updatecourse/${id}`,inputCourse) //use axios to post data on the server
    if(res.status===200){
        window.location='/admin_courses'
    }
 }

 return (
<div> 
  <div className="w-2/3 mx-auto mt-5">
  <form onSubmit={(e) => handleSubmit(e)} >
        <h1>Add Courses</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">image link</label>
          <input
            type="text"
            name="img"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter image link"
            // required
            value={inputCourse.img}
            onChange={handlechange}
          />
          </div>
          <div className="">
          <label className=" text-sm text-gray-500 ">Course Name</label>
          <input
            type="text"
            name="course_name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter course name"
            // required
            value={inputCourse.name}
            onChange={handlechange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Course Disc</label>
          <input
            type="text"
            name="course_disc"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter course disc "
            // required
            value={inputCourse.disc}
            onChange={handlechange} 
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Course Price</label>
          <input
            type="number"
            name="course_price"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter price "
            // required
            value={inputCourse.price}
            onChange={handlechange}
          />
        </div>
        

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add Course
          </button>
        </div>
      </form>
   
  </div>
</div>
);
}

export default UpdateCourse
