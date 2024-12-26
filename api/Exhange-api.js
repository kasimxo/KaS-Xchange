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

export async function HistoricRatesGet(curr) {
    let dateTS = Date.now()



    let querys = []
    try {

        for (let i = 0; i < 30; i++) {
            //TO-DO: try to do this with promises
            let date = new Date(dateTS - (1000 * 3600 * 24 * i)).toISOString().split('T')[0].split('-')
            let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date.join('-')}/v1/currencies/${curr}.json`
            let dataRaw = await fetch(url)
            let data = await dataRaw.json()
            //List of rates from EUR
            let rates = []
            DATA.forEach((obj) => {
                if (obj.key.localeCompare(curr.toUpperCase()) !== 0) {
                    rates.push({ id: obj.key, value: Number.parseFloat(data[curr][obj.key.toLowerCase()]) })
                }
            })
            querys.push({ order: 30 - i, date: date.join('-'), rates: rates })
        }
        console.log(querys)
        return querys
    } catch (e) {
        console.error(e)
        return undefined
    }
}