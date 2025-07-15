import { useEffect, useState } from 'react'
import { RiMoonClearFill, FaSun } from '../utils/icones'

export default function ToggleTheme() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    // Tailwind
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)

    // Bootstrap
    document.documentElement.setAttribute('data-bs-theme', newTheme)

    // localStorage
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
