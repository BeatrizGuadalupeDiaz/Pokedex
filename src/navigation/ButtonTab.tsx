import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Options from '../screens/Options';
import Favorites from '../screens/Favorites';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const ButtonTab = () => {
  const Tab = createBottomTabNavigator();
  //obj para poder trabajar con diferentes petiociones y hooks
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let icon = '';
              if (route.name === 'Home') {
                icon = 'home';
              } else if (route.name === 'Options') {
                icon = 'information-circle';
              } else if (route.name === 'Favorites') {
                icon = 'heart';
              }
              return <Icon name={icon} size={25} color={color} />;
            },
            tabBarActiveTintColor: '#F1C40F',
            tabBarInactiveTintColor: 'gray',
            headerShown: true,
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Options" component={Options} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default ButtonTab;
