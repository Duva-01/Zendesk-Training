# 🚀 Integraciones y Aplicaciones en Zendesk

## 📌 Descripción del Proyecto

Este proyecto se centra en la exploración y desarrollo de integraciones con Zendesk, incluyendo el uso de su API, la creación de aplicaciones dentro de la plataforma y la implementación de automatizaciones con Slack. Se han realizado diversos workshops y experimentos para comprender mejor las capacidades del ecosistema de Zendesk, con especial énfasis en la gestión de tickets, automatización y extensibilidad.

## 🏗️ Arquitectura del Proyecto

El sistema está diseñado con múltiples componentes que interactúan con Zendesk API y otros servicios externos. A continuación, se describen las principales funcionalidades implementadas:

- **Aplicación en Zendesk con ZAFClient**: Se ha desarrollado una aplicación embebida dentro de Zendesk utilizando ZAFClient, lo que permite interactuar con la interfaz de usuario y ejecutar acciones como la búsqueda de tickets. La aplicación permite a los agentes de soporte buscar tickets desde la propia interfaz, mostrando información relevante sobre cada uno de ellos.

- **Gestión de Tickets con la API de Zendesk**: Se han desarrollado funciones para realizar operaciones avanzadas en los tickets mediante Node.js y la API REST de Zendesk. Entre las principales acciones se encuentran la actualización del estado de los tickets (soft delete) y la eliminación definitiva de los mismos.

- **Automatización con Slack**: Se ha desarrollado una integración con Slack para enviar notificaciones automáticas cuando ocurren eventos en Zendesk, como la creación o cierre de tickets. Esto mejora la comunicación interna y permite a los equipos recibir alertas en tiempo real sobre tickets críticos.

## 🚀 Despliegue y Ejecución

### 1️⃣ Configuración de Variables de Entorno  
Antes de ejecutar las funcionalidades del proyecto, es necesario configurar las credenciales de Zendesk en un archivo de variables de entorno para garantizar la seguridad de la información.

### 2️⃣ Instalación de Dependencias  
El proyecto requiere la instalación de dependencias en Node.js para ejecutar correctamente las integraciones con la API de Zendesk.

### 3️⃣ Ejecución de Scripts  
Para realizar la gestión de tickets, se han desarrollado scripts que permiten actualizar el estado de los mismos o eliminarlos completamente. Estos scripts pueden ejecutarse de manera manual o integrarse en un sistema automatizado.

## 🎯 Beneficios del Proyecto

✅ Optimización del flujo de trabajo: Permite administrar tickets sin necesidad de intervención manual.  
✅ Automatización: Uso de scripts y notificaciones para mejorar la eficiencia.  
✅ Integración con Slack: Comunicación en tiempo real sobre eventos en Zendesk.  
✅ Seguridad: Uso de variables de entorno para proteger credenciales.  
✅ Facilidad de uso: La aplicación en Zendesk proporciona una interfaz intuitiva para la gestión de tickets.  

## 📌 Conclusión  

Este proyecto explora la integración avanzada con Zendesk, proporcionando herramientas para la búsqueda, gestión y eliminación de tickets, así como su integración con Slack. A través del uso de ZAFClient, Node.js y APIs REST, se ha desarrollado una solución escalable y eficiente para optimizar el manejo de tickets en entornos empresariales.

📢 Para contribuir o reportar problemas, crea un Issue o Pull Request en este repositorio. 🚀
