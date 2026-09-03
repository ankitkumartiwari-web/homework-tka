create table student
    (
    student_id INT PRIMARY KEY,
    student_name Varchar(150),
    gender char(1),
    email Varchar(150),
    address Varchar(200)
    );

INSERT INTO student
    VALUES
    (1, 'Raj', 'M', 'raj@xyz.com', 'Pune'),
    (2, 'Ankit', 'M', 'ankit@xyz.com', 'Mumbai'),
    (3, 'Priya', 'F', 'priya@xyz.com', 'Delhi'),
    (4, 'Rahul', 'M', 'rahul@xyz.com', 'Pune'),
    (5, 'Sneha', 'F', 'sneha@xyz.com', 'Nashik'),
    (6, 'Aman', 'M', 'aman@xyz.com', 'Bangalore'),
    (7, 'Neha', 'F', 'neha@xyz.com', 'Mumbai'),
    (8, 'Rohit', 'M', 'rohit@xyz.com', 'Delhi'),
    (9, 'Pooja', 'F', 'pooja@xyz.com', 'Pune'),
    (10, 'Purva', 'F', 'purva@xyz.com', 'Nashik');


 SELECT *
    FROM student;