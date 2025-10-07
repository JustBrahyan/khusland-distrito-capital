// api/order.js
// Serverless function for Vercel/Netlify that relays orders to Discord via webhook.
// Set environment variable: DISCORD_WEBHOOK_URL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok:false, error: 'Method Not Allowed' });
  }
  try {
    const { icName = '', items = [], total = 0 } = req.body || {};
    if (!icName || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok:false, error:'Missing icName or items' });
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      return res.status(500).json({ ok:false, error:'Missing DISCORD_WEBHOOK_URL' });
    }

    const fmt = n => "$" + Number(n).toLocaleString("es-CO");
    const lines = items.map(x => `• ${x.name} x${x.qty} — ${fmt(x.price * x.qty)}`).join('\n');

    // NOTE: Webhooks cannot handle interactive button callbacks.
    // For Accept/Reject with state updates, you will need a lightweight Discord bot.
    // Here we provide instructions in the message footer for staff to react.
    const payload = {
      embeds: [{
        title: "📦 Nuevo pedido — Khusland (Distrito Capital)",
        description: lines,
        color: 0xe5c77b,
        fields: [
          { name: "Nombre IC", value: icName, inline: true },
          { name: "Total", value: fmt(total), inline: true },
          { name: "Estado", value: "⏳ Pendiente (usa reacciones ✅ / ❌ para gestionar)" }
        ],
        footer: { text: "Khusland — La raíz del negocio legal • Staff: reacciona ✅ para aceptar o ❌ para rechazar." },
        timestamp: new Date().toISOString()
      }]
    };

    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const t = await r.text();
      return res.status(500).json({ ok:false, error:`Webhook error: ${t}` });
    }

    return res.status(200).json({ ok:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok:false, error: 'Server error' });
  }
}
