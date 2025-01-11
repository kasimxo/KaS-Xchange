const DATA = require('./../static/currencies.json')

export async function CurrencyRatesGET(curr) {

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`
    try {
        const dataRaw = await fetch(URL)
        const data = await dataRaw.json()
        const rates = []
        
        DATA.forEach((obj) => {
            if (obj.key.localeCompare(curr.toUpperCase()) !== 0) {
                rates.push({ id: obj.key, value: Number.parseFloat(data[curr][obj.key.toLowerCase()]) })
            }
        })
        return rates
    } catch (e) {
        console.error(e)
    }
}

export async function HistoricRatesGet(currOrigin, interval) {
    const dateTS = Date.now()
    const querys = []
    const promises = []
    
    try {
        for (let i = 0; i < interval; i++) {
            const date = new Date(dateTS - (1000 * 3600 * 24 * i)).toISOString().split('T')[0].split('-')
            const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date.join('-')}/v1/currencies/${currOrigin}.json`
            promises.push(fetch(url))
        }

        const response = await Promise.all(promises)
        const daylyData = await Promise.all(response.map(res => res.json()))

        for (const [i, dayly] of daylyData.entries()) {
            const rates = []
            DATA.forEach((obj) => {
                rates.push({ id: obj.key, value: Number.parseFloat(dayly[currOrigin][obj.key.toLowerCase()]) })
            })
            querys.push({ x: interval - i, order: interval - i, date: new Date(dateTS - (1000 * 3600 * 24 * i)), rates: rates })
        }
        return querys
    } catch (e) {
        console.error(e)
    }
}