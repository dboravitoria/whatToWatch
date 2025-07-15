import { useState } from "react"

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)

  // Essa função recebe outra função async e cuida de ativar/desativar o loading
  const withLoading = async (callback) => {
    setIsLoading(true)
    try {
      await callback()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, withLoading, setIsLoading }
}
