import React, { useState } from "react";
import axios from "axios";

function ImageRecognize() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      process.env.API_URL + process.env.API_IMAGE_UPLOAD,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setResult(response.data.classification);
  };

  return (
    <div>
      <h1>AI Image Processing</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default ImageRecognize;
