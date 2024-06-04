import React, { useEffect, useMemo, useState } from 'react'
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { ISubject } from '../../types/subject';
import { serverDeleteSubject, serverGetSubject, serverInsertSubject, serverUpdateSubject } from '../../services/serverApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

const useSubject = () => {
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
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
        getSubjectData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<ISubject>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Subject Name',
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
            await serverInsertSubject(values);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    };

    const handleDelete = async (subjectId: string) => {
        try {
            setLoading(true);
            await serverDeleteSubject(subjectId);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    }

    const openDeleteConfirmModal = (row: MRT_Row<ISubject>) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
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
            await serverUpdateSubject({...row?.original, ...values});
            table.setEditingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getSubjectData();
            setLoading(false);
        }
    };
    
    const table = useMaterialReactTable({
        columns,
        data: subjectData,
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
            Create New Subject
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

export default useSubject