const DATA = require('./../static/currencies.json')

export async function CurrencyRatesGET() {

    let url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
    try {
        let dataRaw = await fetch(url)
        let data = await dataRaw.json()
        //List of rates from EUR
        let rates = []
        DATA.forEach((obj) => {
            if (obj.key.localeCompare('EUR') !== 0) {
                rates.push({ id: obj.key, value: Number.parseFloat(data.eur[obj.key.toLowerCase()]) })
            }
        })
        return rates
    } catch (e) {
        console.error(e)
        return undefined
    }
}