import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import API from "../http-common.js"
import "./login.css";

export default class login extends Component {

    constructor(props){
        super(props);

        let isLoggedIn = false;
        this.state = {
            "email": "",
            "password": "",
            "mobile": "",
            "otpLogin": false,
            "error":false,
            "errorMsg":"",
            isLoggedIn
        }

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        let ref_token = localStorage.getItem("refresh_token");
        

        if(ref_token != null){       
            let params  = {
                'grant_type' : 'refresh_token',
                'refresh_token' : ref_token,
                'client_id' : process.env.REACT_APP_CLIENT_ID,
                'client_secret' : process.env.REACT_APP_CLIENT_SECRET,
                'scope' : '',
            }
            API.post('/oauth/token',params,{headers:{"Access-Control-Allow-Origin":"*"}}).then(res => {
              console.log(res.data);
              localStorage.setItem("token" , res.data.token_type+" "+res.data.access_token);
                localStorage.setItem("refresh_token" , res.data.refresh_token);
                this.setState({
                    "isLoggedIn":true
                })
                // localStorage.setItem("user" , res.data.success.user);
              
            }).catch(error => {
              console.log(error.response)
                      
            });
        }
        // if(token != null){
        //     this.setState({
        //         "isLoggedIn":true
        //     })
        // }
        
          

        // console.log("ssss",process.env.REACT_APP_CLIENT_SECRET)
    }

    onChange(e){
        console.log(e.target.name)

        if(e.target.name == "mobile"){
           
            let mobile = e.target.value;

            if (mobile != "" && ( !Number(mobile) || mobile.length > 10 )) {
                return;
            }
            this.setState({
                [e.target.name]: mobile
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        const {email,password,mobile} = this.state;

        if(email && password){
            console.log("normal");
            let userData = API.post('api/login', {
                email: email,
                password:password
            }).then(res => {
                localStorage.setItem("token" , res.data.success.token.token_type+" "+res.data.success.token.access_token);
                localStorage.setItem("refresh_token" , res.data.success.token.refresh_token);
                localStorage.setItem("user" , res.data.success.user);

                this.setState({
                    "isLoggedIn":true
                })
        
            }).catch(error => {
                    this.setState({
                        "error":true,
                        "errorMsg":error.response.data.error
                    })                
            });
        }else if(mobile){
            console.log('mobile')
            let userData = API.post('api/mobileLogin', {
                  mobile: mobile
              }).then(res => {
                this.setState({
                    "otpLogin":true
                })
                // console.log(res.data);
              }).catch(error => {
                this.setState({
                    "error":true,
                    "errorMsg":error.response.data.error
                })                
        });
        }else{
            console.log("Error")
        }
    }


    render() {
        if(this.state.isLoggedIn){
           return <Redirect to="/restaurant" />
        }
        if(this.state.otpLogin){
           return <Redirect to={{
            pathname: '/otp',
            mobile: this.state.mobile
        }} />
        }
        return (
            <div className="container">
                <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                    <h2>Login</h2>
                    </div>
                    {this.state.error?
                     <div class="alert alert-danger alert-dismissible fade show">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        {this.state.errorMsg}
                    </div>:""
                    }
                   

                    <form onSubmit={this.submitForm}>
                        <input type="text" id="email" className="fadeIn second" name="email" value={this.state.email} onChange={this.onChange} placeholder="email" />
                        <input type="password" id="password" className="fadeIn third" name="password" value={this.state.password} onChange={this.onChange} placeholder="password" />
                        <h4 className="text-center">OR</h4>
                        <input type="text" id="mobile" className="fadeIn third" name="mobile" value={this.state.mobile} onChange={this.onChange} placeholder="mobile" />

                        <input type="submit" className="fadeIn forth" value="Log In" />
                    </form>

                    {/* <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div> */}

                </div>
                </div>
            </div>
        )
    }
}
