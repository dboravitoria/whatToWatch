//arquivo de funções para formatação de dados

//formata números para moeda, data, ano e hora
export const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

//formata a data no formato dd/mm/aaaa
export const formatDate = (date) => {
    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

//formata o ano no formato (aaaa)
export const getYear = (year) =>{
    const data = new Date(year)
    const ano = data.getFullYear()
    return `(${ano})`
  }

//formata a duração em horas e minutos
export const formatHour = (hour)=>{
      const minutos = hour;
      const horas = Math.floor(minutos / 60);
      const restoMinutos = minutos % 60; 
      return `${horas}h ${restoMinutos}min`
  }


//função que converte o código do país para nome e bandeira
export function getCountryInfo(code) {
  try {
    const displayNames = new Intl.DisplayNames(['pt-BR'], { type: 'region' })
    const name = displayNames.of(code.toUpperCase()) || code
    const flag = code
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()))
    return `${flag} ${name}`
  } catch (error) {
     return "Erro: ", error.message
  }
}

