import React, { useState } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../utils/paginate";
import NewCourseDialog from "./../admin/dialogs/NewCourseDialog";

const AdminContext = ({ courses, children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [updateCourseDialog, setUpdateCourseDialog] = useState(false);

  const openNewCourseDialog = () => setNewCourseDialog(true);

  const closeNewCourseDialog = () => setNewCourseDialog(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const courseData = paginate(courses, currentPage, perPage);

  return (
    <dashContext.Provider
      value={{
        currentPage,
        perPage,
        handlePageChange,
        // courseData,
        openNewCourseDialog,
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDialog={closeNewCourseDialog}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
