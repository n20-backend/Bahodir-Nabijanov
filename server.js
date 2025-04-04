import express from "express";
import userFaculty from "./routes/userFaculty.js";
import userStudent from "./routes/userStudent.js";
import userCourse from "./routes/userCourse.js";
import userStudentCourse from "./routes/userStudentCourse.js";
import userGrade from "./routes/userGrade.js";
import userUser from "./routes/userUser.js";
 
const app = express();

app.use(express.json());


app.use("/faculty", userFaculty);
app.use("/student", userStudent);
app.use("/course", userCourse);
app.use("/student_course", userStudentCourse);
app.use("/grade", userGrade);
app.use("/user", userUser);

app.listen(5000, () => {
    console.log(`Server is running on 5000`);
});