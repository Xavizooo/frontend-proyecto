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

