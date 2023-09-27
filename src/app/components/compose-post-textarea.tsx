'use client'

import { useEffect, useRef, useState } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { getActiveToken } from '../utils/getActiveTokens'
import { useSearchBox } from 'react-instantsearch-hooks'
import { Autocomplete } from './Autocomplete'
import getCaretCoordinates from 'textarea-caret'

export function ComposePostArea () {
  const { pending } = useFormStatus()
  const alreadySent = useRef(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const { refine } = useSearchBox()

  const { top, height } = textAreaRef.current !== null
    ? getCaretCoordinates(textAreaRef.current, textAreaRef.current.selectionEnd)
    : { top: 0, height: 0 }

  useEffect(() => {
    if (textAreaRef.current === null) return

    if (!pending && alreadySent.current) {
      alreadySent.current = false
      textAreaRef.current.value = ''
      return
    }

    alreadySent.current = pending
  }, [pending])

  const handleInput = () => {
    if (textAreaRef.current !== null) {
      const { value, selectionEnd = 0 } = textAreaRef.current
      const { word } = getActiveToken(value, selectionEnd)
      const shouldOpenAutocomplete = /^@\w{1,15}$/.test(word)
      setShowAutocomplete(shouldOpenAutocomplete)
      shouldOpenAutocomplete && refine(word.slice(1))
    }
  }

  const handleSelection = (userHandle: string) => {
    if (textAreaRef.current === null) return
    const { value, selectionEnd = 0 } = textAreaRef.current
    const { word, range } = getActiveToken(value, selectionEnd)
    const [index] = range

    const prefix = value.substring(0, index)
    const suffix = value.substring(index + word.length)

    const newText = prefix + `@${userHandle}` + suffix + ' '

    textAreaRef.current.value = newText
    textAreaRef.current?.focus()

    setShowAutocomplete(false)
  }
  return (
    <>
        <textarea
            ref={textAreaRef}
            name="content"
            rows={4}
            className='w-full text-2xl bg-black placeholder-gray-500 p-2'
            placeholder='Write any...'
            onKeyUp={handleInput}
        >
        </textarea>

        {showAutocomplete && <Autocomplete handleSelection={handleSelection} top = {`${top + height}px`}/>}
    </>
  )
}
