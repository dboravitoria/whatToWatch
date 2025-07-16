import { useEffect, useState } from 'react'
import { RiMoonClearFill, FaSun } from '../utils/icones'

export default function ToggleTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  return (
    <button onClick={toggleTheme} className="flex items-center gap-2">
      {theme === 'light' ? <RiMoonClearFill /> : <FaSun />}
      <span>Tema</span>
    </button>
  )
}
