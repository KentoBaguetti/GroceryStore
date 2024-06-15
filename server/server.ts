import express from "express";

const app = express();
const PORT: number = 3001;

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});

export default app;
