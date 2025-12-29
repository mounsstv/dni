# 🔍 Mounss Tv (DNI) - Sistema de Consulta DNI Perú

Sistema web moderno de consulta de DNI para estudiantes de Vallegrande, integrado con múltiples APIs oficiales de RENIEC (Perú).

![Plan](https://img.shields.io/badge/Plan-STUDENT-8B5CF6?style=for-the-badge)
![APIs](https://img.shields.io/badge/APIs-3-3B82F6?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-22C55E?style=for-the-badge)

---

## 📖 Descripción

**Mounss Tv (DNI)** es una aplicación web de consulta de DNI diseñada exclusivamente para estudiantes de la institución Vallegrande. Esta plataforma permite realizar consultas rápidas y precisas de información personal asociada a documentos de identidad peruanos (DNI) mediante la integración con tres APIs oficiales de RENIEC.

### ¿Qué hace esta página?

Esta aplicación web permite a los usuarios autorizados:

- 🔐 **Acceder de forma segura** mediante autenticación institucional (solo correos @vallegrande.edu.pe)
- 🔍 **Consultar información de DNI** ingresando el número de documento de 8 dígitos
- 🌐 **Elegir entre 3 APIs diferentes** (Decolecta, PeruDevs, MiApi) para obtener los datos
- 📊 **Visualizar resultados completos** incluyendo nombres, apellidos, género, fecha de nacimiento y código de verificación
- 💼 **Gestionar consultas ilimitadas** bajo el plan STUDENT predeterminado

### Propósito

El sistema fue desarrollado como una herramienta educativa y práctica para facilitar la verificación de identidad y consulta de datos personales de manera rápida, segura y con una interfaz moderna y atractiva. Ideal para proyectos académicos, verificación de datos o aprendizaje sobre integración de APIs REST.

---

## ✨ Características

### 🔐 Seguridad
- **Autenticación Institucional**: Solo correos `@vallegrande.edu.pe`
- **Validación de Código de Aula**: Formato `AS###` con año ≥ 20
- **Sin Ejemplos en Placeholders**: Previene acceso no autorizado

### 🌐 Integración de APIs
- **V1 - Decolecta API**: Consulta básica de DNI
- **V2 - PeruDevs API**: Consulta completa con género y fecha de nacimiento
- **V3 - MiApi Cloud**: Consulta alternativa de DNI

### 🎨 Diseño Premium
- **Dark Mode Cyberpunk**: Tema oscuro con efectos de neón
- **Glassmorphism**: Tarjetas con efecto de vidrio y blur
- **Animaciones Suaves**: Transiciones fluidas y micro-interacciones
- **Responsive**: Adaptable a móviles, tablets y escritorio
- **Tipografía Moderna**: Inter y Outfit de Google Fonts

---

## 🚀 Uso

### 1. Abrir la Aplicación
Abre el archivo `index.html` en tu navegador:
```
file:///c:/Users/ManuCuaresmaSalhuana/Documents/dni/index.html
```

### 2. Iniciar Sesión
- **Correo**: Ingresa tu correo institucional `@vallegrande.edu.pe`
- **Código de Aula**: Formato `AS###` (ejemplo: `AS231`, `AS241`)
  - El año debe ser ≥ 20 (válido: `AS201`, `AS231` | inválido: `AS191`)

### 3. Consultar DNI
1. Selecciona una API (V1, V2 o V3) haciendo clic en las pestañas
2. Ingresa un DNI de 8 dígitos
3. Haz clic en "Consultar"
4. Visualiza los resultados en la tarjeta de información

### 4. Cerrar Sesión
- Haz clic en "Cerrar Sesión" en la barra lateral

---

## 📁 Estructura del Proyecto

```
dni/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos con glassmorphism y dark mode
├── script.js           # Lógica de autenticación y APIs
└── README.md           # Este archivo
```

---

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Glassmorphism, gradientes, animaciones
- **JavaScript (Vanilla)**: Sin frameworks, código puro
- **Google Fonts**: Inter y Outfit
- **APIs REST**: Integración con 3 proveedores

---

## 🌐 APIs Integradas

### API V1 - Decolecta
```
Endpoint: https://api.decolecta.com/v1/reniec/dni?numero={dni}
Autenticación: Bearer Token
```

### API V2 - PeruDevs
```
Endpoint: https://api.perudevs.com/api/v1/dni/complete?document={dni}&key={key}
Autenticación: API Key en URL
```

### API V3 - MiApi Cloud
```
Endpoint: https://miapi.cloud/v1/dni/{dni}
Autenticación: Bearer Token
```

---

## ⚠️ Notas Importantes

### CORS (Cross-Origin Resource Sharing)
Al acceder a las APIs desde el navegador (especialmente con protocolo `file://`), podrías encontrar errores de CORS.

**Soluciones:**

#### Opción 1: Servidor Local (Recomendado)
```bash
# Con Python 3
cd c:\Users\ManuCuaresmaSalhuana\Documents\dni
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

```bash
# Con Node.js
cd c:\Users\ManuCuaresmaSalhuana\Documents\dni
npx -y http-server -p 8000
```
Luego abre: `http://localhost:8000`

#### Opción 2: Extensión CORS
Instala una extensión de navegador para deshabilitar CORS (solo para desarrollo).

---

## 🎯 Plan STUDENT

El plan predeterminado incluye:
- ✅ Acceso a 3 APIs de consulta
- ✅ Consultas ilimitadas
- ✅ Todos los campos de información disponibles
- ✅ Interfaz premium sin publicidad

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Background Primary | `rgb(10, 10, 20)` | Fondo principal |
| Accent Purple | `#8B5CF6` | Botones, gradientes |
| Accent Blue | `#3B82F6` | Gradientes, acentos |
| Accent Cyan | `#06B6D4` | Indicadores, detalles |
| Text Primary | `rgba(255, 255, 255, 0.95)` | Texto principal |

---

## 📱 Características Responsive

- **Desktop** (>1024px): Layout de 2 columnas con sidebar
- **Tablet** (768px-1024px): Layout adaptativo
- **Mobile** (<768px): Layout de 1 columna, pestañas verticales

---

## 🔒 Validaciones de Seguridad

### Email
```javascript
Regex: /^[^\s@]+@vallegrande\.edu\.pe$/i
```

### Código de Aula
```javascript
Regex: /^AS(\d{3})$/i
Validación adicional: Año (primeros 2 dígitos) >= 20
```

### DNI
```javascript
Regex: /^\d{8}$/
Longitud: Exactamente 8 dígitos
```

---

## 📄 Información de Respuesta

### Campos Básicos (Todas las APIs)
- DNI
- Nombres
- Apellido Paterno
- Apellido Materno
- Nombre Completo

### Campos Opcionales (Según API)
- Género
- Fecha de Nacimiento
- Código de Verificación

---

## 🎭 Efectos Visuales

- ✨ Animación flotante del logo
- ✨ Gradientes pulsantes en el fondo
- ✨ Hover effects en todos los elementos interactivos
- ✨ Transiciones suaves entre vistas
- ✨ Spinner de carga animado
- ✨ Shake animation en errores
- ✨ Slide-up animation en resultados

---

## 📞 Soporte

Para problemas o consultas sobre el sistema, contacta al administrador institucional.

---

## 📜 Licencia

© 2026/2027 Victor Cuaresma Salhuana. Todos los derechos reservados.

---

## 🚀 Inicio Rápido

1. **Descarga** o clona este repositorio
2. **Abre** `index.html` en tu navegador
3. **Inicia sesión** con tus credenciales institucionales
4. **Consulta** DNIs usando cualquiera de las 3 APIs disponibles

---

**Desarrollado con ❤️ para estudiantes de Vallegrande**