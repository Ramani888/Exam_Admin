import React, { useEffect, useMemo, useState } from 'react'
import { IDemoRequest } from '../../types/demo'
import { serverGetDemoRequest } from '../../services/serverApi';
import {
    type MRT_ColumnDef,
    type MRT_Row,
    useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import moment from 'moment';

const useContact = () => {
    const [contactData, setContactData] = useState<IDemoRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getContactData = async () => {
        try {
            setLoading(true);
            const data = await serverGetDemoRequest();
            setContactData(data?.data)
        } catch (err) {
            console.error(err);
            setLoading(false);
            setContactData([]);
        } finally {
            setLoading(false)
        }
    }

    const demoRequestColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "companyName",
                header: "Company Name",
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "number",
                header: "Number",
            },
            {
                accessorKey: "createdAt",
                header: "Create Date",
                Cell: ({ row }) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {moment(row?.original?.createdAt).format('YYYY-MM-DD')}
                  </Box>
                  )
                },
            },
        ],
      [contactData]
    );

    const contactUsColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "subject",
                header: "Subject",
            },
            {
                accessorKey: "message",
                header: "Message",
            },
            {
                accessorKey: "createdAt",
                header: "Create Date",
                Cell: ({ row }) => {
                  return (
                  <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    {moment(row?.original?.createdAt).format('YYYY-MM-DD')}
                  </Box>
                  )
                },
            },
        ],
      [contactData]
    );

    const demoRequestTable = useMaterialReactTable({
        columns: demoRequestColumns,
        data: contactData?.filter((item) => item?.isDemoRequest),
        enableEditing: false,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
    });

    const contactUsTable = useMaterialReactTable({
        columns: contactUsColumns,
        data: contactData?.filter((item) => !item?.isDemoRequest),
        enableEditing: false,
        positionActionsColumn: "last",
        enablePagination: false,
        enableBottomToolbar: false,
        state: { isLoading: loading },
        enableStickyHeader: true,
        muiTableContainerProps: { sx: { maxHeight: "65vh" } },
    });

    useEffect(() => {
        getContactData()
    }, [])

    return {
        demoRequestTable,
        contactUsTable
    }
}

export default useContact