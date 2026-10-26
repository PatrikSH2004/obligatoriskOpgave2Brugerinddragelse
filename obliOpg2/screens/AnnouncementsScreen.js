import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appStyles, { colors, uiValues } from '../styles/appStyles';
import { saveItem, storageKeys, subscribeToAnnouncements } from '../services/dataService';

export default function AnnouncementsScreen() {
  // Holder styr på opslag, formularens indhold og status for indlæsning og lagring.
  const [announcements, setAnnouncements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Lytter løbende efter nye opslag, så listen opdateres automatisk.
    const unsubscribe = subscribeToAnnouncements(
      (items) => {
        // Gemmer de modtagne opslag og skjuler eventuelle tidligere fejl.
        setAnnouncements(items);
        setLoading(false);
        setError('');
      },
      () => {
        // En fejl vises på skærmen i stedet for at efterlade brugeren med en tom liste.
        setLoading(false);
        setError('Opslagene kunne ikke hentes.');
      },
    );
    // Afmelder lytteren, når skærmen fjernes, så der ikke opstår hukommelseslækager.
    return unsubscribe;
  }, []);

  async function addAnnouncement() {
    // Et opslag kræver både en overskrift og en besked.
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    try {
      // Gemmer trimmede værdier, så overflødige mellemrum ikke sendes videre.
      const newAnnouncement = await saveItem('announcements', storageKeys.announcementKey, { title: title.trim(), body: body.trim(), author: 'Administration', createdAt: 'Lige nu' });
      // Opdaterer listen med det samme, så opslaget vises uden genstart.
      setAnnouncements((current) => [newAnnouncement, ...current]);
      setTitle('');
      setBody('');
      // Lukker formularen efter en vellykket lagring.
      setModalVisible(false);
    } catch (saveError) {
      // Giver brugeren en tydelig besked, hvis data ikke kan gemmes.
      console.error('Fejl ved lagring af opslag:', saveError);
      Alert.alert('Kunne ikke gemme opslaget', 'Kontroller forbindelsen og prøv igen.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={appStyles.screen}>
      <Text style={appStyles.title}>Beboerinfo</Text>
      <Text style={appStyles.subtitle}>Et samlet sted for beskeder fra administrationen og viceværten.</Text>
      {/* Åbner formularen, hvor administrationen kan skrive et nyt opslag. */}
      <Pressable accessibilityRole="button" onPress={() => setModalVisible(true)} style={({ pressed }) => [appStyles.primaryButton, pressed && appStyles.primaryButtonPressed]}>
        <Ionicons name="add-circle-outline" size={uiValues.iconButton} color={colors.white} style={appStyles.buttonIcon} />
        <Text style={appStyles.primaryButtonText}>Opret opslag</Text>
      </Pressable>
      <Text style={appStyles.sectionTitle}>Seneste opslag</Text>
      <View style={appStyles.divider} />
      {/* Viser en indikator under indlæsning og ellers alle opslag i rækkefølge. */}
      {loading ? <ActivityIndicator color={colors.forest} /> : announcements.map((announcement) => (
        <View key={announcement.id} style={appStyles.announcementCard}>
          <View style={appStyles.announcementTop}><Text style={appStyles.announcementHeader}>{announcement.title}</Text><View style={appStyles.badge}><Text style={appStyles.badgeText}>{announcement.createdAt}</Text></View></View>
          <Text style={appStyles.meta}>{announcement.author}</Text>
          <Text style={appStyles.announcementText}>{announcement.body}</Text>
        </View>
      ))}
      {error ? <Text style={appStyles.error}>{error}</Text> : null}
      {/* Informerer brugeren om, at opslagene kun gemmes på denne enhed. */}
      <Text style={appStyles.meta}>Gemmes lokalt på denne enhed</Text>
      {/* Modalvinduet indeholder felterne til oprettelse af et nyt opslag. */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={appStyles.modalOverlay}><View style={appStyles.modal}>
          <Text style={appStyles.modalTitle}>Nyt opslag</Text>
          <Text style={appStyles.inputLabel}>Overskrift</Text><TextInput value={title} onChangeText={setTitle} placeholder="Fx gårdrumsdag" placeholderTextColor={colors.muted} style={appStyles.input} />
          <Text style={appStyles.inputLabel}>Besked</Text><TextInput multiline value={body} onChangeText={setBody} placeholder="Skriv beskeden til beboerne" placeholderTextColor={colors.muted} style={[appStyles.input, appStyles.multiline]} />
          <View style={appStyles.modalActions}><Pressable disabled={saving} onPress={() => setModalVisible(false)} style={appStyles.secondaryButton}><Text style={appStyles.secondaryButtonText}>Annuller</Text></Pressable><Pressable disabled={saving} onPress={addAnnouncement} style={[appStyles.primaryButton, appStyles.modalPrimaryButton, saving && appStyles.savingButton]}><Text style={appStyles.primaryButtonText}>{saving ? 'Gemmer...' : 'Udgiv'}</Text></Pressable></View>
        </View></View>
      </Modal>
    </ScrollView>
  );
}