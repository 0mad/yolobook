import RootStore from './modules';
import { useStaticRendering } from 'mobx-react';

const isServer = !process.browser;
useStaticRendering(isServer);

let store: RootStore | null = null;

const createStore = (initialData = {}) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
  }

  return store;
};

export default createStore;
