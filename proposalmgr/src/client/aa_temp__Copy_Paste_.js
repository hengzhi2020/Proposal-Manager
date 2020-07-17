
{/*     strting from ModalScore #396 to #433     */ }

updateDATAbyReviewerReport = () => {

    let SelectedReviewReport = this.props.reviewreport.filter((item) => (
        +item.reviewer_id === +this.props.DATA.Reviewer.id
    ));

    if (SelectedReviewReport.length === 0) {
        alert('You have not been authorized to review this proposal!');
        window.location.reload(true);
    } else {

        this.props.DATA.BusinessNeed.score = SelectedReviewReport[0].business_score;
        this.props.DATA.BusinessNeed.comments = SelectedReviewReport[0].business_comms;
        this.props.DATA.Feasibility.score = SelectedReviewReport[0].feasibility_score;
        this.props.DATA.Feasibility.comments = SelectedReviewReport[0].feasibility_comms;
        this.props.DATA.Resources.score = SelectedReviewReport[0].resources_score;
        this.props.DATA.Resources.comments = SelectedReviewReport[0].resources_comms;
        this.props.DATA.Commitment.score = SelectedReviewReport[0].commitment_score;
        this.props.DATA.Commitment.comments = SelectedReviewReport[0].commitment_comms;
        this.props.DATA.Constraints.score = SelectedReviewReport[0].constraints_score;
        this.props.DATA.Constraints.comments = SelectedReviewReport[0].constraints_comms;
        this.props.DATA.OverAllComments.typein = SelectedReviewReport[0].overall_comms;

        this.setState({
            score1: this.props.DATA.BusinessNeed.score,
            comm1: this.props.DATA.BusinessNeed.comments,
            score2: this.props.DATA.Feasibility.score,
            comm2: this.props.DATA.Feasibility.comments,
            score3: this.props.DATA.Resources.score,
            comm3: this.props.DATA.Resources.comments,
            score4: this.props.DATA.Commitment.score,
            comm4: this.props.DATA.Commitment.comments,
            score5: this.props.DATA.Constraints.score,
            comm5: this.props.DATA.Constraints.comments,
            comm6: this.props.DATA.OverAllComments.typein,
        });
    }
}