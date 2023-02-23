const express = require("express");
const path = require("path");

const library = require("./components/library");

const app = express();
const port = process.env.PORT || "9000";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let libraryList = await library.loadPlacemarks()
  response.render("index", { title: "Home", library: libraryList });
});

app.get("/lib/:libID", async (request, response) => {
  let libInfo = await library.getLibraryById(request.params.libID)
  console.log(libInfo.querySelector("name").textContent)
  console.log(libInfo.querySelector("address").textContent)
  console.log(libInfo.querySelector("phoneNumber").textContent)
  console.log(libInfo.querySelector("description").textContent)
  response.render("index", { title: "Home", library: libInfo });
});


//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});