import React, { createContext, useState, useContext } from 'react';
const DepartmentCourseContext = createContext();

export const useDepartmentCourse = () => {
  return useContext(DepartmentCourseContext);
};

export const DepartmentCourseProvider = ({ children }) => {
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [llm, setLlm] = useState('Llama');  // Add LLM to context

  const updateLlm = (selectedLlm) => {
    setLlm(selectedLlm);  // Update the LLM in context
  };

  return (
    <DepartmentCourseContext.Provider
      value={{ department, setDepartment, course, setCourse, llm, updateLlm }}
    >
      {children}
    </DepartmentCourseContext.Provider>
  );
};
