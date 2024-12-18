import React, { useEffect, useMemo, useState } from 'react'
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { serverDeleteInstructor, serverGetInstructors } from '../../services/serverApi';
import { Instructor } from '../../types/instructor';
import Avatar from '@mui/material/Avatar';
import { getUserData } from '../../utils/helpers/global';

const useInstructors = () => {
    const userData = getUserData();
    const instructorPermission = userData?.permissionGroups?.find((item: any) => item?.group === 'Instructors')?.permissions
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [instructorsData, setInstructorsData] = useState<Instructor[]>([])

    const getInstructorsData = async () => {
            try {
                setLoading(true);
                const data = await serverGetInstructors();
                setInstructorsData(data?.data)
            } catch (err) {
                console.error(err);
                setInstructorsData([]);
                setLoading(false);
            } finally {
                setLoading(false)
            }
        }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "firstName",
                header: "Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <Avatar alt="Remy Sharp" src={row?.original?.profileImg} /> {row?.original?.firstName + ' ' + row?.original?.middleName + ' ' + row?.original?.lastName}
                </Box>
                )
                },
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "number",
                header: "Mobile Number",
            }
        ],
        [],
    );

    const handleEditData = (row: any) => {
        navigate('/candidates/new-instructor', { state: row?.original });
    }

    const openDeleteConfirmModal = (row: any) => {
        if (window.confirm('Are you sure you want to delete this instructor?')) {
          handleDelete(row?.original?._id?.toString());
        }
    };

    const handleDelete = async (instructorId: any) => {
        try {
            setLoading(true);
            await serverDeleteInstructor(instructorId);
            getInstructorsData();
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            getInstructorsData();
            setLoading(false);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: instructorsData,
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
                  <IconButton onClick={() => handleEditData(row)} disabled={!instructorPermission?.edit}>
                      <EditIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => openDeleteConfirmModal(row)} disabled={!instructorPermission?.delete}>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/candidates/new-instructor')}
              disabled={!instructorPermission?.add}
            >
                New
            </Button>
        ),
    });

    useEffect(() => {
        getInstructorsData();
    }, [])
    
    return {
        table
    }
}

export default useInstructors