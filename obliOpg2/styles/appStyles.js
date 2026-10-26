import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const colors = {
  // Fælles farvepalette for appens rolige og genkendelige udtryk.
  forest: '#234d3c',
  forestLight: '#3f765c',
  forestPressed: '#2f634b',
  sand: '#e8d7b5',
  sandLight: '#f7f1e4',
  sandDark: '#cdbb96',
  ink: '#20352b',
  muted: '#66766b',
  white: '#ffffff',
  border: '#d9cbaa',
  error: '#B42318',
};

export const uiValues = {
  // Fælles størrelser for ikoner og systemets statuslinje.
  iconButton: 20,
  iconProvider: 20,
  iconContact: 16,
  statusBar: 'light',
};

// Returnerer de fælles indstillinger, som bruges af fanenavigationen.
export function getNavigationOptions({ route }) {
  return {
    headerStyle: appStyles.header,
    headerTintColor: colors.white,
    headerTitleStyle: appStyles.headerTitle,
    tabBarActiveTintColor: colors.forest,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: appStyles.tabBar,
    tabBarLabelStyle: appStyles.tabBarLabel,
    // Vælger et ikon ud fra den aktive fane.
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={route.name === 'Opslagstavle' ? 'megaphone-outline' : 'construct-outline'} color={color} size={size} />
    ),
  };
}

const appStyles = StyleSheet.create({
  // Genbrugelige styles for skærme, kort, knapper, formularer og navigation.
  // Layoutet bruger appens farvepalette, så udtrykket er ens på alle skærme.
  screen: { backgroundColor: colors.sandLight, padding: 24, paddingBottom: 36, paddingTop: 28 },
  title: { color: colors.forest, fontSize: 28, fontWeight: '700', marginBottom: 7 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 20 },
  sectionTitle: { color: colors.forest, fontSize: 17, fontWeight: '700', marginBottom: 10 },
  divider: { backgroundColor: colors.sandDark, height: 1, marginBottom: 16, width: '100%' },
  announcementCard: { backgroundColor: colors.sand, borderColor: colors.border, borderRadius: 10, borderWidth: 1, marginBottom: 14, padding: 17 },
  announcementTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  announcementHeader: { color: colors.forest, flex: 1, fontSize: 19, fontWeight: '700' },
  badge: { backgroundColor: colors.forestLight, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5 },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  announcementText: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  meta: { color: colors.forestLight, fontSize: 13, fontWeight: '700', marginBottom: 9 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.forest, borderRadius: 9, flexDirection: 'row', justifyContent: 'center', marginBottom: 24, minHeight: 50, paddingHorizontal: 18 },
  primaryButtonPressed: { backgroundColor: colors.forestPressed },
  modalPrimaryButton: { flex: 1, marginBottom: 0 },
  savingButton: { opacity: 0.6 },
  buttonIcon: { marginRight: 8 },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  search: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: 9, borderWidth: 1, color: colors.ink, fontSize: 15, marginBottom: 18, paddingHorizontal: 15, paddingVertical: 13 },
  providerCard: { backgroundColor: colors.sand, borderColor: colors.border, borderRadius: 10, borderWidth: 1, marginBottom: 12, padding: 16 },
  providerHeader: { alignItems: 'center', flexDirection: 'row', marginBottom: 10 },
  providerIcon: { alignItems: 'center', backgroundColor: colors.forestLight, borderRadius: 20, height: 40, justifyContent: 'center', marginRight: 11, width: 40 },
  providerName: { color: colors.forest, fontSize: 17, fontWeight: '700' },
  providerType: { color: colors.muted, fontSize: 13, marginTop: 2 },
  contactRow: { alignItems: 'center', flexDirection: 'row', marginTop: 6 },
  contactText: { color: colors.ink, fontSize: 14, marginLeft: 8 },
  modalOverlay: { backgroundColor: 'rgba(32, 53, 43, 0.42)', flex: 1, justifyContent: 'flex-end' },
  modal: { backgroundColor: colors.sandLight, borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 24, paddingBottom: 34 },
  modalTitle: { color: colors.forest, fontSize: 22, fontWeight: '700', marginBottom: 18 },
  inputLabel: { color: colors.forest, fontSize: 13, fontWeight: '700', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: 8, borderWidth: 1, color: colors.ink, fontSize: 15, padding: 12 },
  multiline: { minHeight: 84, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  secondaryButton: { alignItems: 'center', borderColor: colors.forest, borderRadius: 9, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 48 },
  secondaryButtonText: { color: colors.forest, fontWeight: '700' },
  empty: { color: colors.muted, fontSize: 15, paddingVertical: 18, textAlign: 'center' },
  error: { color: colors.error, fontSize: 14, paddingVertical: 12, textAlign: 'center' },
  header: { backgroundColor: colors.forest },
  headerTitle: { fontWeight: '700' },
  tabBar: { backgroundColor: colors.sandLight, borderTopColor: colors.border, height: 72, paddingBottom: 10, paddingTop: 8 },
  tabBarLabel: { fontSize: 12, fontWeight: '700' },
});

export default appStyles;