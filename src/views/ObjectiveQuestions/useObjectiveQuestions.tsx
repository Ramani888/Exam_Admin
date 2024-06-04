import React, { useEffect, useMemo, useState } from 'react'
import { ISubject } from '../../types/subject';
import { serverDeleteObjectiveQuestion, serverGetObjectiveQuestion, serverGetQuestionType, serverGetSubject, serverGetTopic } from '../../services/serverApi';
import { ITopic } from '../../types/topic';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { IObjectiveQuestion, IQuestionType } from '../../types/question';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';

const useObjectiveQuestions = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
    const [objectiveQuestionData, setObjectiveQuestionData] = useState<IObjectiveQuestion[]>([]);

    const getSubjectData = async () => {
        try {
            setLoading(true);
            const data = await serverGetSubject();
            setSubjectData(data?.data)
        } catch (err) {
            console.error(err);
            setSubjectData([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const getTopicData = async () => {
        try {
            setLoading(true);
            const data = await serverGetTopic();
            setTopicData(data?.data)
        } catch (err) {
            console.error(err);
            setTopicData([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const getQuestionTypeData = async () => {
        try {
            setLoading(true);
            const data = await serverGetQuestionType();
            setQuestionTypeData(data?.data)
        } catch (err) {
            console.error(err);
            setQuestionTypeData([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const getObjectiveQuestionData = async () => {
        try {
            setLoading(true);
            const data = await serverGetObjectiveQuestion();
            setObjectiveQuestionData(data?.data);
        } catch (error) {
            console.log(error);
            setObjectiveQuestionData([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleEditData = (row: MRT_Row<IObjectiveQuestion>) => {
      navigate('/question-bank/new-objective-question', { state: row?.original });
    }

    const openDeleteConfirmModal = (row: MRT_Row<IObjectiveQuestion>) => {
      if (window.confirm('Are you sure you want to delete this question?')) {
        handleDelete(row?.original?._id?.toString());
      }
    };

    const handleDelete = async (questionId: string) => {
      try {
          setLoading(true);
          await serverDeleteObjectiveQuestion(questionId);
          getObjectiveQuestionData();
      } catch (err) {
          console.log(err);
          setLoading(false);
      } finally {
        getObjectiveQuestionData();
        setLoading(false);
      }
    }

    const columns = useMemo<any[]>(
        () => [
            {
                accessorKey: "subjectId",
                header: "Subject",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getSubjectName(row?.original?.subjectId)}
                </Box>
                )
                },
            },
            {
                accessorKey: "topicId",
                header: "Topic",
                Cell: ({ row }: any) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getTopicName(row?.original?.topicId)}
                  </Box>
                  )
                },
            },
            {
                accessorKey: "questionTypeId",
                header: "Question Type",
                Cell: ({ row }: any) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getQuestionTypeName(row?.original?.questionTypeId)}
                  </Box>
                  )
                },
            },
            {
                accessorKey: "question",
                header: "Question",
            },
            {
                accessorKey: "mark",
                header: "Marks",
            },
        ],
        [subjectData, topicData, questionTypeData]
    );

    const getSubjectName = (subjectId?: string) => {
      const res = subjectData?.find((item) => item?._id?.toString() === subjectId)
      return res?.name
    }

    const getTopicName = (topicId?: string) => {
        const res = topicData?.find((item) => item?._id?.toString() === topicId)
        return res?.name
    }

    const getQuestionTypeName = (typeId?: string) => {
        const res = questionTypeData?.find((item) => item?._id?.toString() === typeId)
        return res?.name
    }

    const table = useMaterialReactTable({
        columns: columns,
        data: objectiveQuestionData,
        enableEditing: true,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditData(row)}>
                      <EditIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/question-bank/new-objective-question')}
            >
                New
            </Button>
        ),
    });

    useEffect(() => {
        getSubjectData();
        getTopicData();
        getQuestionTypeData();
        getObjectiveQuestionData();
    }, [])

    console.log('objectiveQuestionData', objectiveQuestionData)

    return {
        table
    }
}

export default useObjectiveQuestions