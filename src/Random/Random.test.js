import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Random from './Random';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Random /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});