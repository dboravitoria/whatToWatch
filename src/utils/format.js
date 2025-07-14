export const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

export const formatDate = (date) => {
    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

export const getYear = (year) =>{
    const data = new Date(year)
    const ano = data.getFullYear()
    return `(${ano})`
  }
export const formatHour = (hour)=>{
      const minutos = hour;
      const horas = Math.floor(minutos / 60); // 1
      const restoMinutos = minutos % 60;      // 30
      return `${horas}h ${restoMinutos}min`
 
  }

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

