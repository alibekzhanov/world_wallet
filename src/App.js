import React from 'react';
import ConverterForm from './components/ConverterForm';

const App = () => {
  return (
    <div className="currency_converter">
      <div className="logo_container">
        <img src="/static/polaris_logo.svg" alt="Polaris Logo" className="polaris_logo" />
      </div>
      
      <h1 className="converter_title">Currency Converter</h1>
      <ConverterForm />
    </div>
  );
};

export default App;
