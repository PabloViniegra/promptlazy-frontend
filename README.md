# Frontend de PromptLazy

<p align="center">
  <img src="public/logo.svg" alt="PromptLazy Logo" width="200"/>
</p>

## Acerca del Frontend

Interfaz de usuario moderna para **PromptLazy**, diseñada para ofrecer una experiencia de usuario fluida y atractiva al optimizar prompts de IA.

### Características Principales

- Interfaz de chat intuitiva
- Diseño moderno con modo claro/oscuro
- Totalmente responsivo
- Optimizado para rendimiento
- Fácil de mantener y extender

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

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Git

## Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/promptlazy.git
cd promptlazy/promptlazy-frontend
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
```

## Iniciar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Comandos Disponibles

- `dev`: Inicia el servidor de desarrollo
- `build`: Compila para producción
- `preview`: Previsualiza la compilación de producción
- `test`: Ejecuta las pruebas
- `lint`: Ejecuta el linter
- `format`: Formatea el código

## Tecnologías Utilizadas

- Vue 3 con Composition API
- TypeScript
- Tailwind CSS
- Pinia (gestión de estado)
- Vue Router
- Vite

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

<p align="center">
  Desarrollado con ❤️ por el equipo de PromptLazy
</p>
