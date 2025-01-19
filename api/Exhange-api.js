const DATA = require('./../static/currencies.json')

export async function CurrencyRatesGET(curr) {
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`
    return fetch(URL)
        .then((dataRaw) => dataRaw.json())
        .then((data) => DATA
            .filter(({key}) => key.localeCompare(curr.toUpperCase()) !== 0)
            .map(({key}) => ({
                id: key,
                value: Number.parseFloat(data[curr][key.toLowerCase()])
            }))
        )
        .catch((e) => {
            console.log(e)
        })
}

export async function HistoricRatesGet(currOrigin, interval) {
    const dateTS = Date.now()
    const queries = Array(interval)
        .fill()
        .map((_, i) => new Date(dateTS - (1000 * 3600 * 24 * i)).toISOString().split('T')[0])
        .map((date) => `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currOrigin}.json`)
        .map((url, i) => fetch(url)
            .then((response) => response.json())
            .then((daily) => {
                const rates = DATA.map(({key}) => ({
                    id: key,
                    value: Number.parseFloat(daily[currOrigin][key.toLowerCase()]),
                }))
                
                return {
                    x: interval - i,
                    date: new Date(dateTS - (1000 * 3600 * 24 * i)),
                    rates,
                }
            })
        )

    return Promise.all(queries)
        .catch((e) => {
            console.log(e)
        })
}