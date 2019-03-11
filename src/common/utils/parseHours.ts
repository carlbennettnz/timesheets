export const parseHours = (str: string): number => {
  str = str.replace(/[^0-9:\.]/g, '')

  if (!str.length) return 0

  const [hoursStr, minsStr] = str.split(':').map(part => part.trim())
  const hours = parseFloat(hoursStr)
  const mins = parseFloat(minsStr) / 60 || 0

  return hours + mins
}
