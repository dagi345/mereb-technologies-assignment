import express from "express";
import multer from "multer";
import path from "path";
import { aggregateSales } from "../services/aggregator";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("csvfile"), async (req, res) => {

  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { outputPath, departmentCount, processingTimeMs } = await aggregateSales(
      req.file.path
    );

    // return download link relative to server root
    const fileName = path.basename(outputPath);
    res.json({
      downloadUrl: `/download/${fileName}`,
      departmentsProcessed: departmentCount,
      processingTimeMs,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

export default router;