import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICandidate } from '../../types/candidate';
import { serverDeleteCandidate, serverGetBatch, serverGetCandidata } from '../../services/serverApi';
import { IBatch } from '../../types/batch';
import EditIcon from '@mui/icons-material/Edit';
import { deleteSingleImage } from '../../utils/helpers/global';

const useCandidates = () => {
    const navigate = useNavigate();
    const [batchData, setBatchData] = useState<IBatch[]>([]);
    const [candidateData, setCandidateData] = useState<ICandidate[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "examId",
                header: "Batch Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {getBatchName(row?.original?.batchId)}
                </Box>
                )
                },
            },
            {
                accessorKey: "firstName",
                header: "Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {row?.original?.firstName + ' ' + row?.original?.middleName + ' ' + row?.original?.lastName}
                </Box>
                )
                },
            },
            {
                accessorKey: "rollNumber",
                header: "Roll Number",
            },
            {
                accessorKey: "number",
                header: "Mobile Number",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
        ],
        [batchData],
    );

    const getBatchName = (batchId?: string) => {
        const res = batchData?.find((item) => item?._id?.toString() === batchId)
        return res?.name
    }

    const openDeleteConfirmModal = (row: any) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
          handleDelete(row?.original?._id?.toString(), row?.original?.profileImg);
        }
    };

    const handleDelete = async (candidateId: any, profileImg: string) => {
        try {
            setLoading(true);
            await deleteSingleImage(profileImg);
            await serverDeleteCandidate(candidateId);
            getCandidateData();
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getCandidateData();
            setLoading(false);
        }
    }

    const handleEditData = (row: any) => {
        navigate('/candidates/new-candidate-data', { state: row?.original });
    }

    const table = useMaterialReactTable({
        columns,
        data: candidateData,
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
              onClick={() => navigate('/candidates/new-candidate-data')}
            >
                New
            </Button>
        ),
    });

    const getCandidateData = async () => {
        try {
            setLoading(true);
            const data = await serverGetCandidata();
            setCandidateData(data?.data)
        } catch (err) {
            console.error(err);
            setCandidateData([]);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

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
        getCandidateData();
        getBatchData();
    }, [])

    return {
        table
    }
}

export default useCandidates