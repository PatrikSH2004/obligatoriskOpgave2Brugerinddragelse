import { StyleSheet } from 'react-native';

export const colors = {
  forest: '#234d3c',
  forestLight: '#3f765c',
  forestPressed: '#2f634b',
  sand: '#e8d7b5',
  sandLight: '#f7f1e4',
  sandDark: '#cdbb96',
  reserved: '#e5b93f',
  ink: '#20352b',
  muted: '#66766b',
  white: '#ffffff',
  border: '#d9cbaa',
  available: '#4cae61',
  occupied: '#d64545',
  coral: '#c76b55',
};

const globalStyles = StyleSheet.create({
  screen: {
    backgroundColor: colors.sandLight,
    flex: 1,
    padding: 24,
    paddingTop: 28,
  },
  scrollContent: {
    backgroundColor: colors.sandLight,
    padding: 24,
    paddingTop: 28,
    paddingBottom: 36,
  },
  title: { color: colors.forest, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  sectionTitle: { color: colors.forest, fontSize: 17, fontWeight: '700' },
  divider: { backgroundColor: colors.sandDark, height: 1, width: '100%' },
  card: { backgroundColor: colors.sand, borderColor: colors.border, borderRadius: 10, borderWidth: 1 },
});

export default globalStyles;