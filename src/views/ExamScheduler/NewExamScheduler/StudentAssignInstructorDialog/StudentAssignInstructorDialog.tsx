import React, { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

interface Props {
    open: boolean;
    handleClose: () => void;
}
const StudentAssignInstructorDialog: React.FC<Props> = ({ open, handleClose }) => {
    const students = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
    }));
    const instructors = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: `Instructor ${i + 1}`,
    }));
    
    const [assignments, setAssignments] = useState<{
        [studentId: number]: number | null;
    }>(
        students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {})
    );
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [bulkInstructor, setBulkInstructor] = useState<number | null>(null);
    
    // Handle bulk assign
    const handleBulkAssign = () => {
        if (bulkInstructor !== null) {
          const updatedAssignments = { ...assignments };
          selectedStudents.forEach((studentId) => {
            updatedAssignments[studentId] = bulkInstructor;
          });
          setAssignments(updatedAssignments);
          setSelectedStudents([]); // Clear selection after assigning
        }
    };
    
    // Toggle selection for a student
    const toggleStudentSelection = (studentId: number) => {
        setSelectedStudents((prev) =>
          prev.includes(studentId)
            ? prev.filter((id) => id !== studentId)
            : [...prev, studentId]
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Assign Instructors to Students</DialogTitle>
            <DialogContent>
            {/* Bulk Assignment Dropdown */}
            <div style={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                <InputLabel>Bulk Assign Instructor</InputLabel>
                <Select
                    value={bulkInstructor || ""}
                    onChange={(e) =>
                    setBulkInstructor(e.target.value ? Number(e.target.value) : null)
                    }
                    label="Bulk Assign Instructor"
                >
                    <MenuItem value="">
                    <em>-- Select Instructor --</em>
                    </MenuItem>
                    {instructors.map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Button
                onClick={handleBulkAssign}
                variant="outlined"
                color="primary"
                style={{ marginTop: "10px" }}
                disabled={selectedStudents.length === 0 || !bulkInstructor}
                >
                Apply to Selected Students
                </Button>
            </div>

            {/* Student Table */}
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Assigned Instructor</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow key={student.id}>
                    <TableCell>
                        <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        />
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                        {assignments[student.id]
                        ? instructors.find(
                            (inst) => inst.id === assignments[student.id]
                            )?.name
                        : "-- Not Assigned --"}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StudentAssignInstructorDialog