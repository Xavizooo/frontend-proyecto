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
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Cantidad</Text>
                <View style={styles.inputWrapper}>
                  <Box size={20} color="#709742" />
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="Ej: 500kg"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Precio / lb</Text>
                <View style={styles.inputWrapper}>
                  <DollarSign size={20} color="#709742" />
                  <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Ej: 2800"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ubicación de Cosecha</Text>
              <View style={styles.inputWrapper}>
                <MapPin size={20} color="#709742" />
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Ej: Mosquera, Cundinamarca"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Variedad / Calibre</Text>
              <View style={styles.inputWrapper}>
                <Info size={20} color="#709742" />
                <TextInput
                  style={styles.input}
                  value={variety}
                  onChangeText={setVariety}
                  placeholder="Ej: Gruesa / Primera"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notas adicionales</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Detalles sobre logística..."
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={24} color="#FFF" />
              <Text style={styles.saveButtonText}>Publicar Producto</Text>
            </TouchableOpacity>
            
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
    headerImage: { width: "100%", height: 250 },
    formContainer: {
      padding: 20,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -30,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#1B3A1B",
      marginBottom: 20,
    },
    inputGroup: { marginBottom: 15 },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#666",
      marginBottom: 8,
      marginLeft: 4,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F8F9FA",
      borderRadius: 12,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: "#EEE",
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 10,
      fontSize: 16,
      color: "#333",
    },
    textArea: {
      backgroundColor: "#F8F9FA",
      borderRadius: 12,
      padding: 12,
      textAlignVertical: "top",
      borderWidth: 1,
      borderColor: "#EEE",
    },
    row: { flexDirection: "row" },
    saveButton: {
      backgroundColor: "#709742",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      borderRadius: 15,
      marginTop: 20,
      gap: 10,
      elevation: 4,
    },
    saveButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  });
  
  export default PhotoDetailScreen;