import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ISubject } from '../../../types/subject';
import { serverGetQuestionType, serverGetSubject, serverGetTopic, serverInsertSubjectiveQuestion, serverUpdateSubjectiveQuestion } from '../../../services/serverApi';
import { ITopic } from '../../../types/topic';
import { IQuestionType, ISubjectiveQuestion } from '../../../types/question';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useAddSubjectiveQuestions = () => {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const [answerKeyData, setAnswerKeyData] = useState<{id: number, name: string}[]>([]);

    const schema = Yup.object().shape({
        subjectId: Yup.string().required("Please select a subject.*"),
        topicId: Yup.string().required("Please select a topic.*"),
        questionTypeId: Yup.string().required("Please select a question type.*"),
        question: Yup.string().required("Please enter a question.*"),
        mark: Yup.string().required("Please enter a mark.*")
    });

    const handleClose = () => {
        navigate('/question-bank/subjective-questions')
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

    const handleSubmit = async (data: ISubjectiveQuestion) => {
        try {
            setLoading(true);
            await serverInsertSubjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/subjective-questions')
            setLoading(false);
        }
    };

    const handleSubmitKey = async (values: any, table: any) => {
        const newValidationErrors = validateSubject(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        try {
            setLoading(true);
            setAnswerKeyData([...answerKeyData, {id: answerKeyData?.length + 1, name: values?.name}])
            // await serverInsertSubject(values);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    };

    const handleUpdate = async (data: ISubjectiveQuestion) => {
        try {
            setLoading(true);
            await serverUpdateSubjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/subjective-questions')
            setLoading(false);
        }
    }

    const columns = useMemo<MRT_ColumnDef<ISubject>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Keys',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    onFocus: () =>
                        setValidationErrors({
                        ...validationErrors,
                        name: undefined,
                    }),
                },
            },
        ],
        [validationErrors],
    );

    const validateRequired = (value: string) => !!value.length;

    const validateSubject = (data: ISubject) => {
        return {
          name: !validateRequired(data?.name ?? '')
            ? 'Answer Key is Required'
            : '',
        };
    }

    const handleEdit = async (values: any, table: any, row: any) => {
        const newValidationErrors = validateSubject(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        try {
            setLoading(true);
            const newData = answerKeyData.map((item) => 
                item?.id === row?.original?.id ? { ...item, name: values?.name } : item
            );
            setAnswerKeyData(newData)
            table.setEditingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            const newData = answerKeyData.filter(item => item.id !== Number(id))?.map((item, index) => {
                return {
                    ...item,
                    id: index + 1,
                }
            });
            setAnswerKeyData(newData)
            // await serverDeleteSubject(subjectId);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    }

    const openDeleteConfirmModal = (row: any) => {
        if (window.confirm('Are you sure you want to delete this key?')) {
            handleDelete(row?.original?.id?.toString());
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: answerKeyData,
        createDisplayMode: 'row',
        editDisplayMode: 'row',
        enableEditing: true,
        positionActionsColumn: 'last',
        getRowId: (row) => row?._id?.toString(),
        muiToolbarAlertBannerProps: true
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined,
        muiTableContainerProps: {
          sx: {
            minHeight: '100px',
          },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: ({values, table}) => handleSubmitKey(values, table),
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: ({values, table, row}) => handleEdit(values, table, row),
        renderRowActions: ({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
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
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Create New Key
          </Button>
        ),
        state: {
          isLoading: loading,
          isSaving: loading,
          showAlertBanner: false,
          showProgressBars: loading,
        },
    });

    useEffect(() => {
        getSubjectData()
        getTopicData()
        getQuestionTypeData()
    }, [])

    return {
        schema,
        handleClose,
        subjectData,
        loading,
        topicData,
        questionTypeData,
        handleSubmit,
        handleUpdate,
        table,
        answerKeyData
    }
}

export default useAddSubjectiveQuestions