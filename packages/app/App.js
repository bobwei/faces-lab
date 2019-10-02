import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const App = createAppContainer(
  createStackNavigator({
    Home: {
      screen: require('./src/screens/Home').default,
    },
  }),
);

export default App;
