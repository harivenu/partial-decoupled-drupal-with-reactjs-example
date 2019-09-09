import React from 'react';
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/custom.css"

export class News extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      response: [],
      responsespec: [],
    };

  }

  componentDidMount(){
    this.fetchServices();
    this.fetchServicesspec();
  }

  fetchServices() {
    fetch( this.props.baseUri+ '/news_all',{
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
    fetchServicesspec(id) {
        if(id == undefined){
            this.props.NID = '3';
        }
        else{
            this.props.NID = id;
        }
        this.props.NID = id;
        fetch( this.props.baseUri+ '/news_json/' + this.props.NID,{
            credentials: "same-origin"}).
        then(response=>{
            response.json().then(data=>{
                if(data.length > 0){
                    this.setState({
                        responsespec: data,
                    });
                }
            });
        });
    };

  render() {
      const { response } = this.state;
      const { responsespec } = this.state;
    return (
      <div className="news">
       <div className="row news_wrapper">
           <div className="col-md-4 left">
               {response.map(r =>
                   <div className="title" key={r.nid} onClick={() => this.fetchServicesspec(r.nid)}>
                       {r.title}
                   </div>
               )}
           </div>
           {responsespec.length == 0 ?
               <div className="col-md-8 right">
                 <div className="No_data_message" ref="iScroll">Welcome to partial decoupling
                 </div>
               </div>
               :
               <div className="col-md-8 right">
                   {responsespec.map(rs =>
                       <div className="main" key={rs.nid}>
                           <div className="title">{rs.title}</div>
                           <div className="body" dangerouslySetInnerHTML={{ __html: rs.body }}></div>
                       </div>
                   )}
               </div>
           }
       </div>
      </div>
    )
  }
}
