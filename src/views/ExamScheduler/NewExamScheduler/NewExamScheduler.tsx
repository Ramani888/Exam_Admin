import React, { useEffect, useState } from 'react';
import {
  ButtonContainer,
  Form,
  NewExamSchedulerBodyContainer,
  NewExamSchedulerContainer,
  NewExamSchedulerHeaderContainer,
  NewExamSchedulerRow,
} from './NewExamScheduler.styled';
import AddHeader from '../../../components/AddHeader/AddHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import { Formik } from 'formik';
import AppInput from '../../../components/AppInput/AppInput';
import { Button, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Checkbox, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import useNewExamScheduler from './useNewExamScheduler';
import moment from 'moment';
import { addMinutes } from '../../../utils/helpers/global';
import { getCurrentDate, getCurrentTime } from '../../../utils/helpers/date';
import StudentAssignInstructorDialog from './StudentAssignInstructorDialog/StudentAssignInstructorDialog';

const NewExamScheduler = () => {
  const location = useLocation();
  const editData = location.state as any; // Replace `any` with a proper type if available
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/exam-management/exam-scheduler');
  };

  const {
    handleClose,
    examData,
    schema,
    handleSubmit,
    handleUpdate,
    batchData,
    handleOpenDialog,
    handleCloseDialog,
    openDialog,
    setSelectedBatchId,
    candidateData,
    instructorsData,
    selectedBatchId
  } = useNewExamScheduler(editData);

  const getSelectedExamDuration = (examId: string) => {
    const findData = examData?.find((item) => item?._id === examId);
    return Number(findData?.examDuration || 0);
  };

  const students = candidateData?.map((item) => ({
    id: item?._id || '',
    name: `${item?.firstName || ''} ${item?.lastName || ''}`,
  }));

  const instructors = instructorsData?.map((item) => ({
    id: item?._id || '',
    name: `${item?.firstName || ''} ${item?.lastName || ''}`,
  }));

  const [assignments, setAssignments] = useState<{
    [studentId: string]: string | null;
  }>(
    students?.reduce((acc, student) => ({ ...acc, [student?.id]: null }), {})
  );

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [bulkInstructor, setBulkInstructor] = useState<string | null>(null);

  const handleBulkAssign = () => {
    if (bulkInstructor) {
      const updatedAssignments = { ...assignments };
      selectedStudents.forEach((studentId) => {
        updatedAssignments[studentId] = bulkInstructor;
      });
      setAssignments(updatedAssignments);
      setSelectedStudents([]); // Clear selection after assigning
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  useEffect(() => {
    if (editData) {
        const data = editData?.examScheduleStatusData.reduce((acc: any, { candidateId, instructorId }: any) => {
            acc[candidateId] = instructorId;
            return acc;
        }, {});

        setAssignments(data);
    }
  }, [editData])

  return (
    <NewExamSchedulerContainer>
      <NewExamSchedulerHeaderContainer>
        <AddHeader title="Back" handleNavigate={handleNavigate} />
      </NewExamSchedulerHeaderContainer>
      <NewExamSchedulerBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
            examId: editData?.examId || '',
            batchId: editData?.batchId || '',
            startDate: editData ? moment(editData?.startDate).format('YYYY-MM-DD') : '',
            startTime: editData?.startTime || '',
            endDate: editData ? moment(editData?.endDate).format('YYYY-MM-DD') : '',
            endTime: editData?.endTime || '',
          }}
          onSubmit={(values) => {
            if (editData) {
                const result = Object.entries(assignments).map(([studentId, instructorId]) => ({
                    studentId,
                    instructorId
                }));
                handleUpdate({ ...values, _id: editData?._id, studentAssignInstructorData: result });
            } else {
                const result = Object.entries(assignments).map(([studentId, instructorId]) => ({
                    studentId,
                    instructorId
                }));
                handleSubmit({ ...values, studentAssignInstructorData: result });
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <NewExamSchedulerRow>
                <AppDropDown
                  data={examData}
                  placeHolder="Please select"
                  handleChange={(e) => handleChange(e)}
                  value={values.examId}
                  name="examId"
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label="Exam Name"
                  minWidth="300px"
                  isRequired
                />
                <AppDropDown
                  data={batchData}
                  placeHolder="Please select"
                  handleChange={(e) => {
                    handleChange(e);
                    setSelectedBatchId(e?.target?.value);
                  }}
                  value={values.batchId}
                  name="batchId"
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label="Batch Name"
                  minWidth="300px"
                  isRequired
                />
              </NewExamSchedulerRow>
              <NewExamSchedulerRow>
                <AppInput
                  label="Exam Schedule Start Date :"
                  name="startDate"
                  type="date"
                  handleChange={(e) => handleChange(e)}
                  value={String(values.startDate)}
                  placeholder=""
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label="Exam Schedule Start Time :"
                  name="startTime"
                  type="time"
                  handleChange={(e) => handleChange(e)}
                  value={String(values.startTime)}
                  placeholder=""
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                  min={values.startDate === getCurrentDate() ? getCurrentTime() : undefined}
                />
              </NewExamSchedulerRow>
              <NewExamSchedulerRow>
                <AppInput
                  label="Exam Schedule Expire Date :"
                  name="endDate"
                  type="date"
                  handleChange={(e) => handleChange(e)}
                  value={String(values.endDate)}
                  placeholder=""
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  min={
                    values.startDate &&
                    new Date(values.startDate).toISOString().split('T')[0]
                  }
                  isRequired
                />
                <AppInput
                  label="Exam Schedule Expire Time :"
                  name="endTime"
                  type="time"
                  handleChange={(e) => handleChange(e)}
                  value={String(values.endTime)}
                  placeholder=""
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  min={
                    values.startDate === values.endDate
                      ? addMinutes(String(values.startTime), getSelectedExamDuration(values.examId))
                      : undefined
                  }
                  isRequired
                />
              </NewExamSchedulerRow>
              {/* Assign Instructor Section */}
              <NewExamSchedulerRow>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    border: '1px solid gray',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ paddingBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                    Assign Instructor
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <FormControl fullWidth>
                      <InputLabel>Bulk Assign Instructor</InputLabel>
                      <Select
                        value={bulkInstructor || ''}
                        onChange={(e) => setBulkInstructor(e.target.value || null)}
                        label="Bulk Assign Instructor"
                      >
                        <MenuItem value="">
                          <em>-- Select Instructor --</em>
                        </MenuItem>
                        {instructors.map((instructor) => (
                          <MenuItem key={instructor.id} value={instructor.id}>
                            {instructor.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleBulkAssign}
                      variant="outlined"
                      color="primary"
                      style={{ marginTop: '10px' }}
                      disabled={selectedStudents.length === 0 || !bulkInstructor}
                    >
                      Apply to Selected Students
                    </Button>
                  </div>
                  <div style={{ height: '300px', overflow: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Select</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Assigned Instructor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students?.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => toggleStudentSelection(student.id)}
                              />
                            </TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                                {assignments[student?.id]
                                ? instructors.find(
                                    (inst) => inst.id === assignments[student?.id]
                                    )?.name
                                : "-- Not Assigned --"}
                            </TableCell>
                            {/* <TableCell>
                              <FormControl fullWidth>
                                <Select
                                  value={assignments[student.id] || ''}
                                  onChange={(e) => {
                                    setAssignments((prev) => ({
                                      ...prev,
                                      [student.id]: e.target.value || null,
                                    }));
                                  }}
                                  label="Assign Instructor"
                                >
                                  <MenuItem value="">
                                    <em>-- Select Instructor --</em>
                                  </MenuItem>
                                  {instructors.map((instructor) => (
                                    <MenuItem key={instructor.id} value={instructor.id}>
                                      {instructor.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </NewExamSchedulerRow>
                <ButtonContainer>
                    <Button onClick={() => handleClose()} variant="contained" color={'error'} disabled={false}>Cancel</Button>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant="contained" type='submit' color={'success'} disabled={!selectedBatchId || !(Number(candidateData?.length) === Number(Object.values(assignments)?.length))}>Submit</Button>
                        {false && (
                        <CircularProgress
                            size={24}
                            sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                        />
                        )}
                    </Box>
                </ButtonContainer>
            </Form>
          )}
        </Formik>
      </NewExamSchedulerBodyContainer>
    </NewExamSchedulerContainer>
  );
};

export default NewExamScheduler;