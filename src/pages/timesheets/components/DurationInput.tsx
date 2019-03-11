import React, {
  useState,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect
} from 'react'

import { formatHours } from '../../../common/utils/formatHours'
import { parseHours } from '../../../common/utils/parseHours'
import { Direction } from '../types/Direction'

type DurationInputProps = {
  hours?: number
  className?: string
  move: (dir: 0 | 1 | 2 | 3) => void
}

export const DurationInput = ({
  hours,
  move,
  className
}: DurationInputProps) => {
  const [displayedValue, setDisplayedValue] = useState(formatHours(hours))

  useEffect(() => {
    setDisplayedValue(formatHours(hours))
  }, [hours])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setDisplayedValue(event.target.value)

  const handleBlur = () =>
    setDisplayedValue(formatHours(parseHours(displayedValue)))

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 37) return handleLeft(event)
    if (event.which === 38) return handleUp(event)
    if (event.which === 39) return handleRight(event)
    if (event.which === 40) return handleDown(event)
  }

  const handleUp = (event: KeyboardEvent<HTMLInputElement>) => {
    move(Direction.UP)
    event.preventDefault()
  }

  const handleRight = (event: KeyboardEvent<HTMLInputElement>) => {
    // @ts-ignore
    const start = event.target.selectionStart
    // @ts-ignore
    const end = event.target.selectionEnd

    // @ts-ignore
    if (start === end && start === event.target.value.length) {
      move(Direction.RIGHT)
      event.preventDefault()
    }
  }

  const handleDown = (event: KeyboardEvent<HTMLInputElement>) => {
    move(Direction.DOWN)
    event.preventDefault()
  }

  const handleLeft = (event: KeyboardEvent<HTMLInputElement>) => {
    // @ts-ignore
    const start = event.target.selectionStart
    // @ts-ignore
    const end = event.target.selectionEnd

    if (start === end && start === 0) {
      move(Direction.LEFT)
      event.preventDefault()
    }
  }

  // hours && console.log(hours, displayedValue, formatHours(hours))
  !displayedValue && console.log(displayedValue)
  return (
    <input
      className={className}
      value={displayedValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}
