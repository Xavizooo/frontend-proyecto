


import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import {
  MapPin,
  Box,
  DollarSign,
  Calendar,
  Info,
  Truck,
  Tag,
  Phone,
  MessageCircle,
  ChevronLeft,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

const DetallePublicacionComerciante = ({ route, navigation }) => {
  const { item } = route.params;

  useEffect(() => {
    registrarVisita();
  }, []);

  const registrarVisita = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(`${API_URL}/publicaciones/${item.id}/visita/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
    } catch (error) {
      console.error("Error registrando visita:", error);
    }
  };

  const handleContactar = () => {
    const mensaje = `Hola, estoy interesado en tu publicación de ${item.producto} en RURATEC.`;
    const telefono = item.vendedor_telefono
      ? item.vendedor_telefono
      : "573000000000";
    Linking.openURL(
      `whatsapp://send?text=${encodeURIComponent(mensaje)}&phone=${telefono}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <View style={styles.imageContainer}>
          {item.imagen ? (
            <Image source={{ uri: item.imagen }} style={styles.mainImage} />
          ) : (
            <View
              style={[
                styles.mainImage,
                {
                  backgroundColor: "#e0e0e0",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ color: "#999", fontSize: 16 }}>Sin imagen</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContent}>
          <View style={styles.headerSection}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productTitle}>{item.producto}</Text>
              <Text style={styles.farmerSub}>
                Publicado por: {item.vendedor_nombre || "Productor Ruratec"}
              </Text>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.priceValue}>${item.precio}</Text>
              <Text style={styles.priceUnit}>/ {item.unidad}</Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Box size={20} color="#709742" />
              <View>
                <Text style={styles.detailLabel}>Unidad</Text>
                <Text style={styles.detailValue}>{item.unidad}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MapPin size={20} color="#709742" />
              <View>
                <Text style={styles.detailLabel}>Origen</Text>
                <Text style={styles.detailValue}>{item.ubicacion}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Calendar size={20} color="#709742" />
              <View>
                <Text style={styles.detailLabel}>Publicado</Text>
                <Text style={styles.detailValue}>
                  {new Date(item.creado_en).toLocaleDateString("es-CO")}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Phone size={20} color="#709742" />
              <View>
                <Text style={styles.detailLabel}>Contacto</Text>
                <Text style={styles.detailValue}>
                  {item.vendedor_telefono || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <View style={styles.infoRow}>
              <Info size={18} color="#666" />
              <Text style={styles.infoPara}>
                {item.descripcion || "Sin descripción disponible."}
              </Text>
            </View>
          </View>

          <View style={styles.logisticCard}>
            <View style={styles.logisticHeader}>
              <Truck size={22} color="#fff" />
              <Text style={styles.logisticTitle}>Condiciones Logísticas</Text>
            </View>
            <Text style={styles.logisticText}>
              Retiro en finca o transporte a convenir con el productor.
            </Text>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.footerActions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.callBtn]}
          onPress={() => Linking.openURL(`tel:${item.vendedor_telefono}`)}
        >
          <Phone size={22} color="#709742" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.contactBtn]}
          onPress={handleContactar}
        >
          <MessageCircle size={22} color="#fff" />
          <Text style={styles.contactBtnText}>Contactar por WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: { position: "relative" },
  mainImage: { width: "100%", height: 300, backgroundColor: "#eee" },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  infoContent: {
    padding: 20,
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  productTitle: { fontSize: 28, fontWeight: "bold", color: "#1B3A1B" },
  farmerSub: { fontSize: 14, color: "#666", marginTop: 4 },
  priceBadge: {
    backgroundColor: "#F0F7E9",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  priceValue: { fontSize: 22, fontWeight: "bold", color: "#709742" },
  priceUnit: { fontSize: 12, color: "#709742", fontWeight: "600" },
  detailsGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 25 },
  detailItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  detailLabel: { fontSize: 12, color: "#999", fontWeight: "600" },
  detailValue: { fontSize: 15, color: "#333", fontWeight: "bold" },
  descriptionCard: {
    backgroundColor: "#F8F9FA",
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B3A1B",
    marginBottom: 10,
  },
  infoRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  infoPara: { fontSize: 14, color: "#555", lineHeight: 20, flex: 1 },
  logisticCard: { backgroundColor: "#709742", padding: 18, borderRadius: 20 },
  logisticHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  logisticTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  logisticText: { fontSize: 14, color: "#E0F0D5", lineHeight: 20 },
  footerActions: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    gap: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionBtn: {
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  callBtn: { width: 55, borderWidth: 1, borderColor: "#709742" },
  contactBtn: { flex: 1, backgroundColor: "#709742", elevation: 4 },
  contactBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DetallePublicacionComerciante;