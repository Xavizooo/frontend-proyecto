📑 Guía de Configuración y Ejecución del Proyecto
Este documento contiene los pasos detallados para replicar el entorno de desarrollo y ejecutar la aplicación de bitácora técnica.

🚀 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

Node.js (Versión LTS recomendada).

Git (Para clonar el repositorio).

Expo Go (En tu celular físico) o un emulador de Android configurado.

🛠️ Paso 1: Instalación de Dependencias Base
Una vez clonado el proyecto, abre una terminal en la carpeta raíz y ejecuta:

Bash
# Instalar el CLI de Expo de forma global (opcional pero recomendado)
npm install -g expo-cli

# Instalar todas las dependencias del package.json
npm install
📦 Paso 2: Instalación de Dependencias Específicas
Si estás iniciando el proyecto desde cero en otra carpeta, debes instalar estas librerías en el siguiente orden para evitar conflictos de versiones:

1. Navegación (React Navigation)
Es el núcleo de la navegación entre pantallas.

Bash
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
2. Iconografía (Lucide React Native)
Para los iconos de MapPin, Save, Lock, etc.

Bash
npm install lucide-react-native
3. Autenticación Biométrica (Expo Local Authentication)
Para la seguridad con huella o rostro en el Home.

Bash
npx expo install expo-local-authentication
4. Cámara y Ubicación
Componentes esenciales para capturar la evidencia técnica.

Bash
npx expo install expo-camera expo-location
🏃 Paso 3: Ejecución del Proyecto
Una vez instaladas todas las dependencias, inicia el servidor de desarrollo:

Bash
npx expo start
Opciones de visualización:
Android: Presiona a en la terminal (requiere Android Studio y emulador abierto).

iOS: Presiona i en la terminal (solo en macOS con Xcode).

Celular Físico: Escanea el código QR que aparece en la terminal usando la app Expo Go.

⚠️ Solución de Problemas Comunes
Error: "Module not found": Ejecuta npm install nuevamente.

Error de SDK en Expo Go: Asegúrate de que tu app Expo Go esté actualizada en la Play Store/App Store.

Caché corrupto: Si los cambios no se ven reflejados, limpia la caché con:

Bash
npx expo start -c
📂 Estructura del Proyecto
HomeScreen.js: Lista de bitácoras y acceso biométrico.

PhotoDetailScreen.js: Visualización de coordenadas y edición de reporte técnico.

CameraScreen.js: Captura de fotos y obtención de coordenadas GPS.

Nota Técnica: Este proyecto utiliza npx expo install en lugar de npm install para las librerías de Expo, ya que esto garantiza que se instale la versión exacta compatible con tu versión de Expo SDK.
