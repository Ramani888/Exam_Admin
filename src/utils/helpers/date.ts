import moment from "moment";

export const getStringDate = (date?: Date) => {
    const event = date ? new Date(date) : new Date()
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return event.toLocaleDateString(undefined, options)
}

export const getFormatStandardDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const getCurrentTime = (): string => {
  const now = new Date();
  
  // Get the hours and minutes
  const hours = now.getHours().toString().padStart(2, '0');  // Ensures 2 digits (e.g., '07' instead of '7')
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensures 2 digits (e.g., '09' instead of '9')
  
  // Return time in HH:MM format
  return `${hours}:${minutes}`;
};

export const getCurrentDate = (): string => {
  const now = new Date();

  // Get the year, month, and day
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-based, so add 1
  const day = now.getDate().toString().padStart(2, '0');  // Ensures 2 digits for the day

  // Return date in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
};