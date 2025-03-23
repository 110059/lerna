const express = require("express");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded. Please select an image." });
        }

        console.log("File received:", req.file.originalname);

        // Decode and preprocess image
        const imageBuffer = req.file.buffer;
        //let tensor = tf.node.decodeImage(imageBuffer, 3);

        const tensor = tf.node.decodeImage(imageBuffer, 3)
        .resizeBilinear([224, 224])
        .expandDims()
        .toFloat()
        .div(tf.scalar(255));
    
        //tensor = tensor.resizeBilinear([224, 224]).expandDims(0).toFloat().div(tf.scalar(255));

        console.log("Tensor shape:", tensor.shape);

        // Load the MobileNet model from a valid URL
        console.log("Loading model...");
        const model = await tf.loadGraphModel(
            "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/5/default/1/model.json",
            { fromTFHub: true } // Important for TF Hub models
        );
        console.log("Model loaded successfully.");

        // Make prediction
        const predictions = model.predict(tensor);
        const results = await predictions.data();

        // Convert results to a readable format
        const topResults = Array.from(results)
            .map((prob, index) => ({ classId: index, probability: prob }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5); // Get top 5 predictions

        res.json({ classification: topResults });

    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
