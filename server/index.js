const express = require("express");
const app = express();
const port = 3000;
const Router = require("./routes/routes");
const cookieParser  =  require('cookie-parser')
const cors = require('cors')

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials:true
}));
app.use(Router);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
