const cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/D:/main.chunk.js',
                '/static/js/D:/0.chunk.js',
                '/static/js/D:/bundle.js',
                '/static/css/main.chunk.css',
                '/static/media/fontawesome-webfont.20fd1704.woff2',
                '/bootstrap.min.css',
                '/index.html',
                '/',
            ])
        })
    )
})
this.addEventListener("fetch", (event) => {


    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 