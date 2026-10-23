import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import appStyles from '../styles/appStyles';
import { colors } from '../styles/globalStyles';
import { getAnnouncements, saveItem, storageKeys, usesFirebase } from '../services/dataService';

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements).finally(() => setLoading(false));
  }, []);

  async function addAnnouncement() {
    if (!title.trim() || !body.trim()) return;
    const item = await saveItem('announcements', storageKeys.announcementKey, { title: title.trim(), body: body.trim(), author: 'Administration', createdAt: 'Lige nu' });
    setAnnouncements((current) => [item, ...current]);
    setTitle('');
    setBody('');
    setModalVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={appStyles.screen}>
      <Text style={appStyles.title}>Beboerinfo</Text>
      <Text style={appStyles.subtitle}>Et samlet sted for beskeder fra administrationen og viceværten.</Text>
      <Pressable accessibilityRole="button" onPress={() => setModalVisible(true)} style={({ pressed }) => [appStyles.primaryButton, pressed && { backgroundColor: colors.forestPressed }]}>
        <Ionicons name="add-circle-outline" size={20} color={colors.white} style={appStyles.buttonIcon} />
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
      <Text style={appStyles.meta}>{usesFirebase ? 'Forbundet til Firebase' : 'Prototype: gemmes lokalt indtil Firebase er sat op'}</Text>
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={appStyles.modalOverlay}><View style={appStyles.modal}>
          <Text style={appStyles.modalTitle}>Nyt opslag</Text>
          <Text style={appStyles.inputLabel}>Overskrift</Text><TextInput value={title} onChangeText={setTitle} placeholder="Fx gårdrumsdag" placeholderTextColor={colors.muted} style={appStyles.input} />
          <Text style={appStyles.inputLabel}>Besked</Text><TextInput multiline value={body} onChangeText={setBody} placeholder="Skriv beskeden til beboerne" placeholderTextColor={colors.muted} style={[appStyles.input, appStyles.multiline]} />
          <View style={appStyles.modalActions}><Pressable onPress={() => setModalVisible(false)} style={appStyles.secondaryButton}><Text style={appStyles.secondaryButtonText}>Annuller</Text></Pressable><Pressable onPress={addAnnouncement} style={[appStyles.primaryButton, { flex: 1, marginBottom: 0 }]}><Text style={appStyles.primaryButtonText}>Udgiv</Text></Pressable></View>
        </View></View>
      </Modal>
    </ScrollView>
  );
}