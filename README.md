# KaS-Xchange

## Descripción
Xchange es un pequeño conversor de moneda multiplataforma (tanto para web como para Android) creado con fines educativos. 

Además de permitir la conversión de x cantidad de una moneda a otra, muestra un histórico de datos (los últimos 7 o 30 días).

> [!WARNING]
> Los datos de conversión que aparecen pueden no coincidir con la realidad.

## Tecnologías utilizadas
- React Native con Expo
- Expo router -> Componentes diferenciados por plataforma
- Native Base -> Componentes UI y estilos
- Victory -> Construcción de gráficos en web
- Victory-Native -> Construcción de gráficos en web y móvil

Además este proyecto utiliza la api de datos de conversiones de @fawazahmed0, puedes encontrarla aquí: [exchange-api](https://github.com/fawazahmed0/exchange-api).

## Requisitos Previos

Para poder utilizar este proyecto deberás tener correctamente instalados y configurados los siguientes programas:

- Npm o un gestor de paquetes similar
- Node.js (versión X o superior)
- Expo CLI 

Y si quieres probar la versión móvil, deberás disponer de un dispositivo o tener un emulador correctamente configurado. Recuerda que únicamente está disponible para dispositivos Android.

## Instalación y uso

Clona este repositorio
> git clone https://github.com/kasimxo/KaS-Xchange.git

Entra al directorio del proyecto
> cd conversor-monedas

Instala las dependencias
> npm install

Inicia el proyecto con Expo
> expo start

## Estructura del Proyecto
api/ -> Recuperar ratios de conversión e histórico

app/ -> Layout y pantallas de la aplicación (index)

components/ -> Componentes reutilizables, diferenciados por plataforma si es necesario

static/ -> archivo JSON que define las monedas disponibles en la aplicación

## Contribuciones
Las contribuciones son bienvenidas. Si quieres contribuir, sigue los siguientes pasos:
1. Haz un fork del repositorio
2. Crea una rama nueva para tu funcionalidad (git checkout -b nombre-de-rama)
3. Haz un commit de tus cambios (git commit -m "Mensaje")
4. Haz un push a la rama (git push origin feature/nueva-funcionalidad)
5. Abre un Pull Request
