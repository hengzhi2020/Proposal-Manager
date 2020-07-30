import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import './Card.css';
import './Listleft.css';
import './ModalCreate';
// import vaLogoSmall from './VA_Logo_smallJPG_.jpg';
import vaLogoSmall from './VA_small_logo.jpg';

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
]

export default function List(props) {
    return (
        <section className='List'>

            <img src={vaLogoSmall} alt="VA Logo" className='Logo' />


            <header className='List-header'>
                <h2>Proposal Management and Reviewing Platform</h2>
            </header>
            <div className='List-cards'>
                <hr />
                <div className='Card-search'>
                    <Input
                        type='text'
                        icon='search'
                        placeholder="Input Part of the Title"
                        onChange={props.searchTitleInput}
                    />

                    <div className='search-choice'>
                        <span className='searchSelector'>
                            Combine Title & Date: {' '}
                            <Dropdown
                                inline
                                options={searchOptions}
                                defaultValue={searchOptions[0].value}
                                onChange={props.searchCombineSelector}
                            />
                        </span>
                    </div>

                    <Input
                        type='text'
                        icon='search'
                        placeholder="Input YYYY-MM-DD"
                        onChange={props.searchDateInput}
                    />
                    <button
                        type='button'
                        id='btn-search'
                        onClick={props.getSearchResult}
                    >
                        Search Title or/and Date
                    </button>
                </div>

                <div className='gohomepagecard'>
                    <button
                        disabled={true}
                        type='button'
                        id='btn-display'
                        onClick={(e) => { window.location.reload(true) }}
                    >
                        Link to VA-GenHub
                    </button>
                </div>

                <div className='createcard'>
                    <button
                        type='button'
                        id='btn-create'
                        onClick={props.createHandler}
                    >
                        Create a New Proposal
                    </button>
                </div>

                <hr />
                <button
                    type='button'
                    className='List-add-button'
                >
                    + Add More Activities
                </button>

            </div>
        </section >
    )
}
