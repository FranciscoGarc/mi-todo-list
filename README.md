# Mi Lista de Tareas

Esta aplicación es un gestor de listas de tareas construido con **React** y configurado mediante **Vite**. Permite organizar múltiples listas, agregar tareas con fechas de vencimiento y marcarlas como completadas. Los datos se almacenan en el navegador mediante `localStorage` para conservar la información entre sesiones.

## Características principales

- Crear, editar y eliminar **listas de tareas** desde la barra lateral.
- Añadir, actualizar, marcar como completadas o borrar **tareas** dentro de la lista activa.
- Uso de **ventanas modales** para crear nuevas listas o tareas y para editar tareas existentes.
- Interfaz dividida en una barra lateral con las listas y un panel principal con las tareas de la lista seleccionada.
- Persistencia de datos en `localStorage`.

## Instalación y uso

1. Clona este repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el entorno de desarrollo con Vite:
   ```bash
   npm run dev
   ```
4. Para generar la versión de producción ejecuta:
   ```bash
   npm run build
   ```
5. Si quieres previsualizar la build resultante utiliza:
   ```bash
   npm run preview
   ```

### Linting

Puedes ejecutar ESLint con el script:
```bash
npm run lint
```

## Estructura básica del proyecto

```
├── public/             # Archivos estáticos
├── src/
│   ├── components/     # Componentes React (Sidebar, TaskList, modales, etc.)
│   ├── App.jsx         # Componente principal de la aplicación
│   ├── main.jsx        # Punto de entrada que monta la app
│   └── ...
├── index.html          # Plantilla HTML
└── vite.config.js      # Configuración de Vite
```

## Licencia

Este proyecto se distribuye bajo la licencia MIT.
