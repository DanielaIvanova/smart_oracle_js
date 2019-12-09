import { Universal, Crypto } from "@aeternity/aepp-sdk/es"
import fetch from "node-fetch"

const nodeUrl = "https://sdk-testnet.aepps.com"
const keypair = {
    publicKey: "ak_2q5ESPrAyyxXyovUaRYE6C9is93ZCXmfTfJxGH9oWkDV6SEa1R",
    secretKey: "8025bf7f8946838a1282ea220da183e43e2dc7d3ec8c6049bd0f239b496becc4f0da0490d743080cc2ce734f4b048137e78cc07b396a1fdb06f98ca5a816ee80"
}
const binanceRates = "https://api.binance.com/api/v3/ticker/price"
let client
const oracleId = "ok_2q5ESPrAyyxXyovUaRYE6C9is93ZCXmfTfJxGH9oWkDV6SEa1R"

export default async function main () {
     client = await Universal({
        url: nodeUrl,
        keypair
    })
    let o_id = await client.getOracleObject(oracleId)
    if (o_id.id  === oracleId) {
        await subscribe(oracleId, process_query)}
        else {
           await register()
           await subscribe(oracleId, process_query)

        }
}

async function register () {
    const oracle = await client.registerOracle("string", "map(string, string)", { queryFee: 10000 })
    return oracle
}

async function subscribe (oracle_id, on_query) {
    const oracle = await client.getOracleObject(oracle_id)
    oracle.pollQueries(on_query)
}

async function process_query (queries) {
        console.log(queries)
        queries.reduce(async (p, q) => {
            await p
            console.log('-------------')
            console.log(' Try to respnd to query -> ' + q.id)
            return respond(oracleId, q.id)
         }, Promise.resolve());
}

async function get_price(currency = 'ETCBTC') {
    return fetch(binanceRates + "?symbol=" + currency).then(res => res.json())
}

async function respond (oracleId, queryId) {
    const query = await client.getQueryObject(oracleId, queryId)

    if (query.response === 'or_Xfbg4g==') {
        const rate = await get_price(await query.decode(query.query))
        if (rate.hasOwnProperty('code')) {
            console.log(rate.msg)
            return Promise.resolve()
        } else {
            return await query.respond(rate.price)
        }
    }
}

export async function createQuery (currency) {
    const client = await Universal({
        url: nodeUrl,
        keypair
    })
    const oracle = await client.getOracleObject(oracleId)
    const query = await oracle.postQuery(currency)
    const response = await query.pollForResponse({ attempts: 10, interval: 2000 })
    return (await response.decode()).toString()
}