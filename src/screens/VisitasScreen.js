import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { User, Phone, Clock, MessageCircle } from "lucide-react-native";

const VisitaCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <div style={styles.avatar}>
        <User size={24} color="#709742" />
      </div>
      <View style={{ flex: 1 }}>
        <Text style={styles.nombre}>{item.comerciante_nombre}</Text>
        <View style={styles.infoRow}>
          <Phone size={13} color="#999" />
          <Text style={styles.telefono}>
            {item.comerciante_telefono || "Sin teléfono"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={13} color="#999" />
          <Text style={styles.fecha}>
            {new Date(item.visitado_en).toLocaleDateString("es-CO")}
          </Text>
        </View>
      </View>
    </View>

    <TouchableOpacity
      style={styles.negociarBtn}
      onPress={() =>
        Alert.alert("Próximamente", "Sistema de negociación en desarrollo")
      }
    >
      <MessageCircle size={18} color="#fff" />
      <Text style={styles.negociarText}>Negociar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 15, padding: 15, marginBottom: 15, elevation: 3 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#F0F7E9", justifyContent: "center", alignItems: "center" },
  nombre: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 4 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 2 },
  telefono: { fontSize: 13, color: "#666" },
  fecha: { fontSize: 12, color: "#999" },
  negociarBtn: { backgroundColor: "#709742", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10 },
  negociarText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});

export default VisitaCard;

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export const useVisitas = (publicacionId) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarVisitas = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/publicaciones/${publicacionId}/visitas/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await response.json();
      setVisitas(data);
    } catch (error) {
      console.error("Error cargando visitas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVisitas();
  }, [publicacionId]);

  return { visitas, loading, recargar: cargarVisitas };
};

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B3A1B",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  list: { padding: 15 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#999", fontSize: 15 },
});

import React from "react";
import { SafeAreaView, Text, FlatList, ActivityIndicator, View } from "react-native";
import VisitaCard from "../components/VisitaCard";
import { useVisitas } from "../hooks/useVisitas";
import { styles } from "../styles/visitasStyles";

const VisitasScreen = ({ route }) => {
  const { publicacion } = route.params;
  const { visitas, loading } = useVisitas(publicacion.id);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Interesados en {publicacion.producto}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#709742" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={visitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VisitaCard item={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nadie ha visto esta publicación aún</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default VisitasScreen;