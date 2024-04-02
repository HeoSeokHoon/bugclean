<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
	.create{
		width: 100px;
		float: right;
	}
</style>
</head>
<c:import url="../temp/css.jsp"></c:import>
<body>
	<c:import url="../temp/header.jsp"></c:import>
	
	<c:import url="../temp/sidebar.jsp"></c:import>
	
	<div class="content-body " style="min-height:900px;">
		<b>거래처 목록</b>
	<a href="./create">
		<button class="btn-rounded btn-dark create">등록하기</button>
	</a>
	<table class="table">
		<tr>
			<th>사업자명</th>
			<th>대표자명</th>
			<th>대표자 번호</th>
			<th>담당자명</th>
			<th>담당자 번호</th>
			<th>주소</th>
		</tr>
	</table>
	
	
	</div>
	<c:import url="../temp/footer.jsp"></c:import>
	
	<c:import url="../temp/js.jsp"></c:import>
</body>
</html>