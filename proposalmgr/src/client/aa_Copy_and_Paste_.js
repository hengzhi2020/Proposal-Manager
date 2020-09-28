return (
  <Table key={i}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="tbl-head-width">
          Aspects (Scores)
        </Table.HeaderCell>
        <Table.HeaderCell>
          Comments _&_ Considerations ____ by tacking number ==
          <button type="button" id="btn-btn-report">
            {' '}
            {((+item.reviewer_id * 1.732) / 1.414).toFixed(4)}
          </button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body className="reportprint-tbl">