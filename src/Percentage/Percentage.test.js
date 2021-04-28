import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Percentage from './Percentage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Percentage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});