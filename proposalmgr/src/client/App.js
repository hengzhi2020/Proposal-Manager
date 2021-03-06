import React, { Component } from 'react';
import Listleft from './Listleft';
import Listtable from './Listtable';
import './App.css';
import ModalCreate from './ModalCreate';
import ModalReviewerList from './ModalReviewerList';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';
import ModalScore from './ModalScore';
import ModalReport from './ModalReport';
import ModalReportScore from './ModalReportScore';
import ModalSearch from './ModalSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: null,
      searched_pls: null,
      proposal: null,
      reviewdatas: null,
      reviewdata: null,
      reviewerinfo: null,
      reviewerlist: null,
      openCreateModal: false,
      openListReviewerModal: false,
      openUpdateModal: false,
      openDeleteModal: false,
      openScoreModal: false,
      openReportModal: false,
      openReportScoreModal: false,
      openSearchModal: false,
      pageSize: 1,
      pageNumber: 1,
      searchTitle: null,
      searchDate: null,
      searchCombine: 'OR',
      loading: false,
      username: null,
    };
    this.getProposals = this.getProposals.bind(this);
    this.getreviewdatas = this.getreviewdatas.bind(this);
    this.getReviewerInfo = this.getReviewerInfo.bind(this);
    this.getReviewerList = this.getReviewerList.bind(this);
    this.getProposalTotalNumber = this.getProposalTotalNumber.bind(this);
  }

  componentDidMount() {
    this.getProposalTotalNumber();
    this.getProposals(this.props.DATA.ProposalsDisplay.pageSize, 1);
    this.getreviewdatas();
    this.getReviewerInfo();
    this.getReviewerList();
  }

  searchTitleInput = (e) => {
    let inputchar = e.target.value.toLowerCase().trim();
    this.setState({
      searchTitle: inputchar,
    });
  };
  searchCombineSelector = (e, data) => {
    // console.log('searchCombineSelector - ', data.value);
    this.setState({
      searchCombine: data.value,
    });
  };
  searchDateInput = (e) => {
    let inputchar = e.target.value.toLowerCase().trim();
    this.setState({
      searchDate: inputchar,
    });
  };

  getSearchResult = () => {
    // console.log("Click - getTitleInput is", this.state.searchTitle);
    // console.log("Click - getDateInput is", this.state.searchDate);
    // console.log("Click - searchCombine is", this.state.searchCombine);

    let myRegyy = /([12]\d{3})/;
    let myRegmm = /([12]\d{3}-(0[1-9]|1[0-2]))/;
    let myRegdd = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    if (!this.state.searchDate && !this.state.searchTitle) {
      alert('No Input Keyword(s) for Search');
    } else if (
      (!this.state.searchDate && !!this.state.searchTitle) ||
      (this.state.searchDate.length <= 5 &&
        myRegyy.exec(this.state.searchDate)) ||
      (this.state.searchDate.length <= 8 &&
        myRegmm.exec(this.state.searchDate)) ||
      (this.state.searchDate.length <= 10 &&
        myRegdd.exec(this.state.searchDate))
    ) {
      this.getSearchDataFromDB(
        this.state.searchTitle,
        this.state.searchDate,
        this.state.searchCombine
      );
      this.setState({ openSearchModal: true });
    } else {
      alert('"Date" Input Format: YYYY or YYYY-MM or YYYY-MM-DD');
    }
  };

  createHandler = (e) => {
    if (
      !!this.state.reviewerinfo &&
      this.state.reviewerinfo[0].user_status === 'admin'
    ) {
      this.setState({ openCreateModal: true });
    } else {
      alert('Sorry, Only Admin Can Create a New Proposal!');
    }
  };

  reviewerListHandler = (e) => {
    if (
      !!this.state.reviewerinfo &&
      this.state.reviewerinfo[0].user_status === 'admin'
    ) {
      this.setState({ openListReviewerModal: true });
    } else {
      alert('Sorry, Only Admin Can See the List!');
    }
  };

  updateHandler = (e) => {
    if (
      !!this.state.reviewerinfo &&
      this.state.reviewerinfo[0].user_status === 'admin'
    ) {
      this.setState({
        proposal: this.state.proposals.filter(
          (item) => +item.id === +e.target.value
        ),
      });
      this.setState({ openUpdateModal: true });
    } else {
      alert('Sorry, Only Admin Can Update Proposals!');
    }
  };

  deleteHandler = (e) => {
    if (
      !!this.state.reviewerinfo &&
      this.state.reviewerinfo[0].user_status === 'admin'
    ) {
      this.setState({
        proposal: this.state.proposals.filter(
          (item) => +item.id === +e.target.value
        ),
      });
      this.setState({ openDeleteModal: true });
    } else {
      alert('Sorry, Only Admin Can Delete a Proposal!');
    }
  };

  scoreHandler = (e) => {
    const propslid = +e.target.value;

    this.setState((state) => ({
      proposal: this.state.proposals.filter((item) => +item.id === +propslid),
    }));

    this.setState((state) => ({
      reviewdata: this.state.reviewdatas.filter(
        (item) => +item.proposal_id === +propslid
      ),
    }));

    this.setState({ openScoreModal: true });
  };

  reportHandler = (e) => {
    const propslid = +e.target.value;

    this.setState((state) => ({
      proposal: this.state.proposals.filter((item) => +item.id === +propslid),
    }));

    this.setState((state) => ({
      reviewdata: this.state.reviewdatas.filter(
        (item) => +item.proposal_id === +propslid
      ),
    }));

    this.setState({ openReportModal: true });
  };

  reportScoreHandler = (e) => {
    const propslid = +e.target.value;

    this.setState((state) => ({
      proposal: this.state.proposals.filter((item) => +item.id === +propslid),
    }));

    this.setState((state) => ({
      reviewdata: this.state.reviewdatas.filter(
        (item) => +item.proposal_id === +propslid
      ),
    }));

    this.setState({ openReportScoreModal: true });
  };

  closeCreateModal = (e) => {
    this.setState({ openCreateModal: false });
    //* window.location.reload();*/
  };

  closeListReviewerModal = (e) => {
    this.setState({ openListReviewerModal: false });
    //* window.location.reload();*/
  };

  closeCreateModal = (e) => {
    this.setState({ openCreateModal: false });
    //* window.location.reload();*/
  };

  closeUpdateModal = (e) => {
    this.setState({ openUpdateModal: false });
    //* window.location.reload();*/
  };

  closeDeleteModal = (e) => {
    this.setState({ openDeleteModal: false });
    //* window.location.reload();*/
  };

  closeScoreModal = (e) => {
    this.setState({ openScoreModal: false });
    //* window.location.reload();*/
  };

  closeReportModal = (e) => {
    this.setState({ openReportModal: false });
    //* window.location.reload();*/
  };

  closeReportScoreModal = (e) => {
    this.setState({ openReportScoreModal: false });
    //* window.location.reload();*/
  };

  closeSearchModal = (e) => {
    this.setState({ openSearchModal: false });
    //* window.location.reload();*/
  };

  pageSelector = (event, data) => {
    event.preventDefault();
    this.setState({ pageNumber: data.activePage });
    this.getProposals(this.state.pageSize, data.activePage);
  };

  render() {
    const { proposals, reviewdatas } = this.state;
    /* 
           console.log('searchCombineSelector - ', this.state.searchCombine);
           if (this.state.proposals) {
             console.log("This proposals Obj is :", this.state.proposals[0].id)
           }
           if (this.state.loading) {
             return (<h2 className='loadingCSS'>Loading ... </h2>)
           }
          if (this.state.reviewerinfo) {
             console.log("This reviewer info is :", this.state.reviewerinfo);
             console.log("this.props.DATA.Reviewer.id :", this.props.DATA.Reviewer.id);
          }
        */
    if (
      !this.state.proposals ||
      !this.state.reviewerinfo ||
      !this.state.reviewdatas
    ) {
      return <div></div>;
    } else if (
      this.state.reviewerinfo.length === 1 ||
      !this.props.DATA.Reviewer.name
    ) {
      this.props.DATA.Reviewer.id = this.state.reviewerinfo[0].Id1;
      this.props.DATA.Reviewer.name = this.state.reviewerinfo[0].ldap_username;
      // console.log("user_name: ", this.state.reviewerinfo[0].ldap_username);
      // console.log("user_status: ", this.state.reviewerinfo[0].user_status);
      return (
        <div id="not-access-note">
          <h1>Sorry, You Are Not Authorized To Access This Web Portal! </h1>
          <p>
            Your VA OpneLDAP login username has not been added to the
            reviewers-table.
          </p>
        </div>
      );
    } else {
      this.props.DATA.Reviewer.id = this.state.reviewerinfo[0].Id1;
      this.props.DATA.Reviewer.name = this.state.reviewerinfo[0].ldap_username;
      // console.log('user_name at App.js: ', this.state.reviewerinfo[0].ldap_username);
      this.props.DATA.username = this.state.reviewerinfo[0].ldap_username;
      // console.log("user_status: ", this.state.reviewerinfo[0].user_status);
      var maxProposalId = 0;
      if (
        this.state.proposals !== undefined &&
        this.state.proposals.length > 0
      ) {
        maxProposalId = this.state.proposals[0].id;
      }
      return (
        <main className="App">
          <header className="App_header">
            <h1>Proposal Management and Reviewing Platform</h1>
            <p>
              Center for Data And Computational Science - VA Boston Healthcare
              System @ Jamaica Plain
            </p>
          </header>
          <div className="App-list">
            <Listleft
              createHandler={this.createHandler}
              reviewerListHandler={this.reviewerListHandler}
              searchTitleInput={this.searchTitleInput}
              searchDateInput={this.searchDateInput}
              searchCombineSelector={this.searchCombineSelector}
              getSearchResult={this.getSearchResult}
              ldap_username={this.props.DATA.username}
            />

            <Listtable
              proposals={proposals}
              reviewdatas={reviewdatas}
              deleteHandler={this.deleteHandler}
              updateHandler={this.updateHandler}
              scoreHandler={this.scoreHandler}
              reportHandler={this.reportHandler}
              reportScoreHandler={this.reportScoreHandler}
              pageSelector={this.pageSelector}
              DATA={this.props.DATA}
            />
          </div>

          {!!this.state.proposals && (
            <ModalCreate
              createClickopen={this.state.openCreateModal}
              createClickclose={this.closeCreateModal}
              reviewerinfo={this.state.reviewerinfo}
              maxProposalId={maxProposalId}
            />
          )}

          {!!this.state.proposals && (
            <ModalReviewerList
              listReviewerClickopen={this.state.openListReviewerModal}
              listReviewerClickclose={this.closeListReviewerModal}
              reviewerlist={this.state.reviewerlist}
            />
          )}

          {!!this.state.proposal && !!this.state.openUpdateModal && (
            <ModalUpdate
              updateClickopen={this.state.openUpdateModal}
              updateClickclose={this.closeUpdateModal}
              updateProposal={this.state.proposal}
            />
          )}

          {!!this.state.proposal && !!this.state.openDeleteModal && (
            <ModalDelete
              deleteClickopen={this.state.openDeleteModal}
              deleteClickclose={this.closeDeleteModal}
              deleteProposal={this.state.proposal}
            />
          )}

          {!!this.state.proposal &&
            !!this.state.reviewdata &&
            !!this.state.openScoreModal && (
              <ModalScore
                scoreClickopen={this.state.openScoreModal}
                scoreClickclose={this.closeScoreModal}
                scoreProposal={this.state.proposal}
                reviewdata={this.state.reviewdata}
                DATA={this.props.DATA}
              />
            )}

          {!!this.state.proposal &&
            !!this.state.reviewdata &&
            !!this.state.openReportModal && (
              <ModalReport
                reportClickopen={this.state.openReportModal}
                reportClickclose={this.closeReportModal}
                reportProposal={this.state.proposal}
                reviewdata={this.state.reviewdata}
              />
            )}
          {!!this.state.proposal &&
            !!this.state.reviewdata &&
            !!this.state.openReportScoreModal && (
              <ModalReportScore
                reportClickopen={this.state.openReportScoreModal}
                reportClickclose={this.closeReportScoreModal}
                reportProposal={this.state.proposal}
                reviewdata={this.state.reviewdata}
              />
            )}

          {!!this.state.searched_pls && !!this.state.openSearchModal && (
            <ModalSearch
              searchClickopen={this.state.openSearchModal}
              searchClickclose={this.closeSearchModal}
              searched_pls={this.state.searched_pls}
            />
          )}
        </main>
      );
    }
  }

  getProposalTotalNumber() {
    fetch(`${process.env.PUBLIC_URL}/api/proposals/num`)
      .then((response) => response.json())
      .then((prposlcount) => {
        this.props.DATA.ProposalsDisplay.totalPages = Math.ceil(
          prposlcount[0]['count(title)'] / 10
        );
      });
  }
  getProposals(pageSize, pageNumber) {
    this.setState({
      proposals: null,
      //  loading: true
    });

    fetch(
      `${process.env.PUBLIC_URL}/api/proposals?pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
      .then((response) => response.json())
      .then((mypro) => {
        this.setState({
          proposals: mypro,
          pageSize: pageSize,
          pageNumber: pageNumber,
          //  loading: false
        });
        // console.log('Loaded  Proposals == ', this.state.proposals);
      });
    // console.log('ComponentDidMout _ Loaded Proposals == ', this.state.proposals);
  }

  getSearchDataFromDB(searchTitle, searchDate, searchCombine) {
    this.setState({
      searched_pls: null,
    });

    fetch(
      `${process.env.PUBLIC_URL}/api/proposals/search?searchTitle=${searchTitle}&searchDate=${searchDate}&searchCombine=${searchCombine}`
    )
      .then((response) => response.json())
      .then((mysearch) => {
        this.setState({
          searched_pls: mysearch,
        });
        // console.log('Searched Proposals from DB == ', this.state.searched_pls);
      });
  }

  getreviewdatas() {
    this.setState({
      proposals: null,
      //  loading: true
    });

    fetch(`${process.env.PUBLIC_URL}/api/reviewdata`)
      .then((response) => response.json())
      .then((myreview) => {
        this.setState({
          reviewdatas: myreview,
          //  loading: false
        });
        // console.log('Loaded - reviewdatas == ', this.state.reviewdatas);
      });
  }

  getReviewerInfo() {
    this.setState({ proposals: null });

    fetch(`${process.env.PUBLIC_URL}/api/reviewers`)
      .then((response) => response.json())
      .then((onereviewer) => {
        this.setState({
          reviewerinfo: onereviewer,
        });
        // console.log('Loaded - One reviewer Info == ', this.state.reviewerinfo);
      });
  }

  getReviewerList() {
    this.setState({ proposals: null });
    fetch(`${process.env.PUBLIC_URL}/api/reviewerlist`)
      .then((response) => response.json())
      .then((reviewerlist) => {
        this.setState({
          reviewerlist: reviewerlist,
        });
        /* 
        console.log(
          'All reviewers List at App.js == ',
          this.state.reviewerlist
        );  
        */
      });
  }
}
export default App;
