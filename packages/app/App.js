import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IGLogin from '@bobwei/instagram-api/lib/components/IGLogin';

const App = createAppContainer(
  createStackNavigator({
    Home: {
      screen: require('./src/screens/Home').default,
    },
    Photo: {
      screen: require('./src/screens/Photo').default,
    },
    Login: {
      screen: ({ navigation }) => <IGLogin onSuccess={() => navigation.pop()} />,
    },
  }),
);

export default App;
