import map from 'lodash.map';
import { EInputTypes } from '../../types';
import { useCalculator } from '../../hooks/useCalculator';
import { calculatorOperations, digitKeys } from '../../utils/helpers';
import { CalculatorDisplay } from '../CalculatorDisplay';
import { CalculatorKey } from '../CalculatorKey';
import './Calculator.scss';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti-explosion';

export const Calculator: React.FC = () => {
  const { state, handleClick } = useCalculator();
  const [confetti, setConfetti] = useState<boolean>(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;

    //
    if (key === '5' || key === '6') {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <div className="calculator" data-testid="react-mac-calculator">
      {confetti && <Confetti />}
      <CalculatorDisplay value={state.displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey
              className="key-clear"
              onClick={() => handleClick(state.displayValue !== '0' ? EInputTypes.clearDisplay : EInputTypes.clearAll)}
              keyValue={state.displayValue !== '0' ? 'C' : 'AC'}
            />
            <CalculatorKey className="key-sign" onClick={() => handleClick(EInputTypes.toggleSign)} keyValue="±" />
            <CalculatorKey className="key-percent" onClick={() => handleClick(EInputTypes.inputPercent)} keyValue="%" />
          </div>
          <div className="digit-keys">
            {digitKeys.map((digit) => (
              <CalculatorKey
                key={`key-${digit}`}
                className={`key-${digit}`}
                onClick={() => handleClick(EInputTypes.inputDigit, digit)}
                keyValue={digit}
              />
            ))}
            <CalculatorKey
              className="key-dot"
              onClick={() => handleClick(EInputTypes.inputDot)}
              keyValue="●"
              disabled={state.displayValue.includes('.')}
            />
          </div>
        </div>
        <div className="operator-keys">
          {map(calculatorOperations, (value, key) =>
            value.show ? (
              <CalculatorKey
                key={`key-${value.name}`}
                className={`key-${value.name}`}
                onClick={() => handleClick(EInputTypes.performOperation, key)}
                keyValue={value.symbol}
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

// import map from 'lodash.map';
// import { EInputTypes } from '../../types';
// import { useCalculator } from '../../hooks/useCalculator';
// import { calculatorOperations, digitKeys } from '../../utils/helpers';
// import { CalculatorDisplay } from '../CalculatorDisplay';
// import { CalculatorKey } from '../CalculatorKey';
// import './Calculator.scss';
// import React, { useState, useEffect, useCallback } from 'react';
// import ConfettiExplosion from 'react-confetti-explosion';

// const Calculator: React.FC = () => {
//   const { state, handleClick } = useCalculator();
//   const [confetti, setConfetti] = useState<boolean>(false);

//   // Handle key press events
//   const handleKeyPress = useCallback(
//     (event: KeyboardEvent) => {
//       if (event.key === 'Enter') {
//         const displayValue = state.displayValue;
//         const operations = Object.keys(calculatorOperations);
//         let hasFive = false;
//         let hasSix = false;

//         // Check if the display value contains 5 and 6
//         for (let i = 0; i < operations.length; i++) {
//           if (displayValue.includes('5') && displayValue.includes('6')) {
//             setConfetti(true);
//             setTimeout(() => setConfetti(false), 3000); // Confetti for 3 seconds
//             break;
//           }
//         }
//       }
//     },
//     [state.displayValue],
//   );

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyPress);
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [handleKeyPress]);

//   // Handle calculation when '=' is clicked
//   // const handleCalculate = () => {
//   //   handleClick(EInputTypes.calculate);
//   // };

//   return (
//     <div className="calculator" data-testid="react-mac-calculator">
//       {confetti && <ConfettiExplosion />}
//       <CalculatorDisplay value={state.displayValue} />
//       <div className="calculator-keypad">
//         <div className="input-keys">
//           <div className="function-keys">
//             <CalculatorKey
//               className="key-clear"
//               onClick={() => handleClick(state.displayValue !== '0' ? EInputTypes.clearDisplay : EInputTypes.clearAll)}
//               keyValue={state.displayValue !== '0' ? 'C' : 'AC'}
//             />
//             <CalculatorKey className="key-sign" onClick={() => handleClick(EInputTypes.toggleSign)} keyValue="±" />
//             <CalculatorKey className="key-percent" onClick={() => handleClick(EInputTypes.inputPercent)} keyValue="%" />
//           </div>
//           <div className="digit-keys">
//             {digitKeys.map((digit) => (
//               <CalculatorKey
//                 key={`key-${digit}`}
//                 className={`key-${digit}`}
//                 onClick={() => handleClick(EInputTypes.inputDigit, digit)}
//                 keyValue={digit}
//               />
//             ))}
//             <CalculatorKey
//               className="key-dot"
//               onClick={() => handleClick(EInputTypes.inputDot)}
//               keyValue="●"
//               disabled={state.displayValue.includes('.')}
//             />
//           </div>
//         </div>
//         <div className="operator-keys">
//           {map(calculatorOperations, (value, key) =>
//             value.show ? (
//               <CalculatorKey
//                 key={`key-${value.name}`}
//                 className={`key-${value.name}`}
//                 onClick={() => handleClick(EInputTypes.performOperation, key)}
//                 keyValue={value.symbol}
//               />
//             ) : null,
//           )}
//           <CalculatorKey className="key-equal" onClick={handleCalculate} keyValue="=" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calculator;
