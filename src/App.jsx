import { useState } from "react";
import { InputBox } from "./components";
import useCurrency from "./hooks/useCurrency";

function App() {
  const [amount, setAmount] = useState(0); // Amount to convert
  const [from, setFrom] = useState("usd"); // Currency to convert from
  const [to, setTo] = useState("inr"); // Currency to convert to
  const [convertAmount, setConvertAmount] = useState(0); // Converted amount

  const currencyInfo = useCurrency(from); // Fetch currency data for 'from' currency
  const options = Object.keys(currencyInfo || {}); // Ensure options are safely handled

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertAmount(amount); // Retain the current amount
    setAmount(convertAmount); // Swap amount and converted amount
  };

  function convert() {
    if (currencyInfo[to]) {
      const rate = currencyInfo[to]; // Access the correct exchange rate
      setConvertAmount(amount * rate); // Perform the conversion
    } else {
      console.error(`Exchange rate for ${to} not found`);
    }
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.ipixels.com/attachment.php?attachmentid=3664&d=1547235598')`,
        }}
      >

        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <div className="flex justify-center font-semibold text-white text-2xl">
              <h1>CURRENCY CONVERTER</h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert(); // Trigger conversion on form submit
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOption={options}
                  onAmountChange={setAmount} // Update amount on change
                  onCurrencyChange={setFrom} // Update 'from' currency
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap} // Swap currencies and amounts
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertAmount} // Display converted amount
                  currencyOption={options}
                  onCurrencyChange={setTo} // Update 'to' currency
                  selectCurrency={to}
                  amountDisable // Disable input for converted amount
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
