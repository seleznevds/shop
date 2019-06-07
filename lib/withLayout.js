import React, { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '../components/Header';
import '../static/materialize/materialize.min.css';
import '../static/css/nprogress.css';
import {basketApi} from './basket';
import {recieveBasketExtended} from '../actions/basket';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();



Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function withLayout(BaseComponent) {

    class LayoutedComponent extends Component {
        
        
        render() {
            return <>
                <Header/>
                <BaseComponent {...this.props} />
            </> ;
        }

        static async getInitialProps(ctx) {
            const isServer = !! ctx.req;
            let withProductDetail = ctx.pathname === '/basket';
            if(isServer || withProductDetail){
                const headers = {};
                
                if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
                    headers.cookie = ctx.req.headers.cookie;
                }                 

                let basket = await basketApi.get({headers, withProductDetail});
                if(basket){
                    ctx.reduxStore.dispatch(recieveBasketExtended(basket));
                }  
            }

            if (BaseComponent.getInitialProps) {
                return BaseComponent.getInitialProps(ctx);
            }

            return {};
        }
    }

    return LayoutedComponent;
}

export default withLayout;