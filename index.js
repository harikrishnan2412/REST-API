const express = require("express");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//connection of db
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

//schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  JobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},{timestamps:true});

const user = mongoose.model("user", userSchema);

//middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Hi from Middleware");
  next();
});
app.use((req, res, next) => {
  res.end("hi from middleware 2");
});

// Get all users (JSON)
app.get("/api/users", (req, res) => {
  res.setHeader("MyName", "Harikrishnan");
  return res.json(users);
});

// Get HTML list of user first names
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
        </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch((req, res) => {})
  .delete((req, res) => {});
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.JobTitle
  ) {
    return res.status(404).json({ msg: "All fields are requires" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

await User.Create({
  firstName: body.first_name,
  lastName:body.last_name,
  email : body.email,
  gender:body.gender,
  Job:body.JobTitle,
});

console.log("result",result)
return res.status(201).json({msg:"success"})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
