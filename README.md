# PromptLazy Frontend

<p align="center">
  <img src="public/logo.svg" alt="PromptLazy Logo" width="200" style="filter: invert(100%);"/>
</p>

## 🚀 Acerca de PromptLazy

**PromptLazy** es una plataforma avanzada para crear, optimizar y gestionar prompts de IA. Nuestro frontend está construido con las últimas tecnologías web para ofrecer una experiencia de usuario excepcional.

### ✨ Características Principales

- 🎨 **Interfaz de chat moderna** con modo claro/oscuro
- 🔄 **Sistema de autenticación** seguro
- ⚡ **Rendimiento optimizado** con Vite
- 🎯 **Enfoque en UX** con animaciones sutiles y retroalimentación visual
- ⭐ **Sistema de favoritos** para guardar tus prompts preferidos

## Estructura del Proyecto

```
src/
├── api/           # Configuración de la API
├── assets/        # Recursos estáticos (imágenes, fuentes)
├── components/    # Componentes de Vue
│   ├── icons/     # Componentes de iconos
│   ├── prompts/   # Componentes de prompts
│   └── shared/    # Componentes compartidos
├── composables/   # Lógica reutilizable
├── layouts/       # Diseños de la aplicación
├── router/        # Configuración del enrutador
├── services/      # Servicios de la aplicación
├── stores/        # Almacenamiento de estado (Pinia)
├── types/         # Definiciones de TypeScript
└── views/         # Vistas principales
```

## 🛠 Requisitos Previos

- Node.js (v18 o superior)
- pnpm (Gestor de paquetes obligatorio)
- Git

> **Nota importante:** Este proyecto utiliza pnpm como gestor de paquetes. El uso de npm o yarn no está soportado y puede causar problemas de compatibilidad.

## Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/promptlazy.git
cd promptlazy/promptlazy-frontend
```

2. **Instalar pnpm (si no lo tienes instalado)**

```bash
# Instalar pnpm globalmente
npm install -g pnpm
```

3. **Instalar dependencias**

```bash
pnpm install
```

> ℹ️ **Importante:** Usa siempre pnpm para instalar dependencias. Otros gestores como npm o yarn no son compatibles.

3. **Configurar variables de entorno**

Crea un archivo `.env.local` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🚀 Iniciar el Servidor de Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## 🏗 Comandos de Construcción

```bash
# Construir para producción
pnpm build

# Previsualizar compilación de producción localmente
pnpm preview

# Ejecutar tests
pnpm test

# Ejecutar linter
pnpm lint

# Formatear código
pnpm format
```

## Comandos Disponibles

- `dev`: Inicia el servidor de desarrollo
- `build`: Compila para producción
- `preview`: Previsualiza la compilación de producción
- `test`: Ejecuta las pruebas
- `lint`: Ejecuta el linter
- `format`: Formatea el código

## 🛠 Tecnologías Utilizadas

- **Framework Principal**: Vue 3 con Composition API
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: Pinia
- **Enrutamiento**: Vue Router
- **Bundler**: Vite
- **Iconos**: Lucide Icons
- **Formularios**: Vee-Validate
- **Peticiones HTTP**: Axios
- **Animaciones**: Framer Motion
- **Testing**: Vitest

## 🌟 Novedades (v0.1.0)

### Características Implementadas

- Sistema de autenticación completo con registro y login
- Interfaz de chat mejorada
- Sistema de favoritos
- Perfil de usuario personalizable
- Modo oscuro con persistencia
- Diseño responsive mejorado
- Optimizaciones de rendimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## 📧 Contacto

¿Preguntas o sugerencias? No dudes en abrir un issue o ponerte en contacto con nosotros.

---

<p align="center">
  Desarrollado con ❤️ por el equipo de PromptLazy
</p>
