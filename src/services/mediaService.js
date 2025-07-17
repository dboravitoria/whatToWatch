//variável da chave da API
const apiKey = "api_key=24eb66121fdd14b703bdc7732d396c83"

//função que busca detalhes de uma série ou filme
export const fetchDetails = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erro ao buscar detalhes')
  const data = await res.json()
  return data
}

//função que busca os créditos (elenco e equipe técnica) de uma série ou filme
export const fetchCredits = async (urlBase, qtd = 10) => {
  const res = await fetch(`${urlBase}/credits?${apiKey}`)
  if (!res.ok) throw new Error('Erro ao buscar créditos')
  const data = await res.json()
  return {
    cast: data.cast.slice(0, qtd),
    director: data.crew?.find?.(person => person.job === "Director")?.name || ""
  }
}

//função que busca o trailer de uma série ou filme
export const fetchTrailer = async (urlBase) => {
  const res = await fetch(`${urlBase}/videos?${apiKey}`)
  if (!res.ok) throw new Error('Erro ao buscar trailer')
  const data = await res.json()

  const trailer = data.results.find(
    video => video.type === "Trailer" && video.site === "YouTube"
  )
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
}
