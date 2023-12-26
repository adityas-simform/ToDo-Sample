// eslint-disable-next-line
import Reactotron from 'reactotron-react-native';
// @ts-ignore
// eslint-disable-next-line
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({
  createSocket: (path) => new ReactotronFlipper(path)
})
  .useReactNative({
    networking: false
  })
  // @ts-ignore
  .use(sagaPlugin()) // <--- here we go!
  .connect();

// @ts-ignore
Reactotron.clear();

export default reactotron;
