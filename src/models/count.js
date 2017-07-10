import key from 'keymaster';

const delay = second => {
  return new Promise(resolve => {
    setTimeout(resolve, second);
  });
};

let startRecord = false;

export default {
  namespace: 'count',

  state: {
    record: localStorage.getItem('record') || 0,
    current: 0,
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up,enter', () => {
        dispatch({ type: 'add' });
      });
    },
  },

  effects: {
    *fetch({ payload }, { put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },

    *add(action, { put }) {
      console.log(startRecord);
      if (!startRecord) {
        startRecord = true;
        yield delay(1000);
        yield put({ type: 'saveRecord' });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveRecord(state) {
      console.log('xxxxxxxxxxxxxx');
      startRecord = false;

      const { record } = state;

      localStorage.setItem('record', record);

      return {
        ...state,
        current: 0,
      };
    },
    add(state) {
      const newCurrent = state.current + 1;

      // if (!state.startRecord) {
      // }

      const record = newCurrent > state.record ? newCurrent : state.record;

      localStorage.setItem('record', record);

      return {
        ...state,
        record,
        current: newCurrent,
      };
    },
  },
};
