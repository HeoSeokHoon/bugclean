<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<c:import url="./create_css.jsp"></c:import>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<c:import url="../temp/css.jsp"></c:import>
<body>
	<div id="preloader">
		<div class="sk-three-bounce">
			<div class="sk-child sk-bounce1"></div>
			<div class="sk-child sk-bounce2"></div>
			<div class="sk-child sk-bounce3"></div>
		</div>
	</div>
	<div id="main-wrapper">

		<c:import url="../temp/header.jsp"></c:import>
		<c:import url="../temp/sidebar.jsp"></c:import>

		<div class="content-body " style="min-height: 900px;">
			<form>
				<!-- 법인인지 개인인지 보여줌 -->
				<div id="check">
					<input type="checkbox" id="ck_company" class="ck"
						onclick="company()" disabled="disabled" checked="checked">
					<label for="ck_company">${vo.customer_Type}</label>

					<!-- 법인일시 출력창 -->
				</div>
				<c:if test="${vo.customer_Type eq '법인'}">
					<div id="company">
						<div id="bn_num">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">사업자 번호</button>
							<input class="right-div" id="bn_num_in" type="text"
								value="${vo.business_Num}" readonly="readonly">
						</div>
						<div id="bn_name">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">사업자 명</button>
							<input class="right-div" id="bn_name_in" type="text"
								value="${vo.business_Name}" readonly="readonly">
						</div>
						<div id="ceo_name">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">대표자 명</button>
							<input class="right-div" id="ceo_name_in" type="text"
								value="${vo.ceo_Name}" readonly="readonly">
						</div>
						<div id="ceo_phone">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">대표 전화번호</button>
							<input class="right-div" id="ceo_phone_in" type="text"
								value="${vo.ceo_Phone}" readonly="readonly">
						</div>
						<div id="addr">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">주소</button>
							<input class="right-div" id="addr_in" type="text"
								value="${vo.address}" readonly="readonly">
						</div>
						<div id="manager_name">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">매니저 명</button>
							<input class="right-div" id="manager_name_in" type="text"
								value="${vo.manager_Name}" readonly="readonly">
						</div>
						<div id="manager_phone">
							<button disabled="disabled"
								class=" btn-square btn-outline-dark left-div">매니저 전화번호</button>
							<input class="right-div" id="manager_phone_in" type="text"
								value="${vo.manager_Phone}" readonly="readonly">
						</div>
						<div id="sales_name">
							<button disabled="disabled"
								class=" btn-square btn-outline-dark left-div">영업 담당자 명</button>
							<input class="right-div" id="sales_name_in" type="text"
								value="${vo.sales_Manager}" readonly="readonly">
						</div>

					</div>
					<!-- 법인 출력창 끝 -->

					<!-- 개인출력 시작  -->
				</c:if>
				<c:if test="${vo.customer_Type eq '개인'}">
					<div id="person1">

						<div id="addr_person">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">주소</button>
							<input class="right-div" id="addr_person_in" type="text"
								value="${vo.address}" readonly="readonly">
						</div>
						<div id="person_name">
							<button disabled="disabled"
								class="btn-square btn-outline-dark left-div">고객명</button>
							<input class="right-div" id="person_name_in" type="text"
								value="${vo.ceo_Name}" readonly="readonly">
						</div>
						<div id="person_phone">
							<button disabled="disabled"
								class=" btn-square btn-outline-dark left-div">고객 전화번호</button>
							<input class="right-div" id="person_phone_in" type="text"
								value="${vo.ceo_Phone}" readonly="readonly">
						</div>

					</div>
				</c:if>
				<!-- 개인 출력 끝 -->

				<!-- 삭제버튼 -->
				<button class="btn-rounded btn-dark create">삭제하기</button>

			</form>

			<c:import url="../temp/messenger.jsp"></c:import>
		</div>
	</div>


	<c:import url="../temp/footer.jsp"></c:import>
	<c:import url="../temp/js.jsp"></c:import>
	<c:import url="./create_js.jsp"></c:import>
</body>
</html>