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