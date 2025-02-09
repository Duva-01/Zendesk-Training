// Inicializamos el cliente:
console.log("Inicializando ZAFClient...");
var client = ZAFClient.init();

client.invoke('resize', { width: '100%', height: '600px' });

/**
 * Función principal: Realizar la búsqueda de tickets por texto.
 */
function searchTicketsByQuery(query) {
  console.log(`Buscando tickets que coincidan con: "${query}"...`);

  client.request({
    url: '/api/v2/tickets.json',
    type: 'GET'
  }).then(function (data) {
    console.log("Resultados de búsqueda de tickets:", data);

    if (data.tickets && data.tickets.length > 0) {
      const filteredTickets = data.tickets.filter(ticket => 
        ticket.subject && ticket.subject.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredTickets.length > 0) {
        // Cambiar tamaño de la app para acomodar resultados
        client.invoke('resize', { width: '100%', height: '800px' });
        renderTicketResults(filteredTickets);
      } else {
        client.invoke('notify', 'No se encontraron tickets que coincidan con el término.', 'warning');
        document.getElementById('search-results').innerHTML = "<p class='text-center text-muted'>No se encontraron tickets que coincidan con el término.</p>";
      }
    } else {
      client.invoke('notify', 'No se encontraron tickets.', 'warning');
      document.getElementById('search-results').innerHTML = "<p class='text-center text-muted'>No se encontraron tickets.</p>";
    }
  }).catch(function (error) {
    client.invoke('notify', 'Error al realizar la búsqueda.', 'error');
    console.error("Error al buscar tickets:", error);
    document.getElementById('search-results').innerHTML =
      "<p class='text-center text-danger'>Ocurrió un error al buscar tickets.</p>";
  });
}


/**
 * Función para renderizar los resultados de tickets en el DOM.
 */
function renderTicketResults(tickets) {
  console.log("Renderizando resultados de tickets...");
  let html = '';
  tickets.forEach(ticket => {
    html += `
      <div class="result-card">
        <h4>${ticket.subject || 'Sin asunto'}</h2>
        <p><strong>ID:</strong> ${ticket.id}</p>
        <p><strong>Estado:</strong> ${ticket.status}</p>
        <p><strong>Solicitante:</strong> ${ticket.requester_id || 'Desconocido'}</p>
      </div>
    `;
  });
  document.getElementById('search-results').innerHTML = html;
}

/**
 * Configurar el evento de búsqueda al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM completamente cargado y procesado.");

  const searchButton = document.getElementById('search-button');
  if (searchButton) {
    searchButton.addEventListener('click', function () {
      const query = document.getElementById('search-query').value;
      if (query.trim() !== "") {
        searchTicketsByQuery(query);
      } else {
        document.getElementById('search-results').innerHTML = "<p class='text-center text-muted'>Introduce un término de búsqueda.</p>";
      }
    });
  } else {
    console.error("El botón de búsqueda no se encontró en el DOM.");
  }
});
