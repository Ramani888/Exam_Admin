import React, { useEffect, useMemo, useState } from 'react'
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { serverDeleteExam, serverGetExamData, serverGetQuestionType, serverGetSubject, serverGetTopic } from '../../services/serverApi';
import { IExam } from '../../types/exam';
import { getExamType } from '../../utils/consts/exam';
import { ISubject } from '../../types/subject';
import { ITopic } from '../../types/topic';
import { IQuestionType } from '../../types/question';
import moment from 'moment';

export const useExamCreation = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [examData, setExamData] = useState<IExam[]>([]);
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);

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

    const columns = useMemo<MRT_ColumnDef<IExam>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "examTypeId",
                header: "Exam Type",
                Cell: ({ row }) => {
                    return (
                        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                            {getExamType(Number(row?.original?.examTypeId))}
                        </Box>
                    )
                },
            },
            {
                accessorKey: "subjectId",
                header: "Subject",
                Cell: ({ row }) => {
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
                Cell: ({ row }) => {
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
                Cell: ({ row }) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getQuestionTypeName(row?.original?.questionTypeId)}
                  </Box>
                  )
                },
            },
            {
                accessorKey: "examDuration",
                header: "Exam Duration (Minutes)",
            },
            {
                accessorKey: "questions",
                header: "Total Questions",
                Cell: ({ row }) => {
                    return (
                        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row?.original?.questions?.length}
                        </Box>
                    )
                },
            },
            {
                accessorKey: "passingMark",
                header: "Passing Mark",
            },
            {
                accessorKey: "totalMark",
                header: "Total Mark",
            },
            {
                accessorKey: "createdAt",
                header: "Create Date",
                Cell: ({ row }) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {moment(row?.original?.createdAt).format('YYYY-MM-DD')}
                  </Box>
                  )
                },
            },
        ],
      [subjectData, topicData, questionTypeData]
    );

    const getExamData = async () => {
        try {
            setLoading(true)
            const data = await serverGetExamData();
            setExamData(data?.data);
        } catch (err) {
            setLoading(false);
            setExamData([]);
        } finally {
            setLoading(false);
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

    const openDeleteConfirmModal = (row: MRT_Row<IExam>) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
          handleDelete(row?.original?._id?.toString());
        }
    };

    const handleDelete = async (examId: string) => {
        try {
            setLoading(true);
            await serverDeleteExam(examId);
            getExamData();
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getExamData();
            setLoading(false);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: examData,
        enableEditing: true,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
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
              onClick={() => navigate('/exam-management/new-exam-creation')}
            >
                New
            </Button>
        ),
    });

    useEffect(() => {
        getExamData();
        getSubjectData();
        getTopicData();
        getQuestionTypeData();
    }, [])

    return {
        table
    }

}
