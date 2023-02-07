CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertStudent`(
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN department ENUM('HR', 'Accounting', 'Sales')
)
BEGIN
  INSERT INTO students (First_name, Last_name, Email, Department) VALUES (firstName, lastName, email, department);
END