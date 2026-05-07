import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  Search,
  Filter,
  MapPin,
  Box,
  DollarSign,
  ChevronRight,
} from "lucide-react-native";
import { API_URL } from "../config";

const HomeComercianteScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicaciones();
  }, []);

  const getPublicaciones = async () => {
    try {
      const response = await fetch(`${API_URL}/publicaciones/`);
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.error("Error cargando publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetallePublicacion", { item })}
    >
      {item.imagen ? (
        <Image source={{ uri: item.imagen }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.noImage]}>
          <Text style={{ color: "#999", fontSize: 11 }}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.headerCard}>
          <Text style={styles.cardTitle}>{item.producto}</Text>
          <Text style={styles.varietyText}>{item.descripcion}</Text>
        </View>

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

        <View style={styles.footerCard}>
          <Text style={styles.farmerName}>Por: {item.vendedor_nombre}</Text>
          <ChevronRight size={18} color="#709742" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Image
          source={require("../../imagenes/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="¿Qué producto buscas?"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#709742"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={publicaciones.filter((p) =>
            p.producto.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Text style={styles.listTitle}>Ofertas disponibles</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay publicaciones disponibles.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: { width: 140, height: 50, alignSelf: "center", marginBottom: 10 },
  searchContainer: { flexDirection: "row", gap: 10 },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  filterBtn: {
    backgroundColor: "#709742",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  list: { padding: 20 },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#999", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: { width: 110, height: "100%", backgroundColor: "#eee" },
  noImage: { justifyContent: "center", alignItems: "center" },
  cardContent: { flex: 1, padding: 12 },
  headerCard: { marginBottom: 8 },
  cardTitle: { fontSize: 17, fontWeight: "bold", color: "#1B3A1B" },
  varietyText: { fontSize: 12, color: "#666", fontStyle: "italic" },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { fontSize: 13, color: "#709742", marginLeft: 4 },
  statsRow: { flexDirection: "row", gap: 15, marginBottom: 10 },
  stat: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: 13, fontWeight: "bold", color: "#444" },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
    paddingTop: 8,
  },
  farmerName: { fontSize: 11, color: "#999", fontWeight: "600" },
});

export default HomeComercianteScreen;