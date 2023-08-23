document.addEventListener("DOMContentLoaded", async () => {
  try {
    const options = {
      cloudName: data.cloudname,
      apiKey: data.apikey,
      uploadSignatureTimestamp: data.timestamp,
      uploadSignature: data.signature,
      cropping: false,
      eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      folder: "signed_upload_demo_uw",
    };

    const processResults = (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("widget result:", result);

        // var str = JSON.stringify(result, null, 4);
        // document.getElementById("uwdata").innerHTML += str;
      }
    };

    const myWidget = window.cloudinary.createUploadWidget(
      options,
      processResults
    );
    document
      .getElementById("upload_widget")
      .addEventListener("click", () => myWidget.open(), false);
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
