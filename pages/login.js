import React, { Component } from 'react';

import Link from 'next/link';
import withAuth from "../lib/withAuth";
import withLayout from "../lib/withLayout";

class Login extends Component {
    render() {
        return (
            <div className="contaner">
                <h2>Авторизация</h2>
                    <Link href="/auth/google"><a>Авторизоваться с аккаунтом  Google</a></Link>
            </div>
        );
    }
}

export default withAuth(withLayout(Login), {logoutRequired:true});