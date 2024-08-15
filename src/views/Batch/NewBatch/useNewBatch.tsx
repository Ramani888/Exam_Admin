import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverGetCandidata } from '../../../services/serverApi';
import { ICandidate } from '../../../types/candidate';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IBatch } from '../../../types/batch';

const useNewBatch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [candidateData, setCandidateData] = useState<ICandidate[]>([])
    const [selectedStudent, setSelectedStudent] = useState<ICandidate[]>([])
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        name: Yup.string().required("Please enter a name.*"),
        discription: Yup.string().required("Please enter a discription.*")
    });


    const handleClose = () => {
        navigate('/candidates/batch')
    }

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

    const handleSelect = (data: ICandidate) => {
        setSelectedStudent(prevSelected => {
            // Check if the candidate is already in the selected list
            const isAlreadySelected = prevSelected.some(candidate => candidate?._id === data?._id);
    
            if (isAlreadySelected) {
                // Remove the candidate from the list
                return prevSelected.filter(candidate => candidate?._id !== data?._id);
            } else {
                // Add the candidate to the list
                return [...prevSelected, data];
            }
        });
    }

    const handleSelectAll = () => {
        if (candidateData?.length === selectedStudent?.length) {
            setSelectedStudent([]);
        } else {
            setSelectedStudent(candidateData);
        }
    }

    const isSelected = (id: string) => {
        const findData = selectedStudent.find((student) => student?._id === id);
        return findData ? true : false;
    }

    const columns = useMemo<MRT_ColumnDef<ICandidate>[]>(
        () => [
            {
                accessorKey: "firstName",
                header: "Student Name",
                Cell: ({ row }: any) => {
                return (
                <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    <Checkbox checked={isSelected(row?.original?._id)} onChange={() => handleSelect(row?.original)} />
                    {row?.original?.firstName + ' ' + row?.original?.lastName}
                </Box>
                )
                },
            },
        ],
        [candidateData, selectedStudent],
    );

    const table = useMaterialReactTable({
        columns,
        data: candidateData,
        enableEditing: false,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "50vh" } },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                <FormControlLabel control={<Checkbox checked={selectedStudent?.length === candidateData?.length} onChange={() => handleSelectAll()} />} label="Select All" />
            </Box>
        ),
    });

    const handleSubmit = async (data: IBatch) => {
        try {
            setLoading(true);
            console.log(data);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCandidateData()
    }, [])

    return {
        schema,
        handleClose,
        loading,
        table,
        selectedStudent,
        handleSubmit
    }
}

export default useNewBatch