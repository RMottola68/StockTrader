import React, {useState, useEffect} from 'react';
// import yahooFinance from 'yahoo-finance';
//import yahooStockPrices from 'yahoo-stock-prices';

const Search = (props) => {
 
    const [inputText, setInputText] = useState('');
    const [currentStock, setCurrentStock] = useState();
    const [ticker, setTicker] = useState();
    const [buyQuantity, setBuyQuantity] = useState(0);
    const [currentWallet, setCurrentWallet] = useState();

    const fetchWallet = async() => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json);
        setCurrentWallet(json);
    }

    useEffect( () => {
        
        fetchWallet();
    }, [])

    const fetchQuote = async () => {
            const res = await fetch(`http://localhost:3000/api/v1/portfolio/search/${inputText}`);
            let json = await res.json();
            console.log(json);
            setCurrentStock(json);
            setTicker(inputText);
            setInputText('');
    };

    const onInputChange = async (ev) => {
        console.log(ev.currentTarget.value)
        setInputText(ev.currentTarget.value);
    }

    const buyStock = async () => {
        if(buyQuantity == 0){
            alert('You can\'t buy nothing!')
        }

        let cashNeeded = buyQuantity * currentStock.data.price;
        console.log('cash needed is ' + cashNeeded);
        if(cashNeeded > currentWallet.value){
            alert('You don\'t have enough money in your wallet!')
        } else {
            let body = {
                symbol: ticker,
                quantity: buyQuantity,
                price: currentStock.data.price
            }

            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {}
                };
            
            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";

            const res = await fetch(`http://localhost:3000/api/v1/portfolio`, options);
            let json = await res.json();
            setBuyQuantity(0);

            alert('Purchased ' + buyQuantity + ' shares of ' + ticker + '!')
        
        }
    }

    const onBuyChange = async(ev) => {
        setBuyQuantity(ev.currentTarget.value);
    }

    return (
        
        <div className={"col-sm-6 border p-3 "}>
            
            <div className={'row'}>
                <div className={'col-sm border p-3 inline-flex'}>
                    <input type={'text'} value={inputText} onChange={onInputChange} placeHolder={'Your Stock Here'} className={'border w-100 py-2 px-3 rounded border-dark'} />
                </div>
                <div className={'col-sm border p-3 d-flex justify-content-center inline-flex'}>
                    <button type={'button'} onClick={fetchQuote} className={'btn btn-outline-primary btn-lg'}>Search Stocks</button>
                </div>
            </div>

            {ticker && <div className={'row'}>
                <div className={'col-sm-6 border p-3 d-flex inline-flex justify-content-center'}>
                    {/*{currentStock && <h1 className={'text-2xl'}>{currentStock.data}</h1>}*/}
                    <h1 className={'font-weight-bold'}>{ticker} : {currentStock && <span>&nbsp;&nbsp;{currentStock.data.currency} {currentStock.data.price}</span>}</h1>
                </div>

                <div className={'col-sm-6 border p-3 d-flex justify-content-center'}>
                        <input type={'number'} placeholder={'Amount'} className={'px-3 py-2 rounded border border-dark'} onChange={onBuyChange} value={buyQuantity}/>
                        <button type={'button'} className={'btn btn-outline-primary mx-4 px-5 btn-lg '} onClick={buyStock}>Buy</button>
                </div>
                
            </div>}
        </div>

        

        
        
    )

}

export default Search;