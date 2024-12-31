import React, { useState, useEffect } from 'react';
import CurrencySelect from './CurrencySelect';

const ConverterForm = () => {
    const API_KEY = "9d508ad18f44f9cb39764ece";
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("KZT");
    const [result, setResult] = useState("");

    // Swap the values of fromCurrency and toCurrency
    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Function to fetch the exchange rate and update the result
    const getExchangeRate = async () => {
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error("Something went wrong!");

            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(3);
            setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle form submission
    const handleFromSubmit = (e) => {
        e.preventDefault();
        getExchangeRate();
    };

    // Fetch exchange rate on initial render
    useEffect(() => {
        getExchangeRate();
    }, []);

    return (
        <form className="converter_form" onSubmit={handleFromSubmit}>
            <div className="form_group">
                <label className="form_label">Enter Amount</label>
                <input
                    type="number"
                    className="form_input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className="form_group form_currency_group">
                <div className="form_section">
                    <label className="form_label">From</label>
                    <CurrencySelect
                        selectedCurrency={fromCurrency}
                        handleCurrency={(e) => setFromCurrency(e.target.value)}
                    />
                </div>

                <div className="swap_icon" onClick={handleSwapCurrencies}>
                    <img src="/static/currency_exchange_icon.svg" alt="Currency Exchange Icon" />
                </div>

                <div className="form_section">
                    <label className="form_label">To</label>
                    <CurrencySelect
                        selectedCurrency={toCurrency}
                        handleCurrency={(e) => setToCurrency(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit" className="submit_button">Get Exchange Rate</button>
            <p className="exchange_rate_result">{result}</p>
        </form>
    );
};

export default ConverterForm;
