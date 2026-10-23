import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import appStyles from '../styles/appStyles';
import { colors } from '../styles/globalStyles';
import { getProviders, saveItem, storageKeys } from '../services/dataService';

export default function ProvidersScreen() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', phone: '', email: '' });

  useEffect(() => { getProviders().then(setProviders); }, []);

  const visibleProviders = providers.filter((provider) => `${provider.name} ${provider.category}`.toLowerCase().includes(search.toLowerCase()));
  function updateForm(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  async function addProvider() {
    if (!form.name.trim() || !form.category.trim() || !form.phone.trim()) return;
    const item = await saveItem('providers', storageKeys.providerKey, form);
    setProviders((current) => [item, ...current]);
    setForm({ name: '', category: '', phone: '', email: '' });
    setModalVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={appStyles.screen}>
      <Text style={appStyles.title}>Håndværkerliste</Text>
      <Text style={appStyles.subtitle}>Find en anbefalet fagperson, når noget skal løses i ejendommen.</Text>
      <Pressable accessibilityRole="button" onPress={() => setModalVisible(true)} style={appStyles.primaryButton}><Ionicons name="person-add-outline" size={20} color={colors.white} style={appStyles.buttonIcon} /><Text style={appStyles.primaryButtonText}>Tilføj fagperson</Text></Pressable>
      <TextInput accessibilityLabel="Søg i håndværkerlisten" value={search} onChangeText={setSearch} placeholder="Søg på navn eller fagområde" placeholderTextColor={colors.muted} style={appStyles.search} />
      {visibleProviders.map((provider) => <View key={provider.id} style={appStyles.providerCard}>
        <View style={appStyles.providerHeader}><View style={appStyles.providerIcon}><Ionicons name="construct-outline" color={colors.white} size={20} /></View><View><Text style={appStyles.providerName}>{provider.name}</Text><Text style={appStyles.providerType}>{provider.category}</Text></View></View>
        <View style={appStyles.contactRow}><Ionicons name="call-outline" color={colors.forestLight} size={16} /><Text style={appStyles.contactText}>{provider.phone}</Text></View>
        <View style={appStyles.contactRow}><Ionicons name="mail-outline" color={colors.forestLight} size={16} /><Text style={appStyles.contactText}>{provider.email || 'Ingen e-mail angivet'}</Text></View>
      </View>)}
      {!visibleProviders.length && <Text style={appStyles.empty}>Ingen fagpersoner matcher din søgning.</Text>}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}><View style={appStyles.modalOverlay}><View style={appStyles.modal}>
        <Text style={appStyles.modalTitle}>Tilføj fagperson</Text>
        <Text style={appStyles.inputLabel}>Navn eller firma</Text><TextInput value={form.name} onChangeText={(value) => updateForm('name', value)} style={appStyles.input} placeholder="Fx Madsens Tømrer" placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>Fagområde</Text><TextInput value={form.category} onChangeText={(value) => updateForm('category', value)} style={appStyles.input} placeholder="Fx Maler, VVS eller elektriker" placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>Telefon</Text><TextInput value={form.phone} onChangeText={(value) => updateForm('phone', value)} keyboardType="phone-pad" style={appStyles.input} placeholder="+45 ..." placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>E-mail</Text><TextInput value={form.email} onChangeText={(value) => updateForm('email', value)} keyboardType="email-address" style={appStyles.input} placeholder="kontakt@firma.dk" placeholderTextColor={colors.muted} />
        <View style={appStyles.modalActions}><Pressable onPress={() => setModalVisible(false)} style={appStyles.secondaryButton}><Text style={appStyles.secondaryButtonText}>Annuller</Text></Pressable><Pressable onPress={addProvider} style={[appStyles.primaryButton, { flex: 1, marginBottom: 0 }]}><Text style={appStyles.primaryButtonText}>Gem</Text></Pressable></View>
      </View></View></Modal>
    </ScrollView>
  );
}