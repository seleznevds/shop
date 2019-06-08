import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  render() {
    return (
      <html
        lang="en"
        style={{
          height: '100%',
        }}
      >
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="google" content="notranslate" />    
          <meta name="csrf-token" content={this.props.csrfToken}></meta>
          <script src="/materialize/materialize.min.js" async></script>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />          
          <NextScript />
        </body>
      </html>
    );
  }

  static async getInitialProps (ctx) { 

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        csrfToken: ctx.req.csrfToken()
      }
    } finally {
      sheet.seal()
    }
  }
}

export default MyDocument;