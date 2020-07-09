import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './semantic.min.css';  disabled due to double-loaded see index.html
import DATA from './DATA';
import Login from './Login';

// DATA.Reviewer.id = 46;
DATA.ProposalsDisplay.pageSize = 10;
DATA.ProposalsDisplay.totalPages = 20;
DATA.Reviewer.name = "Name -by- Login";
DATA.Reviewer.date = new Date().toLocaleString().split(',')[0];

ReactDOM.render(
    <Login DATA={DATA} />,
    document.getElementById('root')
);
