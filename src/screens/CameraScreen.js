


import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    producto: "",
    descripcion: "",
    precio: "",
    unidad: "",
    ubicacion: "",
  });
  const cameraRef = useRef(null);

  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission} style={styles.btnAction}>
          <Text style={{ color: "white" }}>Conceder Permisos de Cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (isProcessing || !cameraRef.current) return;
    setIsProcessing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setTempPhoto(photo);
      setShowModal(true);
    } catch (error) {
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setIsProcessing(false);
    }
  };

  const publicar = async () => {
    if (!form.producto.trim())
      return Alert.alert("Error", "Escribe el nombre del producto");
    if (!form.precio.trim()) return Alert.alert("Error", "Escribe el precio");
    if (!form.unidad.trim())
      return Alert.alert("Error", "Escribe la unidad (ej: kg, lb)");
    if (!form.ubicacion.trim())
      return Alert.alert("Error", "Escribe la ubicación");

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("producto", form.producto);
      formData.append("descripcion", form.descripcion);
      formData.append("precio", form.precio);
      formData.append("unidad", form.unidad);
      formData.append("ubicacion", form.ubicacion);

      if (tempPhoto) {
        formData.append("imagen", {
          uri: tempPhoto.uri,
          type: "image/jpeg",
          name: "publicacion.jpg",
        });
      }

      const response = await fetch(`${API_URL}/publicaciones/crear/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        setShowModal(false);
        setForm({
          producto: "",
          descripcion: "",
          precio: "",
          unidad: "",
          ubicacion: "",
        });
        Alert.alert("¡Éxito!", "Publicación creada correctamente", [
          { text: "OK", onPress: () => navigation.navigate("HomeAgricultor") },
        ]);
      } else {
        const data = await response.json();
        console.error(data);
        Alert.alert("Error", "No se pudo crear la publicación");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error de conexión",
        "Verifica que el servidor esté corriendo",
      );
    } finally {
      setLoading(false);
    }
  };
