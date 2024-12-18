import React from 'react'
import { MaterialReactTable } from 'material-react-table'
import useInstructors from './useInstructors'

const Instructors = () => {
    const { table } = useInstructors();
    return (
        <MaterialReactTable table={table} />
    )
}

export default Instructors