import React from 'react'
import {
    MaterialReactTable
} from 'material-react-table';
import useTopic from './useTopic';

const Topic = () => {
    const {
        table
    } = useTopic()
    return (
        <MaterialReactTable table={table} />
    )
}

export default Topic