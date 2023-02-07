CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateStudent`(
  IN studentId INT,
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN department ENUM('HR', 'Accounting', 'Sales')
)
BEGIN
  UPDATE students SET First_name=firstName, Last_name=lastName, Email=email, Department=department WHERE ID=studentId;
END