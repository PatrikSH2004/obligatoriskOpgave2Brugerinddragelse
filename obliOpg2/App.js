import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import ProvidersScreen from './screens/ProvidersScreen';
import { getNavigationOptions, uiValues } from './styles/appStyles';

// Opretter navigatoren, som styrer appens faner nederst på skærmen.
const Tab = createBottomTabNavigator();

export default function App() {
  // Samler navigation, statuslinje og de to hovedskærme i appens rodkomponent.
  return (
    // Appens hovednavigation består af to faner: opslagstavlen og håndværkerlisten.
    <NavigationContainer>
      <StatusBar style={uiValues.statusBar} />
      <Tab.Navigator screenOptions={getNavigationOptions}>
        <Tab.Screen name="Opslagstavle" component={AnnouncementsScreen} />
        <Tab.Screen name="Haandvaerkere" component={ProvidersScreen} options={{ title: 'Håndværkere' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
