
CREATE database talaba


-- Fakultet Modeli
CREATE TABLE faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foydalanuvchi Modeli
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,  
    role user_role NOT NULL,
    status user_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kurs Modeli
CREATE TYPE course_status AS ENUM ('active', 'inactive');

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL,
    facultyId UUID REFERENCES faculties(id) ON DELETE CASCADE,
    status course_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Talaba Modeli
CREATE TYPE student_status AS ENUM ('active', 'graduated', 'suspended', 'expelled');

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthdate DATE NOT NULL,
    enrollmentDate DATE NOT NULL,
    status student_status NOT NULL,
    address TEXT,
    phoneNumber VARCHAR(20),
    courses UUID[] DEFAULT '{}'::UUID[], 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Baholar Modeli
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studentId UUID REFERENCES students(id) ON DELETE CASCADE,
    courseId UUID REFERENCES courses(id) ON DELETE CASCADE,
    grade CHAR(1) CHECK (grade IN ('A', 'B', 'C', 'D', 'F')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- Fakultetlar va kurslarni bog'lash uchun fakultetlar jadvalidagi id'ni kurslar jadvalida foreign key sifatida ishlatdik.


INSERT INTO faculties (name, description) VALUES
('Informatika', 'Kompyuter fanlari va texnologiyalari fakulteti'),
('Matematika', 'Matematika va amaliy fanlar fakulteti'),
('Fizika', 'Fizika va muhandislik fakulteti'),
('Iqtisod', 'Iqtisodiyot va boshqaruv fakulteti'),
('Tillar', 'Chet tillar va tarjima fakulteti');

INSERT INTO users (email, username, password, role, status) VALUES
('ali.karimov@example.com', 'alikarimov', 'hashed_pass_1', 'student', 'active'),
('dilnoza.sodiqova@example.com', 'dilnoza01', 'hashed_pass_2', 'student', 'inactive'),
('admin@university.uz', 'admin', 'hashed_admin_pass', 'admin', 'active'),
('teacher.math@university.uz', 'teachermath', 'hashed_teacher_pass', 'teacher', 'active'),
('bekzod.nazarov@example.com', 'beknazarov', 'hashed_pass_3', 'student', 'active');



INSERT INTO courses (title, description, credits, facultyId, status) VALUES
('Dasturlash asoslari', 'Python, C++ kabi tillarda boshlangich dasturlash', 6, (SELECT id FROM faculties WHERE name = 'Informatika'), 'active'),
('Malumotlar tuzilmasi', 'Stack, Queue, Tree va Graphlar', 5, (SELECT id FROM faculties WHERE name = 'Informatika'), 'active'),
('Matematik analiz', 'Limitlar, hosilalar, integral', 5, (SELECT id FROM faculties WHERE name = 'Matematika'), 'active'),
('Iqtisodiy nazariya', 'Asosiy iqtisodiy tushunchalar va nazariyalar', 4, (SELECT id FROM faculties WHERE name = 'Iqtisod'), 'active'),
('Ingliz tili', 'B2 darajadagi ingliz tili kursi', 3, (SELECT id FROM faculties WHERE name = 'Tillar'), 'inactive');


INSERT INTO students (
    firstName, lastName, email, birthdate, enrollmentDate, status, address, phoneNumber, courses
) VALUES
('Ali', 'Karimov', 'ali.karimov@example.com', '2002-04-15', '2021-09-01', 'active', 'Toshkent', '+998901112233', ARRAY[
    (SELECT id FROM courses WHERE title = 'Dasturlash asoslari'),
    (SELECT id FROM courses WHERE title = 'Malumotlar tuzilmasi')]
),
('Dilnoza', 'Sodiqova', 'dilnoza.sodiqova@example.com', '2001-12-05', '2020-09-01', 'graduated', 'Fargona', '+998911223344', ARRAY[
    (SELECT id FROM courses WHERE title = 'Ingliz tili')
]),
('Jamshid', 'Toirov', 'jamshid.toirov@example.com', '2003-03-18', '2022-09-01', 'active', 'Andijon', '+998933334455', ARRAY[
    (SELECT id FROM courses WHERE title = 'Dasturlash asoslari'),
    (SELECT id FROM courses WHERE title = 'Matematik analiz')
]),
('Malika', 'Umarova', 'malika.umarova@example.com', '2000-07-10', '2019-09-01', 'suspended', 'Namangan', '+998944445566', ARRAY[
    (SELECT id FROM courses WHERE title = 'Iqtisodiy nazariya')
]),
('Bekzod', 'Nazarov', 'bekzod.nazarov@example.com', '2002-11-20', '2021-09-01', 'active', 'Samarqand', '+998955556677', ARRAY[
    (SELECT id FROM courses WHERE title = 'Matematik analiz'),
    (SELECT id FROM courses WHERE title = 'Iqtisodiy nazariya')
]);

INSERT INTO grades (studentId, courseId, grade) VALUES
((SELECT id FROM students WHERE email = 'ali.karimov@example.com'), (SELECT id FROM courses WHERE title = 'Dasturlash asoslari'), 'A'),
((SELECT id FROM students WHERE email = 'dilnoza.sodiqova@example.com'), (SELECT id FROM courses WHERE title = 'Ingliz tili'), 'B'),
((SELECT id FROM students WHERE email = 'jamshid.toirov@example.com'), (SELECT id FROM courses WHERE title = 'Matematik analiz'), 'C'),
((SELECT id FROM students WHERE email = 'malika.umarova@example.com'), (SELECT id FROM courses WHERE title = 'Iqtisodiy nazariya'), 'D'),
((SELECT id FROM students WHERE email = 'bekzod.nazarov@example.com'), (SELECT id FROM courses WHERE title = 'Matematik analiz'), 'B');


