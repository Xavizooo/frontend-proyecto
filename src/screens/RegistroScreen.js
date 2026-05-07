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