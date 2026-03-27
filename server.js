require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"));

io.on("connection", (socket) => {
  socket.on("joinDoctorRoom", (doctorId) => {
    socket.join(doctorId);
  });
});

app.set("io", io);

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);