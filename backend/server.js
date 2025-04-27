import app from "./app.js";

const PORT = process.env.PORT || 3001;  // use Render's PORT, fallback to 3001 locally

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
