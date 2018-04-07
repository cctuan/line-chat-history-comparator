

const addPaddingZero = (s) => {
  return s > 10 ? (s + '') : ('0' + s)
}

export const toHourMins = (unix) => {
  const d = new Date(unix)
  return `${addPaddingZero(d.getHours())}:${addPaddingZero(d.getMinutes())}`
}
