import { ExamType } from "../../types/exam.d"

export const getExamType = (examTypeId: number) => {
    switch (examTypeId) {
        case ExamType.SubjectiveExam:
            return 'Subjective exam'
        case ExamType.ObjectiveExam:
            return 'Objective exam'
        case ExamType.Both:
            return 'Both'
        default:
            return ''
    }
}

export const formatDateTime = (dateTimeStr: string, timeStr: string) => {
    // Parse the main date-time part
    const dateTime = new Date(dateTimeStr);

    // Parse the time part
    const [hours, minutes] = timeStr.split(":").map(Number);

    // Subtract the additional time from the date-time
    dateTime.setHours(dateTime.getHours() - hours);
    dateTime.setMinutes(dateTime.getMinutes() - minutes);

    // Format the final output
    const options: any = { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDateTime = dateTime.toLocaleString('en-US', options).replace(',', '');
    
    return formattedDateTime;
}

export const getStringDateTime = (date: string, time: string) => {
    // If date and time are provided, combine them into a single Date object
    const event = date && time ? new Date(`${date}T${time}`) : new Date();
    
    // Define the options for the desired date and time format
    const dateOptions: any = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions: any = { hour: 'numeric', minute: 'numeric', hour12: true };
  
    // Format the date and time separately
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(event);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(event);
  
    // Combine the formatted date and time
    return `${formattedDate} ${formattedTime}`;
}