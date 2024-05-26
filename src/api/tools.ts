import dateFormat from 'dateformat'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export const logger = {
  info(message: any) {
    console.log(message)
  },
  error(message: any) {
    console.error(message)
  },
}

export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue)

  const toggle = useCallback(() => {
    setValue((x) => !x)
  }, [])

  return [value, toggle, setValue]
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

export const valueTime = (creationDate: string) => {
  const currentDate = dayjs()
  const defaultTime = dayjs(creationDate)
  const seconds = currentDate.diff(defaultTime, 'seconds')
  const minutes = currentDate.diff(defaultTime, 'minutes')
  const hours = currentDate.diff(defaultTime, 'hours')
  const days = currentDate.diff(defaultTime, 'days')
  const years = currentDate.diff(defaultTime, 'years')
  if (
    seconds <= 59 &&
    minutes === 0 &&
    hours === 0 &&
    days === 0 &&
    years === 0
  ) {
    return `${seconds} с. назад`
  }
  if (minutes <= 59 && hours === 0 && days === 0 && years === 0) {
    return `${minutes} м. назад`
  }
  if (hours <= 23 && days === 0 && years === 0) {
    return `${hours} ч. назад`
  }
  if (days <= 364 && years === 0) {
    return `${days} д. назад`
  }
}
