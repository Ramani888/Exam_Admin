import React, { useEffect, useState } from 'react'
import { AddObjectiveQuestionsBodyContainer, AddObjectiveQuestionsContainer, AddObjectiveQuestionsHeaderContainer, ButtonContainer, Form, HeaderCell, OptionCell, SubjectTopicTypeContainer, TableHeader, Container, Row, TitleField, AddButton } from './AddObjectiveQuestions.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import useAddObjectiveQuestions from './useAddObjectiveQuestions';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import TextEditor from '../../../components/TextEditor/TextEditor';
import AppInput from '../../../components/AppInput/AppInput';
import Checkbox from '@mui/material/Checkbox';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Box, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeHtmlTags } from '../../../utils/consts/globalConst';

const AddObjectiveQuestions = () => {
  const location = useLocation();
  const editData = location.state;
  const navigate = useNavigate();
  const handleNavigate = () => {
      navigate('/question-bank/objective-questions');
  }
  const {
    schema,
    loading,
    subjectData,
    topicData,
    questionTypeData,
    handleClose,
    rows,
    handleAddRow,
    handleDeleteRow,
    handleTitleChange,
    canAddRow,
    canSubmit,
    handleSubmit,
    handleUpdate
  } = useAddObjectiveQuestions(editData)

  const atLeastOneOption = rows?.filter((item: any) => item?.name !== '' && item?.answer) ? true : false; 
  return (
    <AddObjectiveQuestionsContainer>
      <AddObjectiveQuestionsHeaderContainer>
        <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
      </AddObjectiveQuestionsHeaderContainer>
      <AddObjectiveQuestionsBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
              subjectId: editData ? editData?.subjectId :'',
              questionTypeId: editData ? editData?.questionTypeId : '',
              topicId: editData ? editData?.topicId : '',
              mark: editData ? editData?.mark : '',
              question: editData ? editData?.question : ''
          }}
          onSubmit={(values) => {
              if (editData) {
                handleUpdate({...editData, ...values, question: removeHtmlTags(values?.question), mark: Number(values?.mark), options: rows?.filter((item: any) => item?.name !== '')})
              } else {
                handleSubmit({...values, question: removeHtmlTags(values?.question), mark: Number(values?.mark), options: rows?.filter((item: any) => item?.name !== '')})
              }
          }}
      >
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          }) => (
              <Form onSubmit={handleSubmit}>
                  <SubjectTopicTypeContainer>
                      <AppDropDown
                          data={subjectData} 
                          placeHolder={'Please select'} 
                          handleChange={(e) => {
                              handleChange(e);
                          }} 
                          value={values?.subjectId}
                          name={'subjectId'}
                          handleBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          label={'Subject'}
                          minWidth={'300px'}
                          isRequired
                      />

                      <AppDropDown
                          data={topicData} 
                          placeHolder={'Please select'} 
                          handleChange={(e) => {
                              handleChange(e);
                          }} 
                          value={values?.topicId}
                          name={'topicId'}
                          handleBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          label={'Topic'}
                          minWidth={'300px'}
                          isRequired
                      />

                      <AppDropDown
                          data={questionTypeData?.filter((item) => item?.name !== 'SUBJECTIVE')} 
                          placeHolder={'Please select'} 
                          handleChange={(e) => {
                              handleChange(e);
                          }} 
                          value={values?.questionTypeId}
                          name={'questionTypeId'}
                          handleBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          label={'Question Type'}
                          minWidth={'300px'}
                          isRequired
                      />
                  </SubjectTopicTypeContainer>
                  <TextEditor
                      handleChange={(e) => handleChange(e)} 
                      value={values?.question} 
                      name='question'
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      label={'Question'}
                      isRequired
                  />
                  <AppInput
                      label='Question Marks' 
                      name='mark' 
                      type='number' 
                      handleChange={(e) => handleChange(e)} 
                      value={String(values?.mark)} 
                      placeholder={'Enter question mark'} 
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      isRequired
                  />

                  {/* <Container> */}
                    {!canSubmit && (
                      <div style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
                        {'Please add one option.*'}
                      </div>
                    )}        
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Option</TableCell>
                            <TableCell>Title *</TableCell>
                            <TableCell>Correct Answer</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddRow}
                                disabled={!canAddRow}
                              >
                                Add Row
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row: any, index: number) => (
                            <TableRow key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                              <TitleField
                                variant="outlined"
                                size="small"
                                name="name"
                                value={row.name}
                                onChange={(e) => handleTitleChange(row.id, e)}
                                placeholder="Title *"
                              />
                              </TableCell>
                              <TableCell>
                              <Checkbox
                                name="answer"
                                checked={row.answer}
                                onChange={(e) => handleTitleChange(row.id, {
                                  target: {
                                    name: 'answer',
                                    value: e.target.checked,
                                    type: 'checkbox',
                                    checked: e.target.checked,
                                  }
                                })}
                                disabled={!row.name}
                              />
                              </TableCell>
                              <TableCell>
                                {rows.length > 1 && (
                                  <IconButton onClick={() => handleDeleteRow(row.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                              <TableCell />
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  {/* </Container> */}


                  <ButtonContainer>
                      <Button onClick={() => handleClose()} variant="contained" color={'error'} disabled={false}>Cancel</Button>
                      <Box sx={{ m: 1, position: 'relative' }}>
                          <Button variant="contained" type='submit' color={'success'} disabled={loading || !canSubmit}>Submit</Button>
                          {loading && (
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
      </AddObjectiveQuestionsBodyContainer>
    </AddObjectiveQuestionsContainer>
  )
}

export default AddObjectiveQuestions