import React, {useState, useEffect} from 'react';

const Portfolio = (props) => {

    const [currentWallet, setCurrentWallet] = useState();
    const [currentPortfolio, setCurrentPortfolio] = useState();
    const [sellQuantity, setSellQuantity] = useState();
    const [ticker, setTicker] = useState();

    const fetchWallet = async() => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json);
        setCurrentWallet(json);
    }

    const fetchPortfolio = async() => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio`);
        let json = await res.json();
        console.log(json);
        setCurrentPortfolio(json);
        
    }

    const sellStock = async() => {
        let body = {
            symbol: ticker,
            quantity: buyQuantity,
            price: currentStock.data.price
        }

        let options = {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {}
            };
        
        options.headers["Accept"] = "application/json, text/plain, */*";
        options.headers["Content-Type"] = "application/json;charset=utf-8";

        const res = await fetch(`http://localhost:3000/api/v1/portfolio/:id`, options);
        let json = await res.json();
        setBuyQuantity(0);

        alert('Sold' + sellQuantity + ' shares of ' + ticker + '!')

    }

    useEffect( () => {
        fetchWallet();
        fetchPortfolio();
    }, [])

    return (
        <div className={'col-sm-6 border p-3 font-weight-bold'}>Portfolio
            {currentPortfolio && <table className={'w-100 inline-flex font-weight-normal'}>
                <thead className={'text-center'}>
                    <th className={'inline-flex border justify-content-center'}>Value</th>
                    <th className={'border justify-content-center'}>Stock</th>
                    <th className={'border justify-content-center'}>Quantity</th>
                    <th onClick={sellStock} className={'border justify-content-center'}>Sell</th>
                </thead>
                <tbody>
                    {currentPortfolio.map((item, idx) => {
                        return <tr key={idx} className={'border text-center'}>
                            <td className={'border p-3'}>{item.symbol}</td>
                            <td className={'border p-3'}>{item.quantity}</td>
                            <td className={'border p-3'}>{item.price}</td>
                            <td onClick={sellStock} className={'border p-3'}><button className={'btn btn-outline-danger btn-lg'}>Sell</button></td>
                        </tr>
                    })}
                        
                </tbody>
            </table>}


            {!currentPortfolio && <h1>Start Investing!</h1>}
            <br/>
            <br/>
            <br/>

            {currentWallet && <h3 className={'font-weight-bold'}>Current Wallet Value: ${currentWallet.value}</h3>}
        </div>
        
        )};

export default Portfolio;