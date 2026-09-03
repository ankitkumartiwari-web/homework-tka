CREATE DATABASE sales;

USE sales;

CREATE TABLE sales (
    pid INT,
    p_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2),
    quantity INT
);

DESC sales;

INSERT INTO sales (pid, p_name, category, price, quantity)
VALUES
(1, 'Laptop', 'Electronics', 55000, 2),
(2, 'Mouse', 'Electronics', 800, 10),
(3, 'Keyboard', 'Electronics', 1500, 5),
(4, 'Chair', 'Furniture', 4500, 3),
(5, 'Table', 'Furniture', 8000, 2),
(6, 'Monitor', 'Electronics', 12000, 4),
(7, 'Desk', 'Furniture', 10000, 1);
