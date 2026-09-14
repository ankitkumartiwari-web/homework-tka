use capegemini;

SELECT name
FROM employee
WHERE salary > 20000;

SELECT *
FROM employee
WHERE salary = 51000;

SELECT name, experience
FROM employee
WHERE age > 35;

SELECT *
FROM employee
WHERE profile = 'dev';

SELECT name
FROM employee
WHERE profile = 'test';

SELECT *
FROM employee
WHERE salary >= 25000;

SELECT name, email
FROM employee
WHERE salary != 51000;

UPDATE employee
SET salary = salary + 10000
WHERE experience < 20;

DELETE FROM employee
WHERE experience = 21;

UPDATE employee
SET salary = salary - 21000
WHERE name = 'john';