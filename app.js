const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { UserModel, Course, UserGetCourse, Category } = require("./models/");

const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://nyanjasmin:puFFles0505.@cluster0.9wubz.mongodb.net/test";


// buat koneksi
mongoose
  .connect(uri)
  .then(() => console.log("berhasil konek ke mongoose"))
  .catch((err) => console.log("gagal konek ke mongo"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("ini dari expres yg konek yg mongodb atlas dengan mongoose");
});

// ambil semua data user
app.get("/user", async (req, res) => {
 
  const users = await UserModel.find({}, "-__v");
  console.log(users);

  try {
    res.json({
      message: "berhasil ambil data user",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// ambil data user by ID
app.get("/user/:id", async (req, res) => {
  const users = await UserModel.findById(req.params.id);
  try {
    res.json({
      message: "berhasil ambil data user",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// post data user
app.post("/user", async (req, res) => {
  const data = req.body;

  try {
    await UserModel.create(data);
    res.json({
      message: "berhasil input data",
      data: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/course", async (req, res) => {
  const data = req.body;

  try {
    await Course.create(data);
    res.json({
      message: "berhasil input data",
      data: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/enroll-course", async (req, res) => {
  const data = req.body;

  try {
    await UserGetCourse.create(data);
    res.json({
      message: "berhasil input data",
      data: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/enroll-course", async (req, res) => {
 
  const userGetCourse = await UserGetCourse.find({}, "-__v")
  .populate("user course", "-__v")

  try {
    res.json({
      message: "berhasil ambil data user get course",
      data: userGetCourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});