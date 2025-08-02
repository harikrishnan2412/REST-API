const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Get all users (JSON)
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// Get HTML list of user first names
app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join(" ")}
        </ul>
    `;
    res.send(html);
});

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).post((req,res)=>{

}).patch((req,res)=>{

}).delete((req,res)=>{

})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
