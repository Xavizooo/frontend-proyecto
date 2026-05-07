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
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Image
          source={require("../../imagenes/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.inputBox}>
          <Mail size={20} color="#709742" />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputBox}>
          <Lock size={20} color="#709742" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.8 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnText}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.registerText}>
            ¿No tienes cuenta? <Text style={styles.bold}>Regístrate aquí</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    content: {
      flex: 1,
      padding: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: { width: 180, height: 80, marginBottom: 30 },
    title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 30 },
    inputBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#709742",
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 20,
      width: "100%",
      height: 55,
    },
    input: { flex: 1, marginLeft: 10, color: "#333" },
    btn: {
      backgroundColor: "#709742",
      width: "100%",
      height: 55,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      elevation: 3,
    },
    btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
    registerLink: { marginTop: 25 },
    registerText: { color: "#666", fontSize: 14 },
    bold: { color: "#709742", fontWeight: "bold" },
  });
  
  export default LoginScreen;