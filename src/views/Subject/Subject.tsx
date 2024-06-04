import React from 'react'
import {
    MaterialReactTable
} from 'material-react-table';
import useSubject from './useSubject';

const Subject = () => {
    const {
        table
    } = useSubject();
    return (
        <MaterialReactTable table={table} />
    )
}

export default Subject