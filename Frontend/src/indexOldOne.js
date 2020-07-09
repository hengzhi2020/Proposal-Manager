import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './semantic.min.css';  disabled due to double-loaded see index.html
import App from './AppOLdOne';
import DATA from './DATA';

// DATA.Reviewer.id = 46;
DATA.ProposalsDisplay.pageSize = 11;
DATA.ProposalsDisplay.totalPages = 20;
DATA.Reviewer.name = "Name-from-Login";
DATA.Reviewer.date = '2020-02-22 Login';

ReactDOM.render(
    <App DATA={DATA} />,
    document.getElementById('root')
);
