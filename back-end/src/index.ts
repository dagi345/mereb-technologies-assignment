import express from "express";
import cors from "cors";
import path from "path";
import uploadRoute from "./routes/upload";  

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);


app.use("/download", express.static(path.join(__dirname, "../results")));

app.get("/", (_req, res) => res.send("CSV Aggregator OK"));

app.listen(PORT, () => console.log(`Server listening on :${PORT}`));