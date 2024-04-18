<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Mypage</title>
</head>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<!-- https://github.com/szimek/signature_pad -->
<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
<c:import url="../temp/css.jsp"></c:import>
<style>
      .overlay-button {
        position: absolute;
        bottom: 5px; /* 오른쪽 하단에서의 여백 조정 */
        right: 5px; /* 오른쪽 하단에서의 여백 조정 */
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(241, 241, 241, 0.822); /* 배경색 및 투명도 조정 */
        border: none;
        color: white; /* 텍스트 색상 */
        font-size: 16px; /* 텍스트 크기 */
      }



      
</style>

<body>
    <div id="preloader">
        <div class="sk-three-bounce">
            <div class="sk-child sk-bounce1"></div>
            <div class="sk-child sk-bounce2"></div>
            <div class="sk-child sk-bounce3"></div>
        </div>
    </div>
    <div id="main-wrapper">


	   
        <!--**********************************
            Content body start
        ***********************************-->
        <div class="content-body">
            <div class="container-fluid mb-5">
                <div class="row page-titles mx-0">
                    <div class="col-sm-6 p-md-0">
                        <div class="welcome-text">
                            <h4>Profile</h4>

                        </div>
                    </div>
                    <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </div>
                </div>
                <!-- row -->
                <sec:authentication property="principal" var="employeeVO"/>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="profile">
                            <div class="profile-head">
                                <div class="photo-content">
                                    <div class="cover-photo"></div>
                                    <div class="profile-photo">
                                        <img src="/focus-bootstrap-main/theme/images/profile/사랑아보영해.jpg" class="img-fluid rounded-circle" alt="">
                                        <button class="overlay-button">
                                            
                                            <i class="fa-solid fa-pen-to-square" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="row justify-content-center">
                                        <div class="col-xl-8" style="margin-left: 2%;">
                                            <div class="row">
                                                <div class="col-1 mb-5">
                                                    <div class="profile-name">
                                                        <h4 class="text-primary"></h4>
                                                    </div>
                                                </div>
                                                <div class="col-xl-4 col-sm-4 border-right-1 prf-col">
                                                    <div class="profile-email">
                                                        <h4 class="text-primary">${employeeVO.username}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

				<!-- 비번 변경 -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">

                                
                                
                                
                                <div class="profile-tab mx-4 my-2">
                                    
                                    
                                    <div class="row mb-2">
                                        
                                        <div class="col-0 ml-3" style="display: table;">
                                            <i class="fa fa-lock" style="display: table-cell; vertical-align: middle;"></i>
                                        </div>
                                        
                                        <div class="col-10" style="display: table;">
                                            <h4 class="text-primary" style="font-weight: 700; display: table-cell; vertical-align: middle;">비밀번호</h4>
                                        </div>
										
                                        <!-- 비번변경 모달창 -->
                                        <div class="col-0">
                                            <button type="submit" class="btn btn-light btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg">변경</button>
                                        </div>

                                        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
                                            <div class="modal-dialog ">
                                                <form:form modelAttribute="employeeVO" action="./pwUpdate">
                                                    <div class="modal-content">
                                                        <div class="modal-header" style="display: table;">
                                                            <h4 class="text-primary" style="font-weight: 600; display: table-cell; vertical-align: middle;">비밀번호 변경</h4>
                                                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                            </button>
                                                        </div>

                                                            <div class="modal-body">

                                                                <!-- username 넣어줘!!!!집갈거임ㅎㅎ -->

                                                                <label class="my-2"><strong>현재 비밀번호</strong></label>
                                                                <form:password path="password" cssClass="form-control input-rounded" id="password"></form:password>
                                                                <form:errors path="password"></form:errors>
                                                                
                                                                <label class="my-2"><strong>새 비밀번호</strong></label>
                                                                <form:password path="newPassword" cssClass="form-control input-rounded" id="newPassword"></form:password>
                                                                <form:errors path="newPassword"></form:errors>
                                                                    
                                                                <label class="my-2"><strong>새 비밀번호 확인</strong></label>
                                                                <form:password path="passwordCheck" cssClass="form-control input-rounded" id="passwordCheck"></form:password>
                                                                <form:errors path="passwordCheck"></form:errors>
                                                            </div>
                                                                
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-primary">Save changes</button>
                                                            </div>
                                                    </div>
                                                </form:form>
                                            </div>
                                        </div>

                                        



                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

				<!-- 수정불가 정보 -->
				<div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-tab mx-4 my-4">
                                    <div class="profile-personal-info">
                                        
                                        
                                        <div class="row mb-4">
                                            <div class="col-3">
                                                <h5 class="f-w-500">이름 <span class="pull-right">:</span>
                                                </h5>
                                            </div>
                                            <div class="col-9"><span>${employeeVO.name}</span>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-3">
                                                <h5 class="f-w-500">부서 <span class="pull-right">:</span>
                                                </h5>
                                            </div>
                                        <div class="col-9"><span>${employeeVO.departmentVO.dep_name}</span></div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-3">
                                                <h5 class="f-w-500">직급 <span class="pull-right">:</span></h5>
                                            </div>
                                            <div class="col-9"><span>${employeeVO.positionVO.pos_name}</span>
                                            </div>
                                        </div>
                                        
										
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

				<!-- 수정가능 정보 -->
				<div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-tab mx-4 my-4">
                                    <div class="profile-personal-info">
										<h4 class="text-primary mb-4">Personal Information</h4>
										<div class="row mb-4">
											<div class="col-3">
												<h5 class="f-w-500">닉네임 <span class="pull-right">:</span>
												</h5>
											</div>
											<div class="col-9"><span>${employeeVO.nickname}</span>
											</div>
										</div>
										<div class="row mb-4">
											<div class="col-3">
												<h5 class="f-w-500">휴대전화번호 <span class="pull-right">:</span>
												</h5>
											</div>
											<div class="col-9"><span>${employeeVO.phone}</span>
											</div>
										</div>
										<div class="row mb-4">
											<div class="col-3">
												<h5 class="f-w-500">주소 <span class="pull-right">:</span></h5>
											</div>
											<div class="col-9"><span>${employeeVO.address}</span>
											</div>
										</div>
										<div class="row mb-4">
											<div class="col-3">
												<h5 class="f-w-500">결재 서명 <span class="pull-right">:</span>
												</h5>
											</div>
											<div class="col-9"><span>~~~~~~~~~~</span>
											</div>
                                            <!-- 서명 수정 모달 -->
                                            <div class="col-0">
                                                <button type="submit" class="btn btn-light btn-lg" data-toggle="modal" data-target=".bd-example1-modal-lg">등록</button>
                                            </div>
                                            <div class="modal fade bd-example1-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header" style="display: table;">
                                                            <h4 class="text-primary" style="font-weight: 600; display: table-cell; vertical-align: middle;">결재 서명 등록</h4>
                                                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            




                                                            
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">clear</button>
                                                            <button type="button" class="btn btn-primary">send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- temp -->
                                            <div id="signature-pad" class="m-signature-pad">
                                                <div class="m-signature-pad--body">
                                                    <canvas id="signature-pad" class="signature-pad" width=400 height=200 style="border: 1px solid black"></canvas>
                                                </div>
                                                <div class="m-signature-pad--footer">
                                                    
                                                    <button type="button" class="button clear" data-action="clear">지우기</button>
                                                    <button type="button" class="button save" data-action="save">저장</button>
                                                </div>
                                            </div>
                                            

										</div>
										
									</div>
                                </div>
								<div class="text-center mb-2"><a href="javascript:void()" class="btn btn-primary">사원 정보 수정</a> </div>
                            </div>
                        </div>
                    
					
					
					</div>

                </div>








				


            </div>
        </div>
        <!--**********************************
            Content body end
        ***********************************-->
        
    </div>    
        <script>
            var canvas = $("#signature-pad canvas")[0]; 
            var sign = new SignaturePad(canvas, { 
                minWidth: 5, 
                maxWidth: 2, 
                penColor: "rgb(1, 2, 3)" 
            });

            $("[data-action]").on("click", function () {
                if ($(this).data("action") == "clear") { 
                    sign.clear(); 
                }
                else if ($(this).data("action") == "save") {
                    if (sign.isEmpty()) { alert("사인해 주세요!!");
                    } else { 
                        $.ajax({ 
                            url: "save.jsp", 
                            method: "post", 
                            dataType: "json", 
                            data: { sign: sign.toDataURL() }, 
                            success: function (r) {
                                alert("저장완료 : " + r.filename);
                                sign.clear();
                            },
                            error: function (res) {
                                console.log(res);
                            }
                        });
                    }
                }
            });
            
            function resizeCanvas() {
                var canvas = $("#signature-pad canvas")[0];
                var ratio = Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
            }
            
            $(window).on("resize", function () {
                resizeCanvas();
            });
            resizeCanvas();
        </script>




	<c:import url="../temp/header.jsp"></c:import>
	<c:import url="../temp/sidebar.jsp"></c:import>

	
	<c:import url="../temp/footer.jsp"></c:import>
	<c:import url="../temp/js.jsp"></c:import>
</body>
</html>