import { Calculator } from './components/Calculator';
import './App.scss';
import ConfettiExplosion from 'react-confetti-explosion';
import React from 'react';

export function App() {
  const [isExploding, setIsExploding] = React.useState(false);
  return (
    <div className="app">
      {isExploding && <ConfettiExplosion />}
      <Calculator />
    </div>
  );
}
