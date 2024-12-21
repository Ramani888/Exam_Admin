import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverInsertInstructor, serverUpdateInstructor } from '../../../services/serverApi';
import { Instructor } from '../../../types/instructor';
import { getUserData } from '../../../utils/helpers/global';

const useNewInstructor = (editData: Instructor) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    firstName: Yup.string().required("Please enter a first name.*"),
    lastName: Yup.string().required("Please enter a last name.*"),
    email: Yup.string().required("Please enter a email.*"),
    number: Yup.string().required("Please enter a number.*"),
    password: Yup.string().required("Please enter a number.*"),
  });

  const handleClose = () => {
    navigate('/candidates/instructor')
  }

  const handleNavigate = () => {
    navigate('/candidates/instructor');
  };

  const initialPermissions = [
    { group: 'Subject', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Topic', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Subjective Question', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Objective Question', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Exam Creation', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Exam Scheduler', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Exam Proctoring', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Batch', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Candidate', permissions: { read: false, add: false, edit: false, delete: false } },
    { group: 'Instructors', permissions: { read: false, add: false, edit: false, delete: false } },
  ];
  
  const [permissions, setPermissions] = useState(initialPermissions);

  const handleCheckboxChange = (
    groupIndex: number,
    permission: keyof typeof initialPermissions[0]['permissions']
  ) => {
    const updatedPermissions = permissions.map((group, index) => {
      if (index === groupIndex) {
        return {
          ...group,
          permissions: {
            ...group.permissions,
            [permission]: !group.permissions[permission],
          },
        };
      }
      return group;
    });
    setPermissions(updatedPermissions);
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await serverInsertInstructor({...data, permissionGroups: permissions});
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      navigate('/candidates/instructor')
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      setLoading(true);
      await serverUpdateInstructor({...data, permissionGroups: permissions});
      const userData = getUserData();
      localStorage.setItem('Admin', JSON.stringify({...userData, permissionGroups: permissions}));
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      navigate('/candidates/instructor')
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editData?.permissionGroups) {
      setPermissions(editData?.permissionGroups)
    }
  }, [editData])

  return {
    schema,
    handleClose,
    handleCheckboxChange,
    handleNavigate,
    permissions,
    handleSubmit,
    handleUpdate,
    loading
  }
}

export default useNewInstructor