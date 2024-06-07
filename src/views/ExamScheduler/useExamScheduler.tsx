import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import React, { useMemo } from 'react'
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const useExamScheduler = () => {
    const navigate = useNavigate();
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [

        ],
      []
    );

    const table = useMaterialReactTable({
        columns,
        data: [],
        enableEditing: true,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: false },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Edit">
                  <IconButton onClick={() => {}}>
                      <EditIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => {}}>
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

    return {
        table
    }
}

export default useExamScheduler