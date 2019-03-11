export const formatHours = (hours?: number) => {
  hours = Math.max(0, hours || 0)

  const hoursPart = Math.floor(hours)
  const minutesPart = Math.floor((hours % 1) * 60)
    .toString()
    .padStart(2, '0')

  return `${hoursPart}:${minutesPart}`
}
