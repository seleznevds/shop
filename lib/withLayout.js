import React, { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import dynamic from 'next/dynamic';
import '../static/materialize/materialize.min.css';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function withLayout(BaseComponent) {

    class LayoutedComponent extends Component {
        componentDidMount(){
            
        }

        render() {
            return (<BaseComponent {...this.props} />);
        }

        static async getInitialProps(ctx) {
            if (BaseComponent.getInitialProps) {
                return BaseComponent.getInitialProps(ctx);
            }

            return {};
        }
    }

    return LayoutedComponent;
}

export default withLayout;