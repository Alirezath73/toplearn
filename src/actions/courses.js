import {
  deleteCourse,
  getCourses,
  newCourse,
} from "./../services/courseService";
import { successMessage } from "./../utils/message";
import { updateCourse } from "../services/courseService";

export const getAllCourses = () => {
  return async (dispatch) => {
    const { data } = await getCourses();
    await dispatch({ type: "INIT", payload: data.courses });
  };
};

export const createNewCourse = (course) => {
  return async (dispatch, getState) => {
    const { data, status } = await newCourse(course);
    if (status === 201) successMessage("دوره با موفقیت ساخته شد");
    await dispatch({
      type: "ADD_COURSE",
      payload: [...getState().courses, data.course],
    });
  };
};

export const editCourse = (updatedCourse, id) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await updateCourse(id, updatedCourse);

      if (status === 200) {
        let courses = [...getState().courses];
        console.log(courses);
        const courseIndex = courses.findIndex((course) => course._id === id);
        let course = courses[courseIndex];
        course = { ...Object.fromEntries(updateCourse) };
        courses[courseIndex] = course;
        
        await dispatch({
          type: "UPDATE_COURSE",
          payload: courses,
        });

        successMessage("دوره با ویرایش ساخته شد");
      }
    } catch (error) {}
  };
};

export const removeCourse = (id) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await deleteCourse(id);

      if (status === 200) {
        successMessage("دوره با موفقیت حذف شد");
        const courses = [...getState().courses];
        const indexCourse = courses.findIndex((course) => course._id === id);
        courses.splice(indexCourse, 1);

        await dispatch({ type: "DELETE_COURSE", payload: courses });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
