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
        let promises = []
        for (let i = 0; i < interval; i++) {
            let promise = new Promise(async (resolve, reject) => {
                let date = new Date(dateTS - (1000 * 3600 * 24 * i)).toISOString().split('T')[0].split('-')
                let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date.join('-')}/v1/currencies/${currOrigin}.json`
                let data = fetch(url).then((value) => value.json())
                resolve(data)
            })
            promises.push(promise)
        }

        await Promise.all(promises).then((values) => {
            values.forEach((v, i) => {
                //List of rates from EUR
                let rates = []
                DATA.forEach((obj) => {
                    rates.push({ id: obj.key, value: Number.parseFloat(v[currOrigin][obj.key.toLowerCase()]) })
                })
                querys.push({ x: interval - i, order: interval - i, date: new Date(dateTS - (1000 * 3600 * 24 * i)), rates: rates })
            })
            querys.sort((a, b) => a.order - b.order)
            console.log("Querys ", querys)
        })
        return querys
    } catch (e) {
        console.error(e)
        return undefined
    }
}