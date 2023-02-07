package com.cp.student;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

public class AddStudent {
    private DataSourceConfig dataSourceConfig;

    public AddStudent() {
        this.dataSourceConfig = new DataSourceConfig();
    }
    public boolean areDetailsValid(String firstName, String lastName, String email, String department) {
        if (firstName == null || firstName.trim().length() == 0 || !firstName.matches("[a-zA-Z]+")) {
            return false;
        }
    
        if (lastName == null || lastName.trim().length() == 0 || !lastName.matches("[a-zA-Z]+")) {
            return false;
        }
    
        if (email == null || email.trim().length() == 0 || !email.contains("@") || !email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
            return false;
        }
    
        if (!department.equals("HR") && !department.equals("Accounting") && !department.equals("Sales")) {
            return false;
        }
    
        return true;
    }
    
    public void insertStudent(String firstName, String lastName, String email, String department) {
        if (!areDetailsValid(firstName, lastName, email, department))
            return;
        DataSource dataSource = dataSourceConfig.dataSource();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName("InsertStudent")
                .declareParameters(
                        new SqlParameter("firstName", Types.VARCHAR),
                        new SqlParameter("lastName", Types.VARCHAR),
                        new SqlParameter("email", Types.VARCHAR),
                        new SqlParameter("department", Types.VARCHAR));

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("firstName", firstName);
        parameters.put("lastName", lastName);
        parameters.put("email", email);
        parameters.put("department", department);

        jdbcCall.execute(parameters);
    }
}
