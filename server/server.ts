import express from "express";
import routes from "./routes";

const app = express();
const PORT: number = 3001;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});

export default app;
