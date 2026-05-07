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

