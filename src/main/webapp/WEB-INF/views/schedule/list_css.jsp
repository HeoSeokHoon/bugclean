<style>
#calendar {
	height: 750px;
	width: 750px;
	color: black;
	margin: auto;
}
/* 모달 스타일 */
.modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
	background-color: #fefefe;
	margin: 15% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	max-width: 600px; /* 모달 최대 너비 지정 */
	position: relative; /* 모달 내부 컨텐츠를 화면 중앙에 정렬하기 위해 */
}

.close {
	color: #aaa;
	position: absolute; /* 닫기 버튼을 모달 내부에 위치시킵니다. */
	top: 10px;
	right: 10px;
	font-size: 28px;
	font-weight: bold;
}

.close:hover, .close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}
#create_sch_btn{
	width:100px;
	margin:auto;
}
#input_site_manager{
	width:200px;
	margin:auto;
}
#modal-title{
	width:30%;
}
#title_div{
	display: flex;
}

</style>