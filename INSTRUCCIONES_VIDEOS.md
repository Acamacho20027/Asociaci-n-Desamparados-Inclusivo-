# Instrucciones para Insertar Videos en la Sección de Tutoriales

## Descripción
La sección de Videos Tutoriales ha sido creada siguiendo el mismo estilo visual y estructura que el resto del sitio. Cada tutorial está preparado en una tarjeta con espacio para insertar videos embebidos.

## Estructura Implementada

### Tutoriales Incluidos:
1. **Correo Electrónico Gmail** - Cómo crear una cuenta nueva de Gmail
2. **Microsoft Teams** - Cómo crear tu cuenta en Microsoft Teams + Cómo usar Microsoft Teams
3. **Zoom** - Cómo crear tu cuenta en Zoom e instalarlo en Windows + Cómo usar Zoom paso a paso
4. **Facebook** - Cómo crear tu cuenta en Facebook
5. **Instagram** - Cómo crear tu cuenta en Instagram
6. **Correo Electrónico Outlook/Hotmail** - Cómo crear tu cuenta en Outlook/Hotmail
7. **WhatsApp** - Cómo abrir WhatsApp desde la web

## Cómo Insertar Videos

### Para cada tarjeta de tutorial:

1. **Localizar el contenedor del video:**
   ```html
   <div class="video-embed">
       <!-- Reemplazar con iframe de YouTube: <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Título del video" allowfullscreen></iframe> -->
       <div class="video-placeholder">
           <!-- Contenido placeholder actual -->
       </div>
   </div>
   ```

2. **Reemplazar el contenido placeholder con el iframe:**
   ```html
   <div class="video-embed">
       <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
               title="Título del video" 
               allowfullscreen>
       </iframe>
   </div>
   ```

3. **Eliminar el div video-placeholder** una vez insertado el iframe.

### Ejemplo Completo:
```html
<!-- ANTES -->
<div class="video-embed">
    <!-- Reemplazar con iframe de YouTube: <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Cómo crear una cuenta nueva de Gmail" allowfullscreen></iframe> -->
    <div class="video-placeholder">
        <div class="video-thumbnail">
            <div class="play-button">▶️</div>
            <p>Video: Cómo crear una cuenta nueva de Gmail</p>
        </div>
    </div>
</div>

<!-- DESPUÉS -->
<div class="video-embed">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Cómo crear una cuenta nueva de Gmail" 
            allowfullscreen>
    </iframe>
</div>
```

## Características del Diseño

### Estilos Aplicados:
- **Tarjetas responsivas** con grid que se adapta a escritorio y móvil
- **Sombras ligeras** y bordes redondeados consistentes con el resto del sitio
- **Colores uniformes** usando la paleta de colores del sitio
- **Tipografías consistentes** con el resto de las secciones
- **Espacio preparado** para videos embebidos con aspect ratio 16:9

### Responsive Design:
- En escritorio: Grid de 2 columnas
- En móvil: Grid de 1 columna
- Videos se adaptan automáticamente al tamaño de la pantalla

### Accesibilidad:
- Títulos descriptivos en los iframes
- Estructura semántica correcta
- Compatible con lectores de pantalla
- Navegación por teclado

## Notas Importantes

1. **No modificar** la estructura HTML existente, solo reemplazar el contenido placeholder
2. **Mantener** los títulos y descripciones existentes
3. **Usar** el mismo formato de iframe para todos los videos
4. **Verificar** que los videos sean accesibles y tengan subtítulos
5. **Probar** la responsividad en diferentes dispositivos

## Archivos Modificados

- `views/videos.html` - Página principal con la nueva sección de tutoriales
- `styles/style.css` - Estilos CSS para las tarjetas de video y responsividad

La implementación está lista y mantiene la consistencia visual con el resto del sitio web.
