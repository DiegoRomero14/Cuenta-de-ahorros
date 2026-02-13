// Importa la función createApp desde app.js
// createApp construye y configura la aplicación Express
const { createApp } = require("./app");

// Crea la aplicación Express ya configurada
const app = createApp();
// Define el puerto donde va a escuchar el servidor
const PORT = process.env.PORT || 3000;

// Inicia el servidor para que comience a escuchar peticiones HTTP en el puerto definido
app.listen(PORT, () => {
  // Mensaje informativo cuando el servidor ya está corriendo
  console.log(`API running on http://localhost:${PORT}`);
});