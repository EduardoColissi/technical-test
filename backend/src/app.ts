import express from "express";
import routes from "./router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(6060, () => {
  console.log(`Server is running on port 6060`);
});
