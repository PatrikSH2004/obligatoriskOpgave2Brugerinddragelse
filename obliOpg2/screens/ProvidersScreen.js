import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import appStyles from '../styles/appStyles';
import { colors, uiValues } from '../styles/appStyles';
import { saveItem, storageKeys, subscribeToProviders } from '../services/dataService';

export default function ProvidersScreen() {
  // Holder styr på fagpersoner, søgning, formularen og igangværende handlinger.
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Lytter efter ændringer, så håndværkerlisten altid viser de nyeste data.
    const unsubscribe = subscribeToProviders(
      (items) => {
        // Opdaterer listen og nulstiller tidligere fejl, når data modtages.
        setProviders(items);
        setLoading(false);
        setError('');
      },
      () => {
        // Viser en fejl, hvis fagpersonerne ikke kan hentes fra lageret.
        setLoading(false);
        setError('Fagpersonerne kunne ikke hentes. Kontroller forbindelsen og prøv igen.');
      },
    );
    // Stopper abonnementet, når skærmen ikke længere er aktiv.
    return unsubscribe;
  }, []);

  // Begrænser listen til fagpersoner, hvis navn eller fagområde matcher søgningen.
  const visibleProviders = providers.filter((provider) => `${provider.name} ${provider.category}`.toLowerCase().includes(search.toLowerCase()));

  // Opdaterer kun det felt, brugeren er i gang med at redigere.
  function updateForm(field, value) { setForm((current) => ({ ...current, [field]: value })); }

  async function addProvider() {
    // Navn, fagområde og telefonnummer er nødvendige for at gemme en fagperson.
    if (!form.name.trim() || !form.category.trim() || !form.phone.trim()) return;
    setSaving(true);
    try {
      // Fjerner overflødige mellemrum, før fagpersonen gemmes.
      const newProvider = await saveItem('providers', storageKeys.providerKey, { ...form, name: form.name.trim(), category: form.category.trim(), phone: form.phone.trim(), email: form.email.trim() });
      // Opdaterer listen med det samme, så den nye fagperson vises uden genstart.
      setProviders((current) => [newProvider, ...current]);
      setForm({ name: '', category: '', phone: '', email: '' });
      // Rydder formularen og lukker den, når gemningen lykkes.
      setModalVisible(false);
    } catch (saveError) {
      // Gør forbindelsesproblemer tydelige for brugeren.
      console.error('Fejl ved lagring af fagperson:', saveError);
      Alert.alert('Kunne ikke gemme fagpersonen', 'Kontroller forbindelsen og prøv igen.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={appStyles.screen}>
      <Text style={appStyles.title}>Håndværkerliste</Text>
      <Text style={appStyles.subtitle}>Find en anbefalet fagperson, når noget skal løses i ejendommen.</Text>
      {/* Åbner formularen til oprettelse af en ny fagperson. */}
      <Pressable accessibilityRole="button" onPress={() => setModalVisible(true)} style={appStyles.primaryButton}><Ionicons name="person-add-outline" size={uiValues.iconButton} color={colors.white} style={appStyles.buttonIcon} /><Text style={appStyles.primaryButtonText}>Tilføj fagperson</Text></Pressable>
      <TextInput accessibilityLabel="Søg i håndværkerlisten" value={search} onChangeText={setSearch} placeholder="Søg på navn eller fagområde" placeholderTextColor={colors.muted} style={appStyles.search} />
      {loading ? <Text style={appStyles.empty}>Henter fagpersoner...</Text> : null}
      {/* Viser kun fagpersoner, der passer til den aktuelle søgning. */}
      {visibleProviders.map((provider) => <View key={provider.id} style={appStyles.providerCard}>
        <View style={appStyles.providerHeader}><View style={appStyles.providerIcon}><Ionicons name="construct-outline" color={colors.white} size={uiValues.iconProvider} /></View><View><Text style={appStyles.providerName}>{provider.name}</Text><Text style={appStyles.providerType}>{provider.category}</Text></View></View>
        <View style={appStyles.contactRow}><Ionicons name="call-outline" color={colors.forestLight} size={uiValues.iconContact} /><Text style={appStyles.contactText}>{provider.phone}</Text></View>
        <View style={appStyles.contactRow}><Ionicons name="mail-outline" color={colors.forestLight} size={uiValues.iconContact} /><Text style={appStyles.contactText}>{provider.email || 'Ingen e-mail angivet'}</Text></View>
      </View>)}
      {!visibleProviders.length && <Text style={appStyles.empty}>Ingen fagpersoner matcher din søgning.</Text>}
      {error ? <Text style={appStyles.error}>{error}</Text> : null}
      {/* Modalvinduet samler kontaktoplysningerne for den nye fagperson. */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}><View style={appStyles.modalOverlay}><View style={appStyles.modal}>
        <Text style={appStyles.modalTitle}>Tilføj fagperson</Text>
        <Text style={appStyles.inputLabel}>Navn eller firma</Text><TextInput value={form.name} onChangeText={(value) => updateForm('name', value)} style={appStyles.input} placeholder="Fx Madsens Tømrer" placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>Fagområde</Text><TextInput value={form.category} onChangeText={(value) => updateForm('category', value)} style={appStyles.input} placeholder="Fx Maler, VVS eller elektriker" placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>Telefon</Text><TextInput value={form.phone} onChangeText={(value) => updateForm('phone', value)} keyboardType="phone-pad" style={appStyles.input} placeholder="+45 ..." placeholderTextColor={colors.muted} />
        <Text style={appStyles.inputLabel}>E-mail</Text><TextInput value={form.email} onChangeText={(value) => updateForm('email', value)} keyboardType="email-address" style={appStyles.input} placeholder="kontakt@firma.dk" placeholderTextColor={colors.muted} />
        <View style={appStyles.modalActions}><Pressable disabled={saving} onPress={() => setModalVisible(false)} style={appStyles.secondaryButton}><Text style={appStyles.secondaryButtonText}>Annuller</Text></Pressable><Pressable disabled={saving} onPress={addProvider} style={[appStyles.primaryButton, appStyles.modalPrimaryButton, saving && appStyles.savingButton]}><Text style={appStyles.primaryButtonText}>{saving ? 'Gemmer...' : 'Gem'}</Text></Pressable></View>
      </View></View></Modal>
    </ScrollView>
  );
}