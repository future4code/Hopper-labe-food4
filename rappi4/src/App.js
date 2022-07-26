import React from 'react';
import { GlobalState } from './Global/GlobalState';
import Router from "./Router/Router";

export default function App() {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
  );
}