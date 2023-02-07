CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFilteredSortedStudents`(
  IN orderBy VARCHAR(30),
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN department VARCHAR(255)
)
BEGIN
 SET @query = CONCAT("SELECT * FROM students WHERE First_name LIKE ? AND Last_name LIKE ? AND Department LIKE ? ORDER BY ", orderBy);
PREPARE stmt FROM @query;
SET @firstName = CONCAT(firstName, '%');
SET @lastName = CONCAT(lastName, '%');
SET @department = CONCAT(department, '%');
EXECUTE stmt USING @firstName, @lastName, @department;
DEALLOCATE PREPARE stmt;
 END