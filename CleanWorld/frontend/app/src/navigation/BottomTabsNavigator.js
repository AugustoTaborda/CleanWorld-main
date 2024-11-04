import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginGScreen from '../screens/LoginScreen/LoginGScreen';
import DiscardListScreen from '../screens/DiscardList/DiscardList';
import DiscardingProfileScreen from '../screens/DiscardingProfile/DiscardingProfile';
import RegisterFirstScreen from '../screens/RegisterScreen/RegisterFirstScreen';
import RegisterSecondScreen from '../screens/RegisterScreen/RegisterSecondScreen';
import RegisterZeroScreen from '../screens/RegisterScreen/RegisterZeroScreen';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, Image, StyleSheet } from 'react-native';

export default function BottomTabsNavigator() {
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: route.name === 'Login' || route.name === 'Pre-registro' || route.name === 'Register' || route.name === 'RegisterSecondScreen' ? 'none' : 'flex', // Oculta abas em Login e RegisterZeroScreen
            backgroundColor: '#83D07F',
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#000000',
        })}
      >
        <Tab.Screen
          name="Login"
          component={LoginGScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null, // Torna a aba de login invisível e inativa
          }}
        />

        <Tab.Screen
          name="Pre-registro"
          component={RegisterZeroScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null, // Torna a aba de pré-registro invisível e inativa
          }}
        />

        <Tab.Screen
          name="Register"
          component={RegisterFirstScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="RegisterSecondScreen"
          component={RegisterSecondScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null, // Torna a aba de pré-registro invisível e inativa
          }}
        />
        <Tab.Screen
          name="Ola, Usuario"
          component={DiscardingProfileScreen}
          options={{
            headerStyle: {
              backgroundColor: '#83D07F',
            },
            headerTitle: () => <HeaderTitle />,
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="DiscardList"
          component={DiscardListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
  headerText: {
    fontSize: 20,
  },
});
