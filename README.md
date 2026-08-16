# Actividad 1 — API IoT y visualización

API REST desarrollada con Node.js y Express para consultar datos de un dispositivo IoT desde un endpoint público y enviarlos a una visualización en Node-RED mediante un gauge de temperatura.

## Estructura

```text
.
├── .gitignore
├── node-red.json
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

- `server.js`: API con los endpoints `GET /data`, `POST /visualize` y `GET /visualize`.
- `node-red.json`: flujo exportado de Node-RED para mostrar la temperatura.
- `package.json`: dependencias y comandos del proyecto.

## Requerimientos

- Node.js 18 o superior
- npm
- Node-RED
- Paquete `node-red-dashboard`
- Navegador web

## Instalación

Instalar las dependencias del proyecto:

```bash
npm install
```

Instalar Node-RED globalmente:

```bash
npm install -g --unsafe-perm node-red
```

Iniciar Node-RED:

```bash
node-red
```

Abrir el editor de Node-RED:

```text
http://localhost:1880
```

En Node-RED, instalar el dashboard desde:

```text
☰ → Manage palette → Install → node-red-dashboard
```

Importar el archivo `node-red.json` mediante:

```text
☰ → Import → select a file to import → node-red.json → Import → Deploy
```

## Ejecución

Iniciar la API:

```bash
npm start
```

La API se ejecuta en:

```text
http://localhost:3000
```

Endpoints disponibles:

```text
GET  http://localhost:3000/data
POST http://localhost:3000/visualize
GET  http://localhost:3000/visualize
GET  http://localhost:3000/health
```

El endpoint IoT público consultado es:

```text
https://callback-iot.up.railway.app/data
```

Abrir el dashboard de Node-RED en:

```text
http://localhost:1880/ui
```
