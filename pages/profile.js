import React, { Component } from 'react';

import withAuth from "../lib/withAuth";
import withLayout from "../lib/withLayout";

class Profile extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
           <div className="contaner">
               <h2>Профиль  пользователя</h2>
                    <h3>Привет, {this.props.user.displayName}</h3>
           </div>
        );
    }
}

export default withAuth(withLayout(Profile));