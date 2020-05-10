import React, { Component } from 'react'
import {Redirect, Link} from "react-router-dom"
import API from "../http-common.js"
import "./restaurant.css";

export default class restaurant extends Component {

  constructor(props){
      super(props);

      let isLoggedIn = true;
      let token = localStorage.getItem("token");
      this.state = {
          "restaurants": [],
          "selected": 1,
          "items": [],
          "error":false,
          "errorMsg":"",
          isLoggedIn,
          token
      }

      this.renderRestaurant = this.renderRestaurant.bind(this);
      this.renderItems = this.renderItems.bind(this);
      this.changeRestaurent = this.changeRestaurent.bind(this);
      this.fetchItems = this.fetchItems.bind(this);
      this.fetchRestaurant = this.fetchRestaurant.bind(this);
      // this.refreshToken = this.refreshToken.bind(this);
      // this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount(){
     
      if(this.state.token != null){
          this.setState({
              "isLoggedIn":true
          })
      }else{
          this.setState({
            "isLoggedIn":false
        })
      }
    
      this.fetchRestaurant(this.state.selected);
      this.fetchItems(this.state.selected);

  }

  fetchRestaurant(){
    let config = {
      headers: {
          'Accept': 'application/json',
          "Authorization": this.state.token
      }
    }
    API.get('api/restaurant',config).then(res => {
      console.log(res.data);
      this.setState({
          "restaurants":res.data,
          "selected": res.data[0].id,
      })
    }).catch(error => {
        if(error.response.status == 401){
          // this.refreshToken()
          this.setState({
            isLoggedIn:false
          })            
        }
    });
  }

  fetchItems(id){
    let config = {
      headers: {
          'Accept': 'application/json',
          "Authorization": this.state.token
      }
    }
    API.get('api/restaurant/items/'+id,config).then(res => {
      console.log(res.data);
      this.setState({
          "items":res.data,
      })
    }).catch(error => {
      if(error.response.status == 401){
        // this.refreshToken()
        this.setState({
          isLoggedIn:false
        })            
      }
      this.setState({
          "error":true,
          "errorMsg":error.response.data.error
      })            
    });
  }




  changeRestaurent(e){
    let id = e.target.id;
    id = id.split("_")[1];
    this.setState({
        "selected": id,
    })

    this.fetchItems(id);

  }

 renderItems(){
      return  (
        <ul>
              {this.state.items.map((item, index) => (
                  <li className="list-group-item" key={"item_"+item.id}>{item.name}</li>
              ))}
            </ul>
    )
  }

  renderRestaurant(){
      return  (
        <ul>
        {this.state.restaurants.map((restaurant, index) => (
            <li className="list-group-item btn btn-default" id={"res_"+restaurant.id} onClick={this.changeRestaurent} key={"res_"+restaurant.id}>
              {restaurant.name}
            </li>
        ))}
      </ul>
    )
  }

  render() {
    if(!this.state.isLoggedIn){
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Link className="btn btn-primary float-right" to="/logout">Logout</Link>
            <h1 className="text-center text-warning">Restaurant Page</h1>
          </div>
        </div>
        <div className="row">
          <div className="restaurant-list col-lg-3">
            <div className="list-group">
              <div className="card card-default">
                <div className="card-header">Restaurant List</div>
                <div className="card-body">{this.renderRestaurant()}</div>
              </div>             
            </div>
          </div>
          <div className="item-list col-lg-9">
            <div className="list-group">
              <div className="card card-default">
                <div className="card-header">Item List</div>
                <div className="card-body">{this.renderItems()}</div>
              </div>             
            </div>
          </div>
          {/* <div className="item-list col-lg-9 list-group">
          <div className="panel panel-default">
            <div className="panel-body">Item List</div>
          </div>
            {this.renderItems()}
          </div> */}
        </div>
      </div>
    )
  }
}
