<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BugClean</title>
</head>
<c:import url="../temp/css.jsp"></c:import> <!-- //bootstrap-template-css -->
<link href="/focus-bootstrap-main/theme/vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
<body>
<div id="preloader">
    <div class="sk-three-bounce">
        <div class="sk-child sk-bounce1"></div>
        <div class="sk-child sk-bounce2"></div>
        <div class="sk-child sk-bounce3"></div>
    </div>
</div>
<div id="main-wrapper">

    <c:import url="../temp/header.jsp"></c:import> <!-- //nav-header -->
    <c:import url="../temp/sidebar.jsp"></c:import> <!-- //sidebar-menu -->

    <div class="content-body " style="min-height:900px;">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4 style="font-weight: bolder;">&ensp; 수신문서함</h4>
                    </div>
                </div>
                <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active">문서함</li>
                        <li class="breadcrumb-item active"><a href="./">Inbox</a></li>
                    </ol>
                </div>
            </div>
            <!-- row -->


            <div class="row">
                
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title" style="font-weight: bold;">문서 목록</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="tempList" class="table-hover table" style="width: 98%">
                                    <tr>
                                        <th>문서번호</th>
                                        <th>제목</th>
                                        <th>기안자</th>
                                        <th>기안날짜</th>
                                        <th>상태</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    
    <c:import url="../temp/messenger.jsp"></c:import>
    </div>

</div>

<c:import url="../temp/footer.jsp"></c:import> <!-- //footer -->
<c:import url="../temp/js.jsp"></c:import> <!-- // bootstrap-template-js -->
<script src="/focus-bootstrap-main/theme/vendor/datatables/js/jquery.dataTables.min.js"></script>
<script src="/bugclean/js/memberAgree-dataTables-init.js"></script>

</body>
</html>