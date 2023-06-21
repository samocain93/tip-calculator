import { useState } from 'react';
import './styles.css';

export default function App() {
  return (
    <div className='App'>
      <Header text={'TIP CALCULATOR'} />
      <TipCalculator />
    </div>
  );
}

function Header({ text }) {
  return (
    <h1>{text}</h1>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percentage1, setPercentage1] = useState(20);
  const [percentage2, setPercentage2] = useState(20);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill('');
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className='calculator'>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div className='bill'>
      <label>How much was the total bill? </label>
      <input
        type='text'
        placeholder='(Total in $)'
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div className='percentage'>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value='10'>Terrible (10%)</option>
        <option value='15'>Good (15%)</option>
        <option value='20'>Awesome! (20%)</option>
        <option value='25'>OUTSTANDING! (25%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + $ {tip})
    </h3>
  );
}

function Reset({ onReset }) {
  return <button className='btn' onClick={onReset}>Reset</button>;
}
