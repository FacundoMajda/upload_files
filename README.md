project-root/
├── src/
│   ├── controllers/
│   │   ├── imagelocal.controller.js
│   │   ├── galeria.controller.js
│   │   ├── imagecloud.controller.js
│   ├── models/
│   │   ├── imagelocal.model.js
│   │   ├── imagecloud.model.js
│   ├── routes/
│   │   ├── file.routes.js
│   │   ├── imagelocal.routes.js
│   │   ├── imagecloud.routes.js
│   ├── public/
│   │   ├── stylesheets/
│   │   │   ├── style.css
│   │   ├── js/
│   │   │   ├── uploadlocal.js
│   │   │   ├── uploadcloud.js
│   │   │   ├── config.js
│   ├── views/
│   │   ├── galeria/
│   │   │   ├── index.ejs
│   │   │   ├── crear.ejs
│   │   ├── partials/
│   │   │   ├── header.ejs
│   │   │   ├── nav.ejs
│   │   │   ├── footer.ejs
│   ├── files/
│   │   ├── tmp/
├── app.js
├── db.js
├── .env
└── ...

Subir imagen local:

Ruta: /upload/local
Controlador: imagelocal.controller.js
Subir imagen a Cloudinary:

Ruta: /upload/cloudinary
Controlador: imagecloud.controller.js
Ver galería de imágenes:

Ruta: /gallery
Controlador: gallery.controller.js
