const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Cargar variables desde .env

// Configuración desde el archivo .env
const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_KEY = process.env.ZENDESK_API_KEY;

// Construir autenticación básica
const auth = Buffer.from(`${ZENDESK_EMAIL}/token:${ZENDESK_API_KEY}`).toString('base64');

// Headers para las solicitudes
const headers = {
  Authorization: `Basic ${auth}`
};

// Función para recuperar tickets (manejo de paginación)
async function fetchTickets(nextPage = `/api/v2/tickets.json`, tickets = []) {
  console.log(`Solicitando: ${nextPage}`);
  
  try {
    const response = await axios.get(`https://${ZENDESK_SUBDOMAIN}.zendesk.com${nextPage}`, { headers });
    const data = response.data;

    // Agregar tickets a la lista acumulativa
    tickets = tickets.concat(data.tickets);

    // Si hay más páginas, continuar con la siguiente
    if (data.next_page) {
      return fetchTickets(data.next_page, tickets);
    } else {
      return tickets;
    }
  } catch (error) {
    console.error(`Error al recuperar tickets: ${error.message}`);
    process.exit(1);
  }
}

// Guardar tickets en un archivo JSON
function saveTicketsToFile(tickets, filename = 'tickets.json') {
  fs.writeFileSync(filename, JSON.stringify(tickets, null, 2));
  console.log(`Tickets exportados a ${filename} (${tickets.length} tickets).`);
}

// Función principal
async function exportTickets() {
  console.log('Iniciando exportación de tickets...');
  
  // Recuperar todos los tickets
  const tickets = await fetchTickets();

  // Guardar en un archivo
  saveTicketsToFile(tickets);
}

// Ejecutar script
exportTickets();
