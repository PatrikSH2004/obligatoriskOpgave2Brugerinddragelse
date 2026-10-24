import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appStyles, { colors, uiValues } from '../styles/appStyles';
import { saveItem, storageKeys, subscribeToAnnouncements, usesFirebase } from '../services/dataService';

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToAnnouncements(
      (items) => {
        setAnnouncements(items);
        setLoading(false);
        setError('');
      },
      () => {
        setLoading(false);
        setError('Opslagene kunne ikke hentes.');
      },
    );
    return unsubscribe;
  }, []);

  async function addAnnouncement() {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    try {
      await saveItem('announcements', storageKeys.announcementKey, { title: title.trim(), body: body.trim(), author: 'Administration', createdAt: 'Lige nu' });
      setTitle('');
      setBody('');
      setModalVisible(false);
    } catch (saveError) {
      Alert.alert('Kunne ikke gemme opslaget', 'Kontroller forbindelsen og prøv igen.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={appStyles.screen}>
      <Text style={appStyles.title}>Beboerinfo</Text>
      <Text style={appStyles.subtitle}>Et samlet sted for beskeder fra administrationen og viceværten.</Text>
      <Pressable accessibilityRole="button" onPress={() => setModalVisible(true)} style={({ pressed }) => [appStyles.primaryButton, pressed && appStyles.primaryButtonPressed]}>
        <Ionicons name="add-circle-outline" size={uiValues.iconButton} color={colors.white} style={appStyles.buttonIcon} />
        <Text style={appStyles.primaryButtonText}>Opret opslag</Text>
      </Pressable>
      <Text style={appStyles.sectionTitle}>Seneste opslag</Text>
      <View style={appStyles.divider} />
      {loading ? <ActivityIndicator color={colors.forest} /> : announcements.map((announcement) => (
        <View key={announcement.id} style={appStyles.announcementCard}>
          <View style={appStyles.announcementTop}><Text style={appStyles.announcementHeader}>{announcement.title}</Text><View style={appStyles.badge}><Text style={appStyles.badgeText}>{announcement.createdAt}</Text></View></View>
          <Text style={appStyles.meta}>{announcement.author}</Text>
          <Text style={appStyles.announcementText}>{announcement.body}</Text>
        </View>
      ))}
      {error ? <Text style={appStyles.error}>{error}</Text> : null}
      <Text style={appStyles.meta}>{usesFirebase ? 'Forbundet' : 'Gemmes lokalt indtil Firebase er sat op'}</Text>
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