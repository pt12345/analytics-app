import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Treemap from './Treemap';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Treemap /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});