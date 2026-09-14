ALTER TABLE employee
ADD branch_location VARCHAR(100);

SELECT SUM(salary) AS total_salary
FROM employee;

SELECT MAX(salary) AS max_salary
FROM employee
WHERE profile = 'test';

SELECT AVG(experience) AS average_experience
FROM employee;

SELECT name
FROM employee
WHERE salary = (SELECT MAX(salary) FROM employee);

SELECT COUNT(*) AS total_employees
FROM employee;

SELECT name
FROM employee
WHERE profile = 'test'
AND salary > 25000;

UPDATE employee
SET profile = 'support'
WHERE name = 'radha';

SELECT MAX(salary) AS second_highest
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);

SELECT MIN(salary) AS second_lowest
FROM employee
WHERE salary > (SELECT MIN(salary) FROM employee);

SELECT AVG(salary) AS average_salary
FROM employee
WHERE profile = 'dev';

SELECT name
FROM employee
WHERE salary = (SELECT MAX(salary) FROM employee)
AND age = (
    SELECT MIN(age)
    FROM employee
    WHERE salary = (SELECT MAX(salary) FROM employee)
);

DELETE FROM employee;