import express from "express";
import { facultyRouter, usersRouter, coursesRouter, studentsRouter, gradeRouter} from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Sarguzasht sari olg'a");
});

app.use('/faculty', facultyRouter);
app.use('/user', usersRouter);
app.use('/course', coursesRouter);
app.use('/student', studentsRouter);
app.use('/grade', gradeRouter);

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});


