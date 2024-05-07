<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bug Clean</title>
</head>
<c:import url="../temp/css.jsp"></c:import> <!-- //bootstrap-template-css -->
<body class="h-100">

    
    <div class="authincation h-100">
        <div class="container-fluid h-100">
            <div class="row justify-content-center h-100 align-items-center" style="margin-top: 18%;">
                <div class="col-md-5">
                    <div class="form-input-content text-center">
                        <div class="mb-5">
                            <a class="btn btn-primary" href="/">Back to Home</a>
                        </div>
                        <h1 class="error-text font-weight-bold">500</h1>
                            <h4 class="mt-4"><i class="fa fa-times-circle text-danger"></i> Internal Server Error</h4>
                            <p>You do not have permission to view this resource</p>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
<c:import url="../temp/js.jsp"></c:import> <!-- // bootstrap-template-js -->
</body>
</html>