import React from 'react';
import { GlobalState } from './Global/GlobalState';
import Router from "./Router/Router";
import '../src/index.css'

export default function App() {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
  );
}