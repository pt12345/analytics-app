import React from 'react';
import ReactDOM from 'react-dom';
import Currency from './Currency';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Currency /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});