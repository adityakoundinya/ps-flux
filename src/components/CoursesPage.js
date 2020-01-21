import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import {
  loadCourses,
  deleteCourse,
  loadAuthors
} from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(courseStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses.length === 0) {
      loadCourses();
      loadAuthors();
    }
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(courseStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
