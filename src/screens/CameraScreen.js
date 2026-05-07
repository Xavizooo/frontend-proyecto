


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

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFillObject} ref={cameraRef} />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.innerBtn} />
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del producto</Text>
            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Nombre del producto *"
                value={form.producto}
                onChangeText={(v) => setForm({ ...form, producto: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={form.descripcion}
                onChangeText={(v) => setForm({ ...form, descripcion: v })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Precio *"
                value={form.precio}
                onChangeText={(v) => setForm({ ...form, precio: v })}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Unidad (kg, lb, tonelada...) *"
                value={form.unidad}
                onChangeText={(v) => setForm({ ...form, unidad: v })}
              />
              <TextInput
                style={styles.input}
                placeholder="Ubicación *"
                value={form.ubicacion}
                onChangeText={(v) => setForm({ ...form, ubicacion: v })}
              />

              <TouchableOpacity
                style={[styles.modalBtn, loading && { opacity: 0.7 }]}
                onPress={publicar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalBtnText}>Publicar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBtn: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#000",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    maxHeight: "80%",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1B3A1B",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 15,
  },
  modalBtn: {
    backgroundColor: "#709742",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  modalBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelBtn: { padding: 12, alignItems: "center", marginTop: 8 },
  cancelText: { color: "#999", fontSize: 14 },
  btnAction: {
    backgroundColor: "#709742",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
});

export default CameraScreen;