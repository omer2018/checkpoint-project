package com.cp.student;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.Map;

public class SelectStudents {
    private DataSourceConfig dataSourceConfig;

    public SelectStudents() {
        this.dataSourceConfig = new DataSourceConfig();
    }

    public String getOrderBy(int columnNumber, String sortOrder) {
        String orderBy = "";
        if (columnNumber == 0) {
            orderBy = "ID";
        } else if (columnNumber == 1) {
            orderBy = "First_name";
        } else if (columnNumber == 2) {
            orderBy = "Last_name";
        } else if (columnNumber == 3) {
            orderBy = "Email";
        } else if (columnNumber == 4) {
            orderBy = "Department";
        }
        else{
            orderBy = "ID";
        }

        if (sortOrder.equals("dsc")) {
            orderBy = orderBy + " DESC";
        }
        else {
            orderBy = orderBy + " ASC";
        } 
        return orderBy;
    }

    public Map<String, Object> selectStudents(int columnNumber, String sortOrder, String firstName, String lastName, String department) {
        
        
        DataSource dataSource = dataSourceConfig.dataSource();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName("GetFilteredSortedStudents")
                .declareParameters(
                        new SqlParameter("orderBy", Types.VARCHAR),
                        new SqlParameter("firstName", Types.VARCHAR),
                        new SqlParameter("lastName", Types.VARCHAR),
                        new SqlParameter("department", Types.VARCHAR));

        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("orderBy", getOrderBy(columnNumber, sortOrder))
                .addValue("firstName", firstName)
                .addValue("lastName", lastName)
                .addValue("department", department);

        return jdbcCall.execute(parameters);
    }
}
