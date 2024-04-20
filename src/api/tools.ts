import dateFormat from 'dateformat'

export const logger = {
  info(message: any) {
    console.log(message)
  },
  error(message: any) {
    console.error(message)
  },
}

export const prettyDate = (date: string, year: boolean = false) => {
  if (!year) {
    const d = new Date(date)
    return dateFormat(d, 'dd.mm HH:MM')
  }
  return date?.substring(0, 10) || ''
}

export const maxString = (val: string, len: number) => {
  if (val.length > len) {
    return `${val.substring(0, len)}...`
  }
  return val
}
