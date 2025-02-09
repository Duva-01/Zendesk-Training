const axios = require('axios');
require('dotenv').config(); // Cargar variables desde .env

// Configuración desde el archivo .env
const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN;
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL;
const ZENDESK_API_KEY = process.env.ZENDESK_API_KEY;

// Construir autenticación básica
const auth = Buffer.from(`${ZENDESK_EMAIL}/token:${ZENDESK_API_KEY}`).toString('base64');

// Headers para las solicitudes
const headers = {
  Authorization: `Basic ${auth}`,
  'Content-Type': 'application/json'
};

// Función para realizar soft delete en un ticket específico
async function softDeleteTicket(ticketId) {
  const url = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/${ticketId}.json`;

  try {
    // Cambiar el estado del ticket a 'closed'
    const response = await axios.put(
      url,
      { ticket: { status: 'closed' } },
      { headers }
    );

    console.log(`Ticket ${ticketId} actualizado a 'closed':`, response.data.ticket);
  } catch (error) {
    console.error(`Error al actualizar el ticket ${ticketId}:`, error.response ? error.response.data : error.message);
  }
}

// Función principal para realizar soft delete en varios tickets
async function softDeleteTickets(ticketIds) {
  for (const ticketId of ticketIds) {
    console.log(`Procesando ticket ${ticketId}...`);
    await softDeleteTicket(ticketId);
  }
  console.log('Soft delete completado para todos los tickets.');
}


// Función para realizar una eliminación definitiva de un ticket específico
async function deleteTicket(ticketId) {
    const url = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/${ticketId}.json`;
  
    try {
      const response = await axios.delete(url, { headers });
      console.log(`Ticket ${ticketId} eliminado definitivamente.`);
    } catch (error) {
      console.error(`Error al eliminar el ticket ${ticketId}:`, error.response ? error.response.data : error.message);
    }
  }
  
  // Función principal para realizar la eliminación definitiva en varios tickets
  async function deleteTickets(ticketIds) {
    for (const ticketId of ticketIds) {
      console.log(`Procesando eliminación del ticket ${ticketId}...`);
      await deleteTicket(ticketId);
    }
    console.log('Eliminación completada para todos los tickets.');
  }

// IDs de los tickets que deseas actualizar
const ticketsToDelete = [1, 2]; // Cambia estos IDs por los tickets que quieres eliminar

// Ejecutar el script
//softDeleteTickets(ticketsToDelete);

deleteTickets(ticketsToDelete);