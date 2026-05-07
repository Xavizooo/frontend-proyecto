import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { 
  Save, 
  MapPin, 
  Box, 
  DollarSign, 
  Phone, 
  Tag, 
  Calendar,
  Info
} from "lucide-react-native";

const PhotoDetailScreen = ({ route, navigation }) => {
  const { photo } = route.params;

  // Estados del formulario inicializados con datos previos
  const [title, setTitle] = useState(photo.title || "");
  const [quantity, setQuantity] = useState(photo.quantity || "");
  const [price, setPrice] = useState(photo.price || "");
  const [location, setLocation] = useState(photo.locationInfo || "");
  const [farmerPhone, setFarmerPhone] = useState(photo.farmerPhone || "");
  const [variety, setVariety] = useState(photo.variety || "");
  const [description, setDescription] = useState(photo.note || "");

  const handleSave = () => {
    const updatedLog = {
      ...photo,
      title,
      quantity,
      price,
      locationInfo: location,
      farmerPhone,
      variety,
      note: description,
    };
    navigation.navigate("HomeAgricultor", { updatedLog });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Image source={{ uri: photo.uri }} style={styles.headerImage} />

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Detalles de la Publicación</Text>

            {/* Campo: Producto */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre del Producto</Text>
              <View style={styles.inputWrapper}>
                <Tag size={20} color="#709742" />
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ej: Papa Sabanera"
                />
              </View>
            </View>

            {/* Campo: Teléfono */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono de Contacto (WhatsApp)</Text>
              <View style={styles.inputWrapper}>
                <Phone size={20} color="#709742" />
                <TextInput
                  style={styles.input}
                  value={farmerPhone}
                  onChangeText={setFarmerPhone}
                  placeholder="Ej: 3101234567"
                  keyboardType="phone-pad"
                />
              </View>
            </View>