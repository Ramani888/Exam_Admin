import React, { useEffect, useMemo, useState } from 'react'
import { IQuestionType, ISubjectiveQuestion } from '../../types/question';
import {
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
} from 'material-react-table';
import { serverDeleteSubjectiveQuestion, serverGetQuestionType, serverGetSubject, serverGetSubjectiveQuestion, serverGetTopic } from '../../services/serverApi';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ISubject } from '../../types/subject';
import { ITopic } from '../../types/topic';
import AddIcon from '@mui/icons-material/Add';
import { getUserData } from '../../utils/helpers/global';

const useSubjectiveQuestions = () => {
    const userData = getUserData();
    const subijectivePermission = userData?.permissionGroups?.find((item: any) => item?.group === 'Subjective Question')?.permissions
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
    const [subjectQuestionData, setSubjectiveQuestionData] = useState<ISubjectiveQuestion[]>([])
    const columns = useMemo<MRT_ColumnDef<ISubjectiveQuestion>[]>(
        () => [
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

    const getSubjectQuestionData = async () => {
        try {
          setLoading(true);
          const res = await serverGetSubjectiveQuestion();
          setSubjectiveQuestionData(res?.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    };

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

    useEffect(() => {
        getSubjectQuestionData()
        getSubjectData()
        getTopicData()
        getQuestionTypeData()
    }, [])

    const handleDelete = async (questionId: string) => {
      try {
          setLoading(true);
          await serverDeleteSubjectiveQuestion(questionId);
          getSubjectQuestionData();
      } catch (err) {
          console.log(err);
          setLoading(false);
      } finally {
        getSubjectQuestionData();
          setLoading(false);
      }
    }

    const openDeleteConfirmModal = (row: MRT_Row<ISubjectiveQuestion>) => {
      if (window.confirm('Are you sure you want to delete this question?')) {
        handleDelete(row?.original?._id?.toString());
      }
    };

    const handleEditData = (row: MRT_Row<ISubjectiveQuestion>) => {
      navigate('/question-bank/new-subjective-question', { state: row?.original });
    }

    const table = useMaterialReactTable({
        columns,
        data: subjectQuestionData,
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
                <IconButton onClick={() => handleEditData(row)} disabled={!subijectivePermission?.edit}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton color="error" onClick={() => openDeleteConfirmModal(row)} disabled={!subijectivePermission?.delete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
          </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/question-bank/new-subjective-question')}
            disabled={!subijectivePermission?.add}
          >
            New
          </Button>
        ),
    });
    return {
        table,
    }
}

export default useSubjectiveQuestions