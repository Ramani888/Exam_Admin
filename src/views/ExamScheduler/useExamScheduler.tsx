import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { serverDeleteExamSchedule, serverGetBatch, serverGetExamData, serverGetExamSchedule } from '../../services/serverApi';
import { IExam, IExamSchedule } from '../../types/exam';
import { formatDateTime, getStringDateTime } from '../../utils/consts/exam';
import moment from 'moment';
import { IBatch } from '../../types/batch';

const useExamScheduler = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [examScheduleData, setExamScheduleData] = useState<IExamSchedule[]>([]);

    const navigate = useNavigate();
    const columns = useMemo<MRT_ColumnDef<IExamSchedule>[]>(
        () => [
            {
                accessorKey: "examId",
                header: "Exam Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.examData?.name}
                </Box>
                )
                },
            },
            {
                accessorKey: "batchId",
                header: "Batch Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.batchData?.name}
                </Box>
                )
                },
            },
            {
                accessorKey: "starDate",
                header: "Start Date",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getStringDateTime(moment(row?.original?.startDate).format('YYYY-MM-DD'), String(row?.original?.startTime))}
                </Box>
                )
                },
            },
            {
                accessorKey: "endDate",
                header: "End Date",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getStringDateTime(moment(row?.original?.endDate).format('YYYY-MM-DD'), row?.original?.endTime)}
                </Box>
                )
                },
            },
        ],
      []
    );

    const handleEditData = (row: MRT_Row<IExamSchedule>) => {
        navigate('/exam-management/new-exam-scheduler', { state: row?.original });
    }

    const table = useMaterialReactTable({
        columns,
        data: examScheduleData,
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
              onClick={() => navigate('/exam-management/new-exam-scheduler')}
            >
                New
            </Button>
        ),
    });

    const openDeleteConfirmModal = (row: MRT_Row<IExamSchedule>) => {
        if (window.confirm('Are you sure you want to delete this exam schedule?')) {
          handleDelete(row?.original?._id?.toString());
        }
    };

    const handleDelete = async (examScheduleId: any) => {
        try {
            setLoading(true);
            await serverDeleteExamSchedule(examScheduleId);
            getExamScheduleData();
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getExamScheduleData();
            setLoading(false);
        }
    }

    const getExamScheduleData = async () => {
        try {
            setLoading(true);
            const data = await serverGetExamSchedule();
            setExamScheduleData(data?.data);
        } catch (error) {
            console.log(error);
            setExamScheduleData([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getExamScheduleData()
    }, [])

    return {
        table
    }
}

export default useExamScheduler