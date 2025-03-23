import React, { useState } from "react";
import axios from "axios";

const GenerateText = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const API_ENDPOINT = process.env.REACT_APP_API_TEXT_GENERATE;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}${API_ENDPOINT}`, {
        prompt,
      });

      if (response.data && response.data.generatedText) {
        setGeneratedText(response.data.generatedText);
      } else {
        setGeneratedText("No content was generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedText("Failed to generate content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI-Powered Content Generator</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px" }}
      />
      <br />
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>
      <h2>Generated Content:</h2>
      <p>{generatedText || "No content generated yet."}</p>
    </div>
  );
};

export default GenerateText;
