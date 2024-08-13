import React, { useEffect, useMemo, useState } from 'react'
import { IBatch } from '../../types/batch';
import { serverDeleteBatch, serverGetBatch, serverInsertBatch, serverUpdateBatch } from '../../services/serverApi';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const useBatch = () => {
    const navigate = useNavigate();
    const [batchData, setBatchData] = useState<IBatch[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const getBatchData = async () => {
        try {
            setLoading(true);
            const data = await serverGetBatch();
            setBatchData(data?.data)
        } catch (err) {
            console.error(err);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBatchData()
    }, [])

    const columns = useMemo<MRT_ColumnDef<IBatch>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Batch Name',
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
                accessorKey: 'description',
                header: 'Batch Description',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.description,
                    helperText: validationErrors?.description,
                    onFocus: () =>
                        setValidationErrors({
                        ...validationErrors,
                        description: undefined,
                    }),
                },
            },
        ],
        [validationErrors],
    );
    const validateRequired = (value: string) => !!value.length;

    const validateSubject = (data: IBatch) => {
        return {
          name: !validateRequired(data?.name ?? '')
            ? 'Batch Name is Required'
            : '',
          description: !validateRequired(data?.description ?? '')
            ? 'Batch description is Required'
            : ''
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
            await serverInsertBatch(values);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getBatchData();
            setLoading(false);
        }
    };

    const handleDelete = async (subjectId: string) => {
        try {
            setLoading(true);
            await serverDeleteBatch(subjectId);
            table.setCreatingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getBatchData();
            setLoading(false);
        }
    }

    const openDeleteConfirmModal = (row: MRT_Row<IBatch>) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
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
            await serverUpdateBatch({...row?.original, ...values});
            table.setEditingRow(null);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getBatchData();
            setLoading(false);
        }
    };
    
    const table = useMaterialReactTable({
        columns,
        data: batchData,
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
            // onClick={() => {
            //   table.setCreatingRow(true);
            // }}
            onClick={() => navigate('/candidates/new-batch')}
          >
            Create New Batch
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

export default useBatch