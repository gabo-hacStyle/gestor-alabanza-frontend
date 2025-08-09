# Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto frontend con las siguientes variables:

```env
# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

# Google OAuth Client ID (reemplazar con tu Client ID real)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu-google-client-id-aqui
```

## Obtener Google OAuth Client ID

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ API
4. Ve a "APIs & Services" > "Credentials"
5. Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
6. Configura las URIs de redirección autorizadas:
   - `http://localhost:3000` (desarrollo)
   - `https://tu-dominio.com` (producción)
7. Copia el Client ID generado y reemplázalo en `.env.local`
