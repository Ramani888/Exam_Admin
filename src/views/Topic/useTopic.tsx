import React, { useEffect, useMemo, useState } from 'react'
import { ITopic } from '../../types/topic';
import { serverDeleteTopic, serverGetSubject, serverGetTopic, serverInsertTopic, serverUpdateTopic } from '../../services/serverApi';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ISubject } from '../../types/subject';

const useTopic = () => {
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [subjectData, setSubjectData] = useState<{value: string, label: string}[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
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

    const getSubjectData = async () => {
        try {
            setLoading(true);
            const data = await serverGetSubject();
            const finalData = data?.data?.map((item: any) => {
                return {
                    value: item?._id?.toString(),
                    label: item?.name
                }
            })
            setSubjectData(finalData)
        } catch (err) {
            console.error(err);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    const getSubjectName = (subjectId?: string) => {
        const res = subjectData?.find((item) => item?.value === subjectId)
        return res?.label
    }

    useEffect(() => {
        getTopicData()
        getSubjectData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<ITopic>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Topic Name',
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
            {
                accessorKey: 'subjectId',
                header: 'Subject Name',
                Cell: ({ row }) => {
                    return (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                      {getSubjectName(row?.original?.subjectId)}
                    </Box>
                    )
                },
                editVariant: 'select',
                editSelectOptions: subjectData as any,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.subjectId,
                    helperText: validationErrors?.subjectId,
                    onFocus: () =>
                        setValidationErrors({
                        ...validationErrors,
                        subjectId: undefined,
                    }),
                },
            },
        ],
        [validationErrors, subjectData],
    );
    const validateRequired = (value: string) => !!value.length;

    const validateSubject = (data: ITopic) => {
        return {
          name: !validateRequired(data?.name ?? '')
            ? 'Topic Name is Required'
            : '',
          subjectId: !validateRequired(data?.subjectId ?? '')
            ? 'Subject Name is Required'
            : '',
        };
      }

    const handleSubmit = async (values: any, table: any) => {
        const newValidationErrors = validateSubject(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        try {
            setLoading(true);
            await serverInsertTopic(values);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getTopicData();
            setLoading(false);
        }
    };

    const handleDelete = async (subjectId: string) => {
        try {
            setLoading(true);
            await serverDeleteTopic(subjectId);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getTopicData();
            setLoading(false);
        }
    }

    const openDeleteConfirmModal = (row: MRT_Row<ITopic>) => {
        if (window.confirm('Are you sure you want to delete this topic?')) {
            handleDelete(row?.original?._id?.toString());
        }
    };

    const handleEdit = async (values: any, table: any, row: any) => {
        const newValidationErrors = validateSubject(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
          setValidationErrors(newValidationErrors);
          return;
        }
        setValidationErrors({});
        try {
            setLoading(true);
            await serverUpdateTopic({...row?.original, ...values});
            table.setEditingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getTopicData();
            setLoading(false);
        }
    };
    
    const table = useMaterialReactTable({
        columns,
        data: topicData,
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
            minHeight: '500px',
          },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: ({values, table}) => handleSubmit(values, table),
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
            Create New Topic
          </Button>
        ),
        state: {
          isLoading: loading,
          isSaving: loading,
          showAlertBanner: false,
          showProgressBars: loading,
        },
    });
    return {
        table
    }
}

export default useTopic