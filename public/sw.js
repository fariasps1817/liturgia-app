const CACHE_NAME = 'liturgia-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Instalação do Service Worker - força atualização imediata
self.addEventListener('install', (event) => {
    console.log('SW: Instalando nova versão...');
    self.skipWaiting(); // Força ativação imediata
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('SW: Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar requisições - NETWORK FIRST para HTML/JS
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Ignorar requisições WebSocket e não-HTTP
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Para arquivos HTML e JS, sempre buscar da rede primeiro
    if (event.request.destination === 'document' ||
        event.request.destination === 'script' ||
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.js')) {

        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Atualizar cache com nova versão
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback para cache se offline
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Para outros recursos, usar cache-first
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    })
                    .catch(() => {
                        // Retorna undefined se não conseguir buscar
                        return undefined;
                    });
            })
    );
});

// Limpar caches antigos e assumir controle imediato
self.addEventListener('activate', (event) => {
    console.log('SW: Ativando nova versão...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('SW: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Tomar controle de todas as abas imediatamente
            return self.clients.claim();
        })
    );
});
