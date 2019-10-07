import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const App = createAppContainer(
  createStackNavigator({
    Home: {
      screen: require('./src/screens/Home').default,
    },
    Photo: {
      screen: require('./src/screens/Photo').default,
    },
  }),
);

export default App;
