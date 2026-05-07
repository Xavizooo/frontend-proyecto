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
  