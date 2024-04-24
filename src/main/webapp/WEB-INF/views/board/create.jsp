<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>


<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header row">
                <!-- 제목 입력 -->
                <div class="col-6">
                    <div class="form-group row align-items-center text-center">
                        <label for="board-title" class="col-2 col-form-label-lg m-0">제 목</label>
                        <div class="col-9">
                            <input id="board-title" data-board-code="${board.BOARD_CODE}" type="text"
                                   class="form-control form-control-lg"
                                   value="${board.BOARD_TITLE}">
                        </div>
                    </div>
                </div>
                <!-- 작성자 표기 -->
                <div class="col-6 d-flex align-items-center justify-content-center">
                    <sec:authorize access="isAuthenticated()">
                        <sec:authentication property="principal" var="employeeVO"/>
                        <h5 class="col-3 m-0">${employeeVO.name}</h5>
                        <input type="hidden" id="employee_num" value="${employeeVO.employee_num}"/>
                    </sec:authorize>
                    <sec:authorize access="!isAuthenticated()">
                        <h5 class="col-3 m-0">비로그인</h5>
                        <input type="hidden" id="employee_num" value="2022001"/>
                    </sec:authorize>
                </div>
            </div>

            <div class="card-body">
                <div class="summernote">
                    <c:if test="${board ne null}">
                        ${board.BOARD_CONTENTS}
                    </c:if>
                </div>
                <div id="files">
                    <div id="attachment-group">
                        <div class="input-group mb-1" id="attachment-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text">첨부파일</span>
                            </div>
                            <div class="custom-file col">
                                <input type="file" class="custom-file-input" name="file-1">
                                <label class="custom-file-label">파일을 선택하세요</label>
                            </div>
                            <div class="input-group-append">
                                <button type="button" class="btn btn-sm btn-dark plus-file">+</button>
                                <button type="button" class="btn btn-sm btn-dark minus-file"
                                        data-target="attachment-1">
                                    −
                                </button>
                            </div>
                        </div>
                    </div>
                    <c:if test="${board ne null}">
                        <hr>
                        <span class="text-primary">현재 첨부파일</span>
                        <div class="text-secondary d-flex justify-content-between">
                            <c:forEach items="${board.fileVOs}" var="file">
                                    <span class="attached-index file-code"
                                          data-file-code="${file.file_code}">${file.origin_name}</span>
                            </c:forEach>
                        </div>
                    </c:if>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div>
                    <button id="delete-btn" type="button" class="btn btn-warning">삭제</button>
                </div>
                <div>
                    <button id="save-btn" type="button" class="btn btn-primary">저장</button>
                    <button id="close-btn" type="button" class="btn btn-secondary">취소</button>
                </div>
            </div>
        </div>
    </div>
</div>


