import { useState, useEffect } from 'react'
import { RiMoonClearFill, FaSun } from '../utils/icones'

export default function ToggleTheme() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
    document.documentElement.setAttribute('data-bs-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.add(savedTheme)
    document.documentElement.setAttribute('data-bs-theme', savedTheme)
  }, [])

  return (
    <button onClick={toggleTheme} className="flex items-center gap-2">
      {theme === 'light' ? <RiMoonClearFill /> : <FaSun />}
      <span>Tema</span>
    </button>
  )
}
