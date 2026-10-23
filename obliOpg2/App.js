import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import ProvidersScreen from './screens/ProvidersScreen';
import { colors } from './styles/globalStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: colors.forest },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          tabBarActiveTintColor: colors.forest,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.sandLight, borderTopColor: colors.border, height: 72, paddingBottom: 10, paddingTop: 8 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={route.name === 'Opslagstavle' ? 'megaphone-outline' : 'construct-outline'} color={color} size={size} />
          ),
        })}
      >
        <Tab.Screen name="Opslagstavle" component={AnnouncementsScreen} />
        <Tab.Screen name="Haandvaerkere" component={ProvidersScreen} options={{ title: 'Håndværkere' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
