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
    let filePath;
    
    // Si la URL es solo "/", redirigir a /views/
    if (req.url === '/') {
        res.writeHead(302, { 'Location': '/views/' });
        res.end();
        return;
    }
    
    // Si la URL es "/views/", mostrar index.html
    if (req.url === '/views/' || req.url === '/views') {
        filePath = path.join(__dirname, '..', 'views', 'index.html');
    } else {
        // Para otras rutas, usar la URL tal como viene
        filePath = path.join(__dirname, '..', req.url);
    }
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado - intentar con .html si no tiene extensión
                if (!path.extname(filePath)) {
                    const htmlPath = filePath + '.html';
                    fs.readFile(htmlPath, (htmlError, htmlContent) => {
                        if (htmlError) {
                            // Mostrar página 404 personalizada
                            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(`
                                <!DOCTYPE html>
                                <html lang="es">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>404 - Página no encontrada</title>
                                    <style>
                                        body { 
                                            font-family: 'Segoe UI', Arial, sans-serif; 
                                            text-align: center; 
                                            padding: 50px; 
                                            background: #f8fafc;
                                            color: #1f2937;
                                        }
                                        .container {
                                            max-width: 600px;
                                            margin: 0 auto;
                                            background: white;
                                            padding: 40px;
                                            border-radius: 12px;
                                            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                                        }
                                        h1 { 
                                            color: #e74c3c; 
                                            font-size: 3rem;
                                            margin-bottom: 20px;
                                        }
                                        p { 
                                            font-size: 1.2rem;
                                            margin-bottom: 30px;
                                            color: #6b7280;
                                        }
                                        a { 
                                            display: inline-block;
                                            background: #3b82f6;
                                            color: white;
                                            padding: 12px 24px;
                                            text-decoration: none;
                                            border-radius: 8px;
                                            font-weight: 600;
                                            transition: all 0.3s ease;
                                        }
                                        a:hover {
                                            background: #2563eb;
                                            transform: translateY(-2px);
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1>404</h1>
                                        <p>La página que buscas no existe.</p>
                                        <a href="/views/">Volver al inicio</a>
                                    </div>
                                </body>
                                </html>
                            `);
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(htmlContent, 'utf-8');
                        }
                    });
                } else {
                    // Mostrar página 404
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`
                        <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>404 - Página no encontrada</title>
                            <style>
                                body { 
                                    font-family: 'Segoe UI', Arial, sans-serif; 
                                    text-align: center; 
                                    padding: 50px; 
                                    background: #f8fafc;
                                    color: #1f2937;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background: white;
                                    padding: 40px;
                                    border-radius: 12px;
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                                }
                                h1 { 
                                    color: #e74c3c; 
                                    font-size: 3rem;
                                    margin-bottom: 20px;
                                }
                                p { 
                                    font-size: 1.2rem;
                                    margin-bottom: 30px;
                                    color: #6b7280;
                                }
                                a { 
                                    display: inline-block;
                                    background: #3b82f6;
                                    color: white;
                                    padding: 12px 24px;
                                    text-decoration: none;
                                    border-radius: 8px;
                                    font-weight: 600;
                                    transition: all 0.3s ease;
                                }
                                a:hover {
                                    background: #2563eb;
                                    transform: translateY(-2px);
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>404</h1>
                                <p>La página que buscas no existe.</p>
                                <a href="/views/">Volver al inicio</a>
                            </div>
                        </body>
                        </html>
                    `);
                }
            } else {
                // Error del servidor
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <title>Error del servidor</title>
                    </head>
                    <body>
                        <h1>Error del servidor: ${error.code}</h1>
                        <a href="/views/">Volver al inicio</a>
                    </body>
                    </html>
                `);
            }
        } else {
            // Archivo encontrado
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
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
