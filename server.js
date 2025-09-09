// Servidor simple para desarrollo local
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// MIME types para diferentes archivos
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/views/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Página no encontrada</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Página no encontrada</h1>
                        <p>La página que buscas no existe.</p>
                        <a href="/views/">Volver al inicio</a>
                    </body>
                    </html>
                `);
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`);
            }
        } else {
            // Archivo encontrado
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📁 Directorio: ${__dirname}`);
    console.log(`🌐 Abre tu navegador en: http://localhost:${PORT}/views/`);
    console.log(`\n📋 Páginas disponibles:`);
    console.log(`   • Inicio: http://localhost:${PORT}/views/index.html`);
    console.log(`   • Emprendimientos: http://localhost:${PORT}/views/emprendimientos.html`);
    console.log(`   • Videos: http://localhost:${PORT}/views/videos.html`);
    console.log(`   • Danza: http://localhost:${PORT}/views/danza.html`);
    console.log(`   • Deportes: http://localhost:${PORT}/views/deportes.html`);
    console.log(`   • Contacto: http://localhost:${PORT}/views/contacto.html`);
    console.log(`\n⏹️  Presiona Ctrl+C para detener el servidor`);
});
