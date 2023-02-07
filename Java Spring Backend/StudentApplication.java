package com.cp.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class StudentApplication {

  public static void main(String[] args) {
    SpringApplication.run(StudentApplication.class, args);
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/students")
  public List<Student> getStudents(
  @RequestParam(value = "colNumber", defaultValue = "0") int colNumber,
  @RequestParam(value = "sortOrder", defaultValue = "asc") String sortOrder,
  @RequestParam(value = "firstName", required = false) String firstName,
  @RequestParam(value = "lastName", required = false) String lastName,
  @RequestParam(value = "department", required = false) String department
  ) {  
  SelectStudents selectStudents = new SelectStudents();
 
  Map<String, Object> result =  selectStudents.selectStudents(colNumber, sortOrder, firstName, lastName, department);
    List<Map<String, Object>> rows = (List<Map<String, Object>>) result.get("#result-set-1");
    List<Student> students = new ArrayList<>();
    for (Map<String, Object> row : rows) {
        int id = (int) row.get("ID");
        String first = (String) row.get("First_name");
        String last = (String) row.get("Last_name");
        String email = (String) row.get("Email");
        department = (String) row.get("Department");
        students.add(new Student(id, first, last, email, department));
    }
    return students;
  }


  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/add_student")
  public void addStudent(
  @RequestParam(value = "firstName", required = true) String firstName,
  @RequestParam(value = "lastName", required = true) String lastName,
  @RequestParam(value = "email", required = true) String email,
  @RequestParam(value = "department", required = true) String department
  ) {
	AddStudent addStudent = new AddStudent();
    addStudent.insertStudent(firstName,lastName, email, department);
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/update_student")
  public void updateStudent(
@RequestParam(value = "id", required = true) int id,
  @RequestParam(value = "firstName", required = true) String firstName,
  @RequestParam(value = "lastName", required = true) String lastName,
  @RequestParam(value = "email", required = true) String email,
  @RequestParam(value = "department", required = true) String department
  ) {
	UpdateStudent updateStudent = new UpdateStudent();
    updateStudent.updateStudent(id, firstName,lastName, email, department); 
  }

  class Student {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String department;

    public Student(int id, String firstName, String lastName, String email, String department) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.department = department;
    }

    public int getId() {
      return id;
    }

    public String getFirstName() {
      return firstName;
    }

    public String getLastName() {
      return lastName;
    }

    public String getEmail() {
      return email;
    }

    public String getDepartment() {
      return department;
    }
  }
}
