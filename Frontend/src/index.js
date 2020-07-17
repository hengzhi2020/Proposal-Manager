import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DATA from './DATA';
import Login from './Login';

DATA.ProposalsDisplay.pageSize = 10;
DATA.ProposalsDisplay.totalPages = 20;
DATA.Reviewer.name = "Name -by- Login";
DATA.Reviewer.date = new Date().toLocaleString().split(',')[0];

ReactDOM.render(
    <Login DATA={DATA} />,
    document.getElementById('root')
);
