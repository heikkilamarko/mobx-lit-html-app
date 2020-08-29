import produce from 'immer';

const actions = {
  UPDATED: 'app.store.updated',
};

function createStore() {
  let state = {
    isSidebarOpen: true,
  };

  function setState(fn) {
    const newState = produce(state, (d) => {
      fn(d);
    });

    if (newState !== state) {
      state = newState;
      window.dispatchEvent(new CustomEvent(actions.UPDATED));
    }
  }

  function getState() {
    return state;
  }

  function isSidebarOpen() {
    return state.isSidebarOpen;
  }

  function toggleSidebarOpen() {
    setState((d) => (d.isSidebarOpen = !d.isSidebarOpen));
  }

  return {
    getState,
    isSidebarOpen,
    toggleSidebarOpen,
  };
}

export { actions };

export default createStore();
