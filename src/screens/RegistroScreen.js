export const DEPARTAMENTOS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", 
  "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", 
  "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", 
  "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", 
  "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

import { useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../config";

export const useRegistro = (navigation) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert("Error", "Completa los campos principales.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: form.fullName.trim().split(' ')[0],
          last_name: form.fullName.trim().split(' ').slice(1).join(' '),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          telefono: form.phone,
          rol: form.role,
          ubicacion: form.location
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("¡Éxito!", "Usuario creado en el servidor de RURATEC");
        navigation.navigate("Login");
      } else {
        console.log("Error del servidor:", data);
        Alert.alert("Error", "Revisa los datos ingresados.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de conexión", "Asegúrate de que el servidor Django esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, loading, handleRegister };
};

import React from "react";
import { View, Modal, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

const SelectorModal = ({ visible, type, data, onSelect }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)} style={styles.opt}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#FFF", width: "80%", maxHeight: "60%", borderRadius: 10, padding: 20 },
  opt: { padding: 15, borderBottomWidth: 1, borderColor: "#EEE" },
});

export default SelectorModal;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { User, Mail, Lock, MapPin, ChevronDown, Phone } from "lucide-react-native";
import { DEPARTAMENTOS } from "../constants/regiones";
import { useRegistro } from "../hooks/useRegistro";
import SelectorModal from "../components/SelectorModal";

const RegistroScreen = ({ navigation }) => {
  const { form, setForm, loading, handleRegister } = useRegistro(navigation);
  const [modalVisible, setModalVisible] = useState({ visible: false, type: "" });

  const selectOption = (item) => {
    setForm({ ...form, [modalVisible.type]: item });
    setModalVisible({ visible: false, type: "" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={require("../../imagenes/logo.jpeg")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Registro de Usuario</Text>

          {/* Inputs de Texto */}
          <View style={styles.inputBox}>
            <User size={20} color="#709742" />
            <TextInput style={styles.input} placeholder="Nombre y Apellido" autoCapitalize="words" onChangeText={(v) => setForm({ ...form, fullName: v })} />
          </View>

          <View style={styles.inputBox}>
            <Mail size={20} color="#709742" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={(v) => setForm({ ...form, email: v })} />
          </View>

          <View style={styles.inputBox}>
            <Phone size={20} color="#709742" />
            <TextInput style={styles.input} placeholder="Celular" keyboardType="phone-pad" onChangeText={(v) => setForm({ ...form, phone: v })} />
          </View>

          {/* Selectores Modales */}
          <TouchableOpacity style={styles.inputBox} onPress={() => setModalVisible({ visible: true, type: "role" })}>
            <User size={20} color="#709742" />
            <Text style={[styles.input, !form.role && { color: '#999' }]}>{form.role || "Seleccionar Rol"}</Text>
            <ChevronDown size={20} color="#709742" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputBox} onPress={() => setModalVisible({ visible: true, type: "location" })}>
            <MapPin size={20} color="#709742" />
            <Text style={[styles.input, !form.location && { color: '#999' }]}>{form.location || "Ubicación"}</Text>
            <ChevronDown size={20} color="#709742" />
          </TouchableOpacity>

          {/* Contraseñas */}
          <View style={styles.inputBox}>
            <Lock size={20} color="#709742" />
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
          </View>

          <View style={styles.inputBox}>
            <Lock size={20} color="#709742" />
            <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry onChangeText={(v) => setForm({ ...form, confirmPassword: v })} />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>REGISTRARSE</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectorModal 
        visible={modalVisible.visible} 
        type={modalVisible.type} 
        data={modalVisible.type === "role" ? ["Agricultor", "Comerciante"] : DEPARTAMENTOS}
        onSelect={selectOption}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollContainer: { padding: 30, alignItems: "center" },
  logo: { width: 150, height: 60, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 20 },
  inputBox: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#709742", marginBottom: 15, width: "100%", height: 50 },
  input: { flex: 1, marginLeft: 10, color: "#333" },
  btn: { backgroundColor: "#709742", width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20 },
  btnText: { color: "#FFF", fontWeight: "bold" },
});

export default RegistroScreen;