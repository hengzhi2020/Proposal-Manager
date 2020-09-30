import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import './Card.css';
import './Listleft.css';
import './ModalCreate';

const searchOptions = [
  {
    key: 'OR',
    text: 'OR',
    value: 'OR',
  },
  {
    key: 'AND',
    text: 'AND',
    value: 'AND',
  },
];

export default function List(props) {
  // console.log('ldap_username in listleft:', props.ldap_username);
  return (
    <section className="List">
      <img
        src={require('./VA_small_logo.jpg')}
        alt="VA Logo"
        className="Logo"
      />

      <header className="List-header">
        <h2>Proposal Management and Reviewing Platform</h2>
      </header>
      <div className="List-cards">
        <hr />
        <div className="Card-search">
          <Input
            type="text"
            icon="search"
            placeholder="Input Part of the Title"
            onChange={props.searchTitleInput}
          />

          <div className="search-choice">
            <span className="searchSelector">
              Combine Search with:{' '}
              <Dropdown
                inline
                options={searchOptions}
                defaultValue={searchOptions[0].value}
                onChange={props.searchCombineSelector}
              />
            </span>
          </div>

          <Input
            type="text"
            icon="search"
            placeholder="Input YYYY-MM-DD"
            onChange={props.searchDateInput}
          />
          <button type="button" id="btn-search" onClick={props.getSearchResult}>
            Search Title or/and Date
          </button>
        </div>

        <div className="gohomepagecard">
          <button
            type="button"
            id="btn-display"
            onClick={props.reviewerListHandler}
          >
            List of all Reviewers
          </button>
        </div>

        <div className="createcard">
          <button type="button" id="btn-create" onClick={props.createHandler}>
            Create a New Proposal
          </button>
        </div>

        <hr />
        <button type="button" className="List-add-button">
          Login UserName: {props.ldap_username}
        </button>
      </div>
    </section>
  );
}
