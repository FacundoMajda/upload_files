const imagesLocal = document.querySelector("#galeriaLocal");
const imagesCloud = document.querySelector("#galeriaCloud");
const alertBanner = document.querySelector("#alertBanner");
const bannerMessage = document.querySelector("#bannerMessage");
const formUploadLocal = document.querySelector("#formUploadLocal");

// import { v2 as cloudinary } from "cloudinary";
const cloudName = "djtwvtbof";

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("DOM Cargado");

//   try {
//     const images = await fetchImages();
//     showImages(images);
//   } catch (error) {
//     console.log(error);
//   }
// });

// const showImages = (images) => {
//   if (images.length === 0) {
//     imagesLocal.innerHTML = `
//           <p>
//               <span class="text-center">No hay imagenes aún.</span>
//           </p>
//       `;
//     return;
//   }

//   images.forEach((image) => {
//     console.log(image);
//     imagesLocal.innerHTML += `
//             <figure id="${image.id}" class="figure col-3">
//             <input type="button" onclick="deleteImage(${image.id})" value="x" class="btn btn-danger btn-sm position-absolute">X</input>
//             <img src="http://localhost:4000/local/${image.id}/show" class="figure-img img-fluid rounded" alt="...">
//               <figcaption class="figure-caption text-end">Imagen Local</figcaption>
//             </figure>
//               `;
//     imagesCloud.innerHTML += `
//               <figure id="${image.id}-rm" class="figure col-3">
//                 <input type="button" onclick="deleteImage(${image.id})" value="x" class="btn btn-danger btn-sm position-absolute">X</input>
//                 <img src="${image.url}" class="figure-img img-fluid rounded" alt="...">
//                 <figcaption class="figure-caption text-end">Imagen Alojada en Cloudinary</figcaption>
//               </figure>
//                 `;
//   });
// };

// const fetchImages = async () => {
//   const response = await fetch("http://localhost:4000");

//   if (response.status === 404) {
//     return [];
//   }

//   const data = await response.json();
//   console.log(data);
//   return data;
// };

// const deleteImage = async (id) => {
//   const response = await fetch(`http://localhost:4000/${id}/destroy`, {
//     method: "DELETE",
//   });

//   const data = await response.json();
//   console.log(data);
//   if (response.status === 200) {
//     bannerMessage.innerHTML = data.success;
//     alertBanner.classList.add("show");
//     const imglocal = document.getElementById(`${id}`);
//     const lmgcloud = document.getElementById(`${id}-rm`);
//     imagesLocal.removeChild(imglocal);
//     imagesCloud.removeChild(lmgcloud);
//   } else {
//     bannerMessage.innerHTML = data.message;
//     alertBanner.classList.add("show");
//   }
// };

formUploadLocal.addEventListener("submit", async (e) => {
  e.preventDefault();

  const image = document.querySelector("#imageLocal");

  if (image.files.length == 0) {
    console.log("noimage");
    bannerMessage.innerText = "No tenes imagenes para subir.";
    alertBanner.classList.remove("fade");
    return;
  } else {
    bannerMessage.innerText = "";
    alertBanner.classList.add("fade");
  }
  const fd = new FormData();
  fd.append("image", image.files);
  const response = await fetch("/local/crear", {
    method: "POST",
    body: fd,
  });

  const data = await response.json();
  console.log(data);
});
