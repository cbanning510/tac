import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HighScores from './components/HighScores';
import HomeScreen from './components/HomeScreen';

const App = () => {
  const Tab = createBottomTabNavigator();
  const [AppWins, setAppWins] = useState(null);

  const updateWins = (data) => {
    setAppWins(data);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({})}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 20,
          },
        }}>
        <Tab.Screen name="Game">
          {() => <HomeScreen updateWins={updateWins} wins={AppWins} />}
        </Tab.Screen>
        <Tab.Screen name="Scores">
          {() => <HighScores updateWins={updateWins} wins={AppWins} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
