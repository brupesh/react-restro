import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import API from "../http-common.js"
import "./login.css";

export default class otpVerification extends Component {

    constructor(props){
        super(props)
        let isLoggedIn = false;
        this.state = {
            "mobile":"",
            "otp":"",
            "error":false,
            "errorMsg":"",
            isLoggedIn
        }
    }

    componentDidMount(){
        console.log(this.props);

        this.setState({
            "mobile":this.props.location.mobile
        })

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e){
        
        let otp = e.target.value;
        console.log(e.target.name)

        if (otp != "" && ( !Number(otp) || otp.length > 4 )) {
            return;
        }
        this.setState({
            [e.target.name]: otp
        });
        
    }

    submitForm(e){
        e.preventDefault();
        const {mobile,otp} = this.state;        
        console.log('mobile')
        let userData = API.post('api/otpVerification', {
                mobile: mobile,
                otp: otp
            }).then(res => {
                localStorage.setItem("token" , res.data.success.token.token_type+" "+res.data.success.token.access_token);
                localStorage.setItem("refresh_token" , res.data.success.token.token_type+" "+res.data.success.token.refresh_token);
                localStorage.setItem("user" , "Bearer "+res.data.success.user);
                this.setState({
                    "isLoggedIn":true
                })
            // console.log(res.data);
            }).catch(error => {
                this.setState({
                    "error":true,
                    "errorMsg":error.response.data.error
                })                
            });
    
    }

    render() {
        if(this.state.isLoggedIn){
            return <Redirect to="/restaurant" />
         }
        return (
            <div>
                <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                    <h2>Verify</h2>
                    </div>
                    {this.state.error?
                     <div class="alert alert-danger alert-dismissible fade show">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        {this.state.errorMsg}
                    </div>:""
                    }

                    <form onSubmit={this.submitForm}>
                        <input type="text" id="otp" className="fadeIn second" name="otp"  value={this.state.otp} onChange={this.onChange} placeholder="otp" />
                        <input type="submit" className="fadeIn fifth" value="Log In" />
                    </form>

                    {/* <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div> */}

                </div>
                </div>
            </div>
        )
    }
}
