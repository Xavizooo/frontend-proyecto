export const DEPARTAMENTOS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", 
  "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", 
  "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", 
  "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", 
  "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

import { useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../config";

export const useRegistro = (navigation) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert("Error", "Completa los campos principales.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: form.fullName.trim().split(' ')[0],
          last_name: form.fullName.trim().split(' ').slice(1).join(' '),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          telefono: form.phone,
          rol: form.role,
          ubicacion: form.location
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("¡Éxito!", "Usuario creado en el servidor de RURATEC");
        navigation.navigate("Login");
      } else {
        console.log("Error del servidor:", data);
        Alert.alert("Error", "Revisa los datos ingresados.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de conexión", "Asegúrate de que el servidor Django esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, loading, handleRegister };
};