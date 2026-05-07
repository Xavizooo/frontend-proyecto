


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
