import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverGetExamQuestion, serverGetExamType, serverGetQuestionType, serverGetSubject, serverGetTopic, serverInsertExam } from '../../../services/serverApi';
import { ExamType, IExam, IExamQuestion, IExamType } from '../../../types/exam.d';
import { IQuestionType } from '../../../types/question';
import { ISubject } from '../../../types/subject';
import { ITopic } from '../../../types/topic';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import {
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
} from 'material-react-table';

const useNewExamCreation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [examTypeData, setExamTypeData] = useState<IExamType[]>([]);
  const [subjectData, setSubjectData] = useState<ISubject[]>([]);
  const [topicData, setTopicData] = useState<ITopic[]>([]);
  const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
  const [examQuestionData, setExamQuestionData] = useState<IExamQuestion[]>([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string[]>([])
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    name: Yup.string().required("Enater exam name.*"),
    examDuration: Yup.string().required("Enter exam duration.*"),
    examTypeId: Yup.string().required("Select exam type.*"),
  });

  const handleClose = () => {
    navigate('/exam-management/exam-creation')
  }

  const getExamTypeData = async () => {
    try {
      setLoading(true)
      const data = await serverGetExamType();
      setExamTypeData(data?.data)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setExamTypeData([])
      setLoading(false)
    }
  }

  const getTopicData = async () => {
    try {
        setLoading(true);
        const data = await serverGetTopic();
        setTopicData(data?.data)
    } catch (err) {
        console.error(err);
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  const getQuestionTypeData = async () => {
    try {
        setLoading(true);
        const data = await serverGetQuestionType();
        setQuestionTypeData(data?.data)
    } catch (err) {
        console.error(err);
        setQuestionTypeData([])
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  const getFilterQuestionTypeData = (examTypeId: string) => {
    switch (examTypeId) {
      case ExamType.SubjectiveExam:
        return questionTypeData.filter((item) => item?.name === 'SUBJECTIVE');
      case ExamType.ObjectiveExam:
        return questionTypeData.filter((item) => item?.name !== 'SUBJECTIVE');
      case ExamType.Both:
        return questionTypeData
      default:
        return questionTypeData
    }
  }

  const getSubjectData = async () => {
    try {
        setLoading(true);
        const data = await serverGetSubject();
        setSubjectData(data?.data)
    } catch (err) {
        console.error(err);
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  const getExamQuestionData = async(examTypeId: number, questionTypeId: string[], subjectId: string, topicId: string) => {
    try {
      setLoading(true);
      const data = await serverGetExamQuestion(examTypeId, questionTypeId, subjectId, topicId);
      const finalData = data?.data?.map((item: IExamQuestion, index: number) => {
        return {
          ...item,
          index: index + 1,
          selected: false
        }
      })
      setExamQuestionData(finalData)
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  const handleGetQuestion = (examTypeId: number, questionTypeId: string[], subjectId: string, topicId: string) => {
    getExamQuestionData(examTypeId, questionTypeId, subjectId, topicId)
  }

  const handleSelect = (index: number, selected: boolean) => {
    const data = examQuestionData?.map((item) => {
      if(item?.index === index) {
        return {
          ...item,
          selected: selected
        }
      } else {
        return {
          ...item
        }
      }
    })
    setExamQuestionData(data)
  }

  const columns = useMemo<MRT_ColumnDef<IExamQuestion>[]>(
    () => [
      {
        accessorKey: "index",
        header: "#",
      },
      {
        accessorKey: "question",
        header: "Question",
      },
      {
        accessorKey: "mark",
        header: "Marks",
      },
      {
        accessorKey: "selected",
        header: "Option",
        Cell: ({ row }) => {
          return (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            <Checkbox
              checked={row?.original?.selected}
              onChange={() => handleSelect(row?.original?.index, !row?.original?.selected)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
          )
        },
      },
    ],
    [examQuestionData]
  );

  const examQuestionTable = useMaterialReactTable({
    columns,
    data: examQuestionData,
    enableEditing: false,
    positionActionsColumn: "last",
    enablePagination: false,
    enableBottomToolbar: false,
    state: { isLoading: loading },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "65vh" } },
    enableTopToolbar: false
  });

  const handleSubmit = async (data: IExam) => {
    try {
        setLoading(true);
        await serverInsertExam(data);
    } catch (err) {
        console.log(err);
        setLoading(false);
    } finally {
        navigate('/exam-management/exam-creation')
        setLoading(false);
    }
  };

  const handleQuestionTypeChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedQuestionType(typeof value === 'string' ? value.split(',') : value)
  }

  useEffect(() => {
    getExamTypeData();
    getSubjectData();
    getTopicData();
    getQuestionTypeData();
  }, [])
  
  return {
    schema,
    handleClose,
    subjectData,
    topicData,
    handleGetQuestion,
    getFilterQuestionTypeData,
    examQuestionTable,
    examQuestionData,
    setExamQuestionData,
    handleSubmit,
    handleQuestionTypeChange,
    selectedQuestionType,
    setSelectedQuestionType,
    examTypeData
  }
}

export default useNewExamCreation