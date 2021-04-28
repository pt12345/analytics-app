import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Start from './Start';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><Start /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});