import React, { Component } from 'react'
import {Redirect, Link} from "react-router-dom"

export default class logout extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
    }

    render() {
        return (
            <div className="text-center">
                <h2>You are Logged out..</h2>
                <Link to="/">Login Back</Link>
            </div>
        )
    }
}
