import { useEffect, useState } from 'react'

// Easy to identify on LocalStorage
const PREFIX = 'myshoperon-chat-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key

  // Get the information from LocalStorage and parse it to JSON format
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  // Anytime our key or value changes, useEffect will save it on LocalStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
