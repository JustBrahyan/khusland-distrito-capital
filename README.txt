Khusland — Distrito Capital
==============================

Este paquete contiene la página web de pedidos con carrito y envío al Discord.

Contenido:
- index.html        → Página web (frontend: catálogo, carrito, formulario Nombre IC)
- api/order.js      → Función serverless (Vercel/Netlify) que reenvía el pedido al Webhook de Discord
- README.txt        → Este archivo con instrucciones

IMPORTANTE SOBRE BOTONES ACEPTAR/RECHAZAR
-----------------------------------------
Los Webhooks de Discord NO pueden procesar clicks de botones. Para tener botones que cambien el estado del pedido
(Aceptar/Rechazar) ES NECESARIO un bot ligero (discord.js) que escuche interacciones y edite el mensaje.
Este paquete envía el pedido con el estado "Pendiente" y recomienda al staff usar reacciones ✅ / ❌.
Más adelante te puedo dar el bot minimal para gestión de estado con botones, si lo deseas.

Cómo desplegar en Vercel
------------------------
1) Crea cuenta: https://vercel.com
2) Crea un nuevo proyecto y sube la carpeta completa "khusland-distrito-capital"
3) En Settings → Environment Variables, agrega:
   - Name: DISCORD_WEBHOOK_URL
   - Value: (tu URL del Webhook de Discord del canal privado donde recibes pedidos)
4) Deploy

Cómo conseguir un Webhook de Discord
------------------------------------
- En tu servidor, abre el canal privado de pedidos (ej: #pedidos-khusland)
- Edit Channel → Integrations → Webhooks → New Webhook → Copy Webhook URL

Probar localmente
-----------------
- Abre index.html en tu navegador (doble clic).
- Si al enviar te da error de CORS, sube a Vercel para que funcione con /api/order.

Editar catálogo
---------------
En index.html encontrarás arrays JS por sección:
- S1 (Bases y Envolturas)
- S2_CLASSIC (Sabores Clásicos)
- S2_PREMIUM (Sabores Premium)
- S3_JOINTS (cigarros armados)
- S4_TOOLS / S4_FLAVORS / S4_ESSENTIAL (Vapes y saborizantes)
- S5_EDIBLES (Comestibles)
- S6_COMBOS (Combos especiales para negocios)

Rol-gating (Sección privada futura)
-----------------------------------
Para bloquear secciones por rol (ej. "Jefe tienda 817"), necesitas autenticación con Discord (OAuth2)
y lectura de roles del usuario. El frontend ya está preparado para añadir visibilidad condicional en el futuro.

Soporte
-------
Si quieres:
- Integrar BOT con botones Aceptar/Rechazar
- Agregar imágenes por producto y catálogo premium
- Poner dominio propio (ej. khusland.co)
te puedo dar los archivos y pasos.
