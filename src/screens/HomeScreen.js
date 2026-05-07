import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Plus, MapPin, Box, DollarSign } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

const HomeScreen = ({ navigation }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarDatos();
    });
    return unsubscribe;
  }, [navigation]);

  const cargarDatos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const nombreGuardado = await AsyncStorage.getItem("nombre");
      setNombre(nombreGuardado || "");

      const response = await fetch(`${API_URL}/publicaciones/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await response.json();

      const userId = await AsyncStorage.getItem("user_id");
      const misPubs = data.filter((p) => p.vendedor.toString() === userId);
      setPublicaciones(misPubs);
    } catch (error) {
      console.error("Error cargando publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={require("../../imagenes/logo.jpeg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.saludo}>Bienvenido a Ruratec, {nombre} </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#709742"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={publicaciones}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No tienes productos publicados aún
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
  style={styles.card}
  onPress={() => navigation.navigate("Visitas", { publicacion: item })}
>
              {item.imagen ? (
                <Image source={{ uri: item.imagen }} style={styles.cardImage} />
              ) : (
                <View style={[styles.cardImage, styles.noImage]}>
                  <Text style={{ color: "#999" }}>Sin imagen</Text>
                </View>
              )}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.producto}</Text>
                <View style={styles.infoRow}>
                  <MapPin size={14} color="#709742" />
                  <Text style={styles.infoText}>{item.ubicacion}</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Box size={14} color="#555" />
                    <Text style={styles.statText}>{item.unidad}</Text>
                  </View>
                  <View style={styles.stat}>
                    <DollarSign size={14} color="#555" />
                    <Text style={styles.statText}>${item.precio}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Camera")}
      >
        <Plus color="#FFFFFF" size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logoImage: { width: 180, height: 60 },
  saludo: { fontSize: 14, color: "#709742", fontWeight: "600", marginTop: 5 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#999", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginHorizontal: 15,
  },
  cardImage: { width: "100%", height: 180 },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  cardContent: { padding: 15 },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  infoText: {
    fontSize: 14,
    color: "#709742",
    marginLeft: 5,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 25,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    paddingTop: 12,
  },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { fontSize: 15, color: "#444", fontWeight: "bold" },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    backgroundColor: "#709742",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});

export default HomeScreen;