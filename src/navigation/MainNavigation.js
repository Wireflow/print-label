import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateLabel from '../components/screens/CreateLabel';
import ChoosePrinter from '../components/screens/ChoosePrinter';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="choosePrinter">
        <Stack.Screen
          component={ChoosePrinter}
          name="choosePrinter"
          options={{headerShown: false}}
          initialParams={{waiting: false}}
        />

        <Stack.Screen
          component={CreateLabel}
          name="CreateLabel"
          options={{headerShown: false}}
          initialParams={{waiting: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
