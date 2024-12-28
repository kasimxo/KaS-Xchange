const DATA = require('./../static/currencies.json')

export async function CurrencyRatesGET(curr) {

    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`
    console.log(url)
    try {
        let dataRaw = await fetch(url)
        let data = await dataRaw.json()
        //List of rates from EUR
        let rates = []
        DATA.forEach((obj) => {
            if (obj.key.localeCompare(curr.toUpperCase()) !== 0) {
                rates.push({ id: obj.key, value: Number.parseFloat(data[curr][obj.key.toLowerCase()]) })
            }
        })
        return rates
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export async function HistoricRatesGet(currOrigin, interval) {
    let dateTS = Date.now()
    let querys = []
    try {

        for (let i = 0; i < interval; i++) {
            //TO-DO: try to do this with promises
            let date = new Date(dateTS - (1000 * 3600 * 24 * i)).toISOString().split('T')[0].split('-')
            let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date.join('-')}/v1/currencies/${currOrigin}.json`
            let dataRaw = await fetch(url)
            let data = await dataRaw.json()
            //List of rates from EUR
            let rates = []
            DATA.forEach((obj) => {
                rates.push({ id: obj.key, value: Number.parseFloat(data[currOrigin][obj.key.toLowerCase()]) })

            })
            querys.push({ x: interval - i, order: interval - i, date: new Date(dateTS - (1000 * 3600 * 24 * i)), rates: rates })
        }
        querys.sort((a, b) => a.order - b.order)
        console.log(querys)
        return querys
    } catch (e) {
        console.error(e)
        return undefined
    }
}