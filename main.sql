-- DATABASE YARATISH --

CREATE DATABASE Talaba;

\c Talaba;

-- enum type --

CREATE TYPE student_status AS ENUM ('active', 'graduated', 'suspended', 'expelled');
CREATE TYPE course_status AS ENUM ('active', 'inactive');
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');

-- faculty table --

CREATE TABLE faculty (
    faculty_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- student table --

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    enrollment_date DATE NOT NULL,
    status student_status NOT NULL ,
    address VARCHAR(100),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- course table --

CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    credits INT NOT NULL,
    faculty_id INT NOT NULL,
    status course_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

-- student_course table --

CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- grade table --

CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade VARCHAR(10),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- user table --

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);




-- faculty insert into --

INSERT INTO faculty (name, description) 
    VALUES
        ('Computer Science', 'Department of Computer Science'),
        ('Mathematics', 'Department of Mathematics'),
        ('Physics', 'Department of Physics'),
        ('Chemistry', 'Department of Chemistry'),
        ('Biology', 'Department of Biology');


SELECT * FROM faculty;


-- student insert into --

INSERT INTO student (first_name, last_name, email, birthdate, enrollment_date, status, address, phone_number)
VALUES
    ('John', 'Doe', 'john.doe@example.com', '2000-05-15', '2022-09-01', 'active', '123 Main St, Springfield', '123-456-7890'),
    ('Jane', 'Smith', 'jane.smith@example.com', '1999-08-22', '2021-09-01', 'graduated', '456 Oak St, Springfield', '987-654-3210'),
    ('Michael', 'Johnson', 'michael.johnson@example.com', '2001-11-30', '2022-02-15', 'suspended', '789 Pine St, Springfield', '555-123-4567'),
    ('Emily', 'Davis', 'emily.davis@example.com', '2002-02-10', '2023-01-10', 'expelled', '101 Maple St, Springfield', '555-987-6543'),
    ('David', 'Williams', 'david.williams@example.com', '1998-07-22', '2020-08-25', 'active', '202 Birch St, Springfield', '444-555-6677');


SELECT * FROM student;


-- course insert into --

INSERT INTO course (title, description, credits, faculty_id, status) 
    VALUES
        ('Introduction to Programming', 'Learn the basics of programming using Python.', 3, 1, 'active'),
        ('Calculus I', 'An introduction to differential and integral calculus.', 4, 2, 'active'),
        ('Physics I', 'Fundamentals of classical mechanics.', 4, 3, 'inactive'),
        ('Organic Chemistry', 'Study of the structure, properties, and reactions of organic compounds.', 4, 4, 'active'),
        ('Biology I', 'Introduction to cellular and molecular biology.', 3, 5, 'inactive');


SELECT * FROM course;

-- student_courses insert into --

INSERT INTO student_courses (student_id, course_id) 
    VALUES
        (1, 1),
        (1, 2),
        (2, 3),
        (3, 1),
        (4, 2),
        (5, 4);


SELECT * FROM student_courses;


-- grades insert into --

INSERT INTO grades (student_id, course_id, grade) 
    VALUES
        (1, 1, 'A'),
        (1, 2, 'B+'),
        (2, 3, 'C-'),
        (3, 1, 'A-'),
        (4, 2, 'B'),
        (5, 4, 'C+');


SELECT * FROM grades;


-- user insert into --

INSERT INTO "user" (email, user_name, password, role, status)
VALUES
    ('john.doe@example.com', 'johndoe', 'password123', 'student', 'active'),
    ('jane.smith@example.com', 'janesmith', 'securepass', 'student', 'inactive'),
    ('michael.johnson@example.com', 'mikej', 'mikepassword', 'teacher', 'active'),
    ('emily.davis@example.com', 'emilyd', 'emilypassword', 'teacher', 'active'),
    ('david.williams@example.com', 'davidw', 'davidsuperpass', 'admin', 'inactive');


SELECT * FROM "user";