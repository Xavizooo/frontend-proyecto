


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
