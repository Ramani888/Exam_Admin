import React from 'react'
import useCandidates from './useCandidates'
import { CandidatesContainer } from './Candidates.styled'
import { MaterialReactTable } from 'material-react-table'

const Candidates = () => {
  const {
    table
  } = useCandidates()
  return (
    <CandidatesContainer>
      <MaterialReactTable table={table} />
    </CandidatesContainer>
  )
}

export default Candidates