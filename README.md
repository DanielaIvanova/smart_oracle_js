# Smart Oracle

## Description
**Smart Oracle** is a JS console application, made to automate the oracle job. 
User can load any account or even existing oracle in it.

If the given account **is not** an oracle yet, we register it.

If the given account **is already** an oracle we proceed to next step.

The next step is that our oracle will be making cycling requests to **AEternity blockchain node** and will list all queries sent to it, process them(for example we decided to connect it to Binance API, in order to get the trading course) and if the query is in right format(Like "BTCLTC"), the oracle will try to get the information from the data provider and if it succeeds, will respond to the query.

## Usage
1. Clone the project and get the dependencies:
```
git clone https://github.com/DanielaIvanova/smart_oracle_js
cd smart_oracle_js

```
2. Now you have to start `cli.js`:
```
node cli.js
```
3. Query an oracle:
```
node createQuery.js ask-rate BNBBTC
```
