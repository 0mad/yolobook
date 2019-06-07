import { Provider } from 'mobx-react';
import App, { Container } from 'next/app';
import React from 'react';
import createStore from '../stores';
import '../styles/base.scss';

class YoloBookApp extends App {
  public static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = createStore();

    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore;

    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  private mobxStore: any = null;

  constructor(props: any) {
    super(props);
    const isServer = !process.browser;
    this.mobxStore = isServer
      ? props.initialMobxState
      : createStore(props.initialMobxState);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider {...this.mobxStore}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default YoloBookApp;
