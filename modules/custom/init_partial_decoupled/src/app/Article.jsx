import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

export class Article extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      response: [],
    };


    // Table Initialization
    this.tableHeaderInitialization();
  }

  tableHeaderInitialization() {
    this.columns = [
      {Header: 'ID',id: 'nid',accessor: d=>Number(d.nid),},
      {Header: 'title', accessor: 'title'},
      {Header: 'body', accessor: 'body'},
    ]
  }

  componentDidMount(){
    this.fetchServices();
  }

  fetchServices() {
    fetch( this.props.baseUri+ '/article_json',{
      credentials: "same-origin"}).
    then(response=>{
      response.json().then(data=>{
        if(data.length > 0){
          this.setState({
            response: data,
          });
        }
      });
    });
  };

  render() {
    var response = this.state.response;
    return (
      <div className="overview">
        {/* Table list*/}
        <ReactTable
            data={response}
            columns={this.columns}
            defaultPageSize={5}
            noDataText={ "Es konnten leider keine Ergebnisse zu den gewünschten Daten gefunden werden" }
            className="react-main-table -striped -highlight"
            defaultSorted={[
              {
                id: "nid",
                asc: true
              }
            ]}
        />
      </div>
    )
  }
}
