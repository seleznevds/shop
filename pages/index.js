import React from 'react';
import { connect } from 'react-redux';
import withLayout from '../lib/withLayout';



class Index extends React.Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    //reduxStore.dispatch(serverRenderClock(isServer));
    //reduxStore.dispatch(incrementCount());

    return {}
  }

  componentDidMount () {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
   // this.timer = setInterval(() => this.props.startClock(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <div>Test <a className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</a></div>;
  }
}

const Component = connect(
  null,
  null
)(Index);

export default withLayout(Component);