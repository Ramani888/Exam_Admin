import React from 'react'
import { ExamSchedulerContainer } from './ExamScheduler.styled'
import { MaterialReactTable } from 'material-react-table'
import useExamScheduler from './useExamScheduler'

const ExamScheduler = () => {
    const {
        table
    } = useExamScheduler()
    return (
        <ExamSchedulerContainer>
            <MaterialReactTable table={table} />
        </ExamSchedulerContainer>
    )
}

export default ExamScheduler