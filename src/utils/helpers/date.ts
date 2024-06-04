import moment from "moment";

export const getStringDate = (date?: Date) => {
    const event = date ? new Date(date) : new Date()
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return event.toLocaleDateString(undefined, options)
}

export const getFormatStandardDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
};