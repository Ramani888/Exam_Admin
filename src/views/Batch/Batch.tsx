import React from 'react'
import useBatch from './useBatch';
import {
    MaterialReactTable
} from 'material-react-table';

const Batch = () => {
    const {
        table
    } = useBatch();
    return (
        <MaterialReactTable table={table} />
    )
}

export default Batch