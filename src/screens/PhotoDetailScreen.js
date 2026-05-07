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