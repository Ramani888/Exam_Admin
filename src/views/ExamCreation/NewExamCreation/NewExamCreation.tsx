import React, { useState } from "react";
import { 
    NewExamCreationBodyContainer, 
    NewExamCreationContainer, 
    NewExamCreationHeaderContainer, 
    Form,
    AccordionRow,
    ButtonContainer,
    NewExamCreationBodyWrapper,
    SubjectSelectionContainer,
    SubjectSelectionHeaderContainer,
    SubjectSelectionBodyContainer,
    SubjectSelectionBodyRow,
    ExamQuestionTableContainer,
    PassingMarkContainer,
    PassingMarkLabel,
    PassingMarkWrapper,
    PassingMarkInput,
    TotalMark
} from './NewExamCreation.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Radio,
    FormControlLabel,
    Typography,
    Divider
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Formik } from "formik";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppInput from '../../../components/AppInput/AppInput';
import AppRadioButtonGroup from '../../../components/AppRadioButtonGroup/AppRadioButtonGroup';
import { Stepper, Step, Box, StepButton, Button } from '@mui/material';
import useNewExamCreation from "./useNewExamCreation";
import AppDropDown from "../../../components/AppDropDown/AppDropDown";
import { examTypeData } from "../../../types/exam.d";
import { MaterialReactTable } from "material-react-table";
import AppMultiDropDown from "../../../components/AppMultiDropDwon/AppMultiDropDown";

const CustomRadio = styled(Radio)(({ theme }) => ({
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 24
    },
}));

const NewExamCreation = () => {
    const { schema, handleClose, subjectData, topicData, handleGetQuestion, getFilterQuestionTypeData, examQuestionTable, examQuestionData, setExamQuestionData, handleSubmit, handleQuestionTypeChange, selectedQuestionType, setSelectedQuestionType } = useNewExamCreation();
    const location = useLocation();
    const editData = location.state;
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/exam-management/exam-creation');
    }

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleAccordianChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const steps = ['General Settings', 'Select subject(s)'];
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const totalMark = examQuestionData.filter(item => item.selected).reduce((acc, item) => acc + item.mark, 0);
    const anySelected = examQuestionData.some(item => item.selected);
    return (
        <NewExamCreationContainer>
            <NewExamCreationHeaderContainer>
                <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
                <Box sx={{ width: '30%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton color="inherit">
                            {label}
                            </StepButton>
                        </Step>
                        ))}
                    </Stepper>
                </Box>
            </NewExamCreationHeaderContainer>
            <NewExamCreationBodyContainer>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: editData ? editData?.name :'',
                        isInstantScoreView: editData ? editData?.isInstantScoreView : false,
                        isCandidateReviewExam: editData ? editData?.isCandidateReviewExam : false,
                        examDuration: editData ? editData?.examDuration : '',
                        examTypeId: editData ? editData?.examTypeId : '',
                        isNegativeMarking: editData ? editData?.isNegativeMarking : false,
                        negativeMark: editData ? editData?.negativeMark : '',
                        isEachQuestionTime: editData ? editData?.isEachQuestionTime : false,
                        eachQuestionTime: editData ? editData?.eachQuestionTime : '',
                        isRandomQuestion: editData ? editData?.isRandomQuestion : false,
                        isCapturePhoto: editData ? editData?.isCapturePhoto : false,
                        photoTimeInterval: editData ? editData?.photoTimeInterval : '',
                        isQuestionNavigation: editData ? editData?.isQuestionNavigation : false,

                        subjectId: editData ? editData?.subjectId : '',
                        topicId: editData ? editData?.topicId : '',
                        questionTypeId: editData? editData?.questionTypeId : '',    
                        passingMark: editData ? editData?.passingMark : '',
                    }}
                    onSubmit={(values) => {
                        if (editData) {
                        } else {
                            const questions = examQuestionData.filter(item => item.selected).map(item => ({ questionId: item?._id?.toString() }));
                            handleSubmit({...values, totalMark: totalMark, questions: questions, questionTypeId: selectedQuestionType})
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
                    isValid,
                    isValidating,
                    isSubmitting    
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            {!activeStep ? (
                                <NewExamCreationBodyWrapper>
                                    <Accordion sx={{width: '100%'}} expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        >
                                        <FormControlLabel
                                            control={
                                                expanded === 'panel1' ? (
                                                    <Radio
                                                        checked={true}
                                                    />
                                                ) : (
                                                    <CustomRadio
                                                        checked={true}
                                                        icon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                        checkedIcon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                    />
                                                )
                                            }
                                            label={<Typography>Accordion 1</Typography>}
                                        />
                                        </AccordionSummary>
                                        <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                            <AccordionRow>
                                                <AppInput
                                                    label='Exam Name' 
                                                    name='name' 
                                                    type='text' 
                                                    handleChange={(e) => handleChange(e)} 
                                                    value={String(values?.name)} 
                                                    placeholder={'Enter exam name'} 
                                                    handleBlur={handleBlur}
                                                    errors={errors}
                                                    touched={touched}
                                                    isRequired
                                                />

                                                <AppRadioButtonGroup label={'Allow instant score view :'} name={'isInstantScoreView'} value={values?.isInstantScoreView} handleRadioChange={(e) => handleChange(e)}/>
                                                <AppRadioButtonGroup label={'Allow candidates to review exam :'} name={'isCandidateReviewExam'} value={values?.isCandidateReviewExam} handleRadioChange={(e) => handleChange(e)}/>
                                            </AccordionRow>
                                            <AccordionRow>
                                                <AppInput
                                                    label='Duration of exam :  (In minutes)' 
                                                    name='examDuration' 
                                                    type='number' 
                                                    handleChange={(e) => handleChange(e)} 
                                                    value={String(values?.examDuration)} 
                                                    placeholder={'Exam duration'} 
                                                    handleBlur={handleBlur}
                                                    errors={errors}
                                                    touched={touched}
                                                    isRequired
                                                />
                                                <AppRadioButtonGroup label={'Negative marking :'} name={'isNegativeMarking'} value={values?.isNegativeMarking} handleRadioChange={(e) => handleChange(e)}/>
                                                {values?.isNegativeMarking && (
                                                    <AppInput
                                                        label='Enter negative marks :' 
                                                        name='negativeMark' 
                                                        type='number' 
                                                        handleChange={(e) => handleChange(e)} 
                                                        value={String(values?.negativeMark)} 
                                                        placeholder={'Exam marks'} 
                                                        handleBlur={handleBlur}
                                                        errors={errors}
                                                        touched={touched}
                                                        isRequired
                                                    />
                                                )}
                                            </AccordionRow>
                                            <AccordionRow>
                                            <AppDropDown
                                                data={examTypeData} 
                                                placeHolder={'Please select'} 
                                                handleChange={(e) => {
                                                    handleChange(e);
                                                    setSelectedQuestionType([]);
                                                    setExamQuestionData([]);
                                                }} 
                                                value={values?.examTypeId}
                                                name={'examTypeId'}
                                                handleBlur={handleBlur}
                                                errors={errors}
                                                touched={touched}
                                                label={'Select exam type :'}
                                                minWidth={'300px'}
                                                isRequired
                                            />
                                            </AccordionRow>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{width: '100%'}} expanded={expanded === 'panel2'} onChange={handleAccordianChange('panel2')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                        <FormControlLabel
                                            control={
                                                expanded === 'panel2' ? (
                                                    <Radio
                                                        checked={true}
                                                    />
                                                ) : (
                                                    <CustomRadio
                                                        checked={true}
                                                        icon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                        checkedIcon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                    />
                                                )
                                            }
                                            label={<Typography>Accordion 2</Typography>}
                                        />
                                        </AccordionSummary>
                                        <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                            <AccordionRow>
                                                <AppRadioButtonGroup label={'Enable a separate timer for each question:'} name={'isEachQuestionTime'} value={values?.isEachQuestionTime} handleRadioChange={(e) => handleChange(e)}/>
                                                {values?.isEachQuestionTime && (
                                                    <AppInput
                                                        label='Timer in seconds :' 
                                                        name='eachQuestionTime' 
                                                        type='number' 
                                                        handleChange={(e) => handleChange(e)} 
                                                        value={String(values?.eachQuestionTime)} 
                                                        placeholder={'Exam Time In Seconds'} 
                                                        handleBlur={handleBlur}
                                                        errors={errors}
                                                        touched={touched}
                                                        isRequired
                                                    />
                                                )}
                                            </AccordionRow>
                                            <AccordionRow>
                                                <AppRadioButtonGroup label={'Enable unique question for each candidate :(Randomise question)'} name={'isRandomQuestion'} value={values?.isRandomQuestion} handleRadioChange={(e) => handleChange(e)}/>
                                            </AccordionRow>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{width: '100%'}} expanded={expanded === 'panel3'} onChange={handleAccordianChange('panel3')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                        >
                                        <FormControlLabel
                                            control={
                                                expanded === 'panel3' ? (
                                                    <Radio
                                                        checked={true}
                                                    />
                                                ) : (
                                                    <CustomRadio
                                                        checked={true}
                                                        icon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                        checkedIcon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                    />
                                                )
                                            }
                                            label={<Typography>Accordion 3</Typography>}
                                        />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <AccordionRow>
                                                <AppRadioButtonGroup label={'Capture candidate photo :'} name={'isCapturePhoto'} value={values?.isCapturePhoto} handleRadioChange={(e) => handleChange(e)}/>
                                                {values?.isCapturePhoto && (
                                                    <AppInput
                                                        label='Capture Image Time Interval :' 
                                                        name='photoTimeInterval' 
                                                        type='number' 
                                                        handleChange={(e) => handleChange(e)} 
                                                        value={String(values?.photoTimeInterval)} 
                                                        placeholder={'Exam Time In Minutes'} 
                                                        handleBlur={handleBlur}
                                                        errors={errors}
                                                        touched={touched}
                                                        isRequired
                                                    />
                                                )}
                                            </AccordionRow>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{width: '100%'}} expanded={expanded === 'panel4'} onChange={handleAccordianChange('panel4')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                        >
                                        <FormControlLabel
                                            control={
                                                expanded === 'panel4' ? (
                                                    <Radio
                                                        checked={true}
                                                    />
                                                ) : (
                                                    <CustomRadio
                                                        checked={true}
                                                        icon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                        checkedIcon={<CheckCircleIcon style={{ color: '#1876d1' }} />}
                                                    />
                                                )
                                            }
                                            label={<Typography>Accordion 4</Typography>}
                                        />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <AccordionRow>
                                                <AppRadioButtonGroup label={'Allow question navigation :'} name={'isQuestionNavigation'} value={values?.isQuestionNavigation} handleRadioChange={(e) => handleChange(e)}/>
                                            </AccordionRow>
                                        </AccordionDetails>
                                    </Accordion>
                                    <ButtonContainer>
                                        <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
                                        <Button onClick={() => handleNext()} variant="contained" color={'primary'} disabled={!schema.isValidSync(values)}>Next</Button>
                                    </ButtonContainer>
                                </NewExamCreationBodyWrapper>
                            ) : (
                                <SubjectSelectionContainer>
                                    <SubjectSelectionHeaderContainer>
                                        Subject Selection
                                    </SubjectSelectionHeaderContainer>
                                    <SubjectSelectionBodyContainer>
                                        <SubjectSelectionBodyRow>
                                            <AppDropDown
                                                data={subjectData} 
                                                placeHolder={'Please select'} 
                                                handleChange={(e) => {
                                                    handleChange(e);
                                                    setExamQuestionData([]);
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
                                                    setExamQuestionData([]);
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

                                            <AppMultiDropDown
                                                data={getFilterQuestionTypeData(values?.examTypeId)} 
                                                placeHolder={'Please select'} 
                                                handleChange={(e) => {
                                                    handleQuestionTypeChange(e);
                                                    setExamQuestionData([]);
                                                }}
                                                value={selectedQuestionType}
                                                name={'questionTypeId'}
                                                handleBlur={handleBlur}
                                                errors={errors}
                                                touched={touched}
                                                label={'Question Type'}
                                                minWidth={'300px'}
                                                isRequired
                                            />
                                        </SubjectSelectionBodyRow>
                                        <Divider sx={{width: '100%'}}/>
                                        <Button variant="contained" onClick={() => handleGetQuestion(values?.examTypeId, selectedQuestionType, values?.subjectId, values?.topicId)} color={'secondary'} sx={{marginTop: '20px', marginBottom: '20px'}} disabled={!(values?.subjectId && values?.topicId && !(selectedQuestionType?.length === 0))}>{'Get Question'}</Button>
                                        <Divider sx={{width: '100%'}}/>
                                        <ExamQuestionTableContainer>
                                            <MaterialReactTable table={examQuestionTable} />
                                        </ExamQuestionTableContainer>
                                        {/* <Button variant="contained" onClick={() => {}} sx={{background: '#0b3157', color: '#ffffff', marginTop: '15px', marginBottom: '15px'}}>{'Add Selection'}</Button> */}
                                        <Divider sx={{width: '100%'}}/>
                                        <PassingMarkContainer>
                                            <PassingMarkLabel>Passing marks for exam / Total marks</PassingMarkLabel>
                                            <PassingMarkWrapper>
                                                <PassingMarkInput value={values?.passingMark} onChange={(e) => handleChange(e)} name="passingMark" type="number"></PassingMarkInput>
                                                <TotalMark>/ {totalMark}</TotalMark>
                                            </PassingMarkWrapper>
                                        </PassingMarkContainer>
                                        <Divider sx={{width: '100%'}}/>
                                    </SubjectSelectionBodyContainer>
                                    <ButtonContainer>
                                        <Button onClick={() => handleBack()} variant="contained" color={'inherit'}>Prev</Button>
                                        <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
                                        <Button type="submit" variant="contained" color={'primary'} disabled={!anySelected}>Generate Exam</Button>
                                    </ButtonContainer>
                                </SubjectSelectionContainer>
                            )}
                        </Form>
                    )}
                </Formik>
            </NewExamCreationBodyContainer>
        </NewExamCreationContainer>
    )
}

export default NewExamCreation