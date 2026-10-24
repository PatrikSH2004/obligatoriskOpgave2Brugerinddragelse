import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import ProvidersScreen from './screens/ProvidersScreen';
import { getNavigationOptions, uiValues } from './styles/appStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style={uiValues.statusBar} />
      <Tab.Navigator screenOptions={getNavigationOptions}>
        <Tab.Screen name="Opslagstavle" component={AnnouncementsScreen} />
        <Tab.Screen name="Haandvaerkere" component={ProvidersScreen} options={{ title: 'Håndværkere' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
