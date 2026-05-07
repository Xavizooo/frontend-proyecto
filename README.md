# 🌱 Ruratec — Frontend

Interfaz web de **Ruratec**, una plataforma que conecta agricultores con comerciantes. Los agricultores publican sus productos y los comerciantes los contactan directamente por WhatsApp para negociar. Los pagos se procesan dentro de la app con una comisión del 4%.

---

## 🚀 Tecnologías

- [React](https://react.dev/) — Librería principal de UI
- React Router — Navegación entre vistas
- Axios — Consumo de la API REST del backend
- CSS Modules / Tailwind (según configuración del proyecto)

---

## 📋 Requisitos previos

- Node.js `>= 18.x`
- npm o yarn
- Backend de Ruratec corriendo localmente (ver [README del backend](../Backend/README.md))

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Xavizooo/frontend-proyecto.git
cd frontend-proyecto

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WHATSAPP_BASE_URL=https://wa.me/
```

---

## ▶️ Ejecución

```bash
# Modo desarrollo
npm start

# Build para producción
npm run build
```

La app estará disponible en `http://localhost:3000`.

---

## 🗂️ Estructura del proyecto

```
src/
├── assets/          # Imágenes, íconos y recursos estáticos
├── components/      # Componentes reutilizables (botones, cards, modals)
├── pages/           # Vistas principales de la aplicación
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Products/    # Listado y detalle de productos
│   └── Dashboard/   # Panel del agricultor
├── services/        # Llamadas a la API (axios)
├── context/         # Estado global (auth, usuario)
├── routes/          # Configuración de rutas
└── App.jsx
```

---

## ✨ Funcionalidades principales

| Funcionalidad | Descripción |
|---|---|
| 🧑‍🌾 Registro de agricultores | Crear cuenta y gestionar perfil |
| 🛒 Publicación de productos | Subir productos con nombre, precio, cantidad, fotos y descripción |
| 🔍 Explorar productos | Los comerciantes navegan el catálogo de productos disponibles |
| 📲 Contacto por WhatsApp | Botón directo para iniciar negociación con el agricultor |
| 💳 Pago en app | Procesamiento del pago con comisión del 4% aplicada automáticamente |
| 🔐 Autenticación | Login y registro con JWT |

---

## 🔗 Conexión con el Backend

Este frontend consume la API REST del backend de Ruratec. Asegúrate de que el servidor esté activo antes de correr la app.

- Repositorio del backend: [https://github.com/Xavizooo/Backend](https://github.com/Xavizooo/Backend)
- URL base por defecto: `http://localhost:8000/api`

---

## 🤝 Contribuciones

1. Haz fork del repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'feat: descripción del cambio'`
4. Push a tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.


Contribuyentes
Luis Danilo Martinez Cañon
Andres Felipe Diaz Barbosa
Hector Ivan Amado Betancur
Javier Andres Torres Sanchez
Juan David Ducuara Santa

RURATEC
