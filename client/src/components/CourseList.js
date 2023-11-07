import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import CustomCard from "./Card";
import SearchBar from "./SearchBar";
import { getCourses } from "../redux/course/courseAction";
import { useDispatch, useSelector } from "react-redux";

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses) || [];


  useEffect(() => {
    console.log('hello this is ankit')
    dispatch(getCourses());
  }, []);

  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="flex flex-wrap gap-6 ">
        {courses.length > 0 &&
          courses?.map((l) => {
            return (
              <div className="w-54 max-w-54 ">
                <CustomCard {...l} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseList;
