import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { API_URL } from "../config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { nombre, rol, token, user_id } = data;

        // Guardamos la sesión localmente
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user_id", user_id.toString());
        await AsyncStorage.setItem("rol", rol);
        await AsyncStorage.setItem("nombre", nombre);

        Alert.alert(
          `¡Bienvenido, ${nombre}!`,
          `Has iniciado sesión como ${rol}`,
          [
            {
              text: "Continuar",
              onPress: () => {
                if (rol === "Agricultor") {
                  navigation.replace("HomeAgricultor");
                } else if (rol === "Comerciante") {
                  navigation.replace("HomeComerciante");
                } else {
                  navigation.replace("HomeAgricultor");
                }
              },
            },
          ],
        );
      } else {
        Alert.alert("Error", "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };