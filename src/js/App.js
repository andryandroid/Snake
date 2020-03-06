import React from 'react';
import { Game } from './component/game';
import '../styles/App.css';
import injectContext from "./store/appContext";

export const App = () => {
  
  return (
    <Game/>
  );
}

export default injectContext(App);
