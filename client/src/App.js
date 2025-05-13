import React, { useState } from "react";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  const handleImageSelection = (event) => {
    const uploadedFile = event.target.files[0];
    setSelectedImage(uploadedFile);
    setPreviewImageUrl(URL.createObjectURL(uploadedFile));
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    setPredictionResult(responseData);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🌿 Plant Doctor AI</h1>

      <input type="file" accept="image/*" onChange={handleImageSelection} />
      {previewImageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={previewImageUrl}
            alt="Preview of uploaded leaf"
            width="200"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </div>
      )}

      <button
        onClick={handleImageUpload}
        disabled={!selectedImage}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Diagnose
      </button>

      {predictionResult && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Prediction: {predictionResult.label}</h3>
          <pre>{JSON.stringify(predictionResult.confidence, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
