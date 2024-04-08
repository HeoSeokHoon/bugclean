
function initDataTables(){
    $.ajax({
        url:"/hr/member/list",
        type: "GET",
        success: function (response){
            console.log(response);
            $('#memberList').DataTable({
                "data": response,
                "columns":[
                    {data: "EMPLOYEE_NUM", title: "사번"},
                    {data: "NAME", title: "이름"},
                    {data: "NICKNAME", title: "닉네임"},
                    {data: "PHONE", title: "연락처"},
                    {data: "ADDRESS", title: "주소"},
                    {data: "DEP_NAME", title: "부서"},
                    {data: "POS_NAME", title: "직급"},
                    {data: "JOIN_DATE", title: "입사일"}
                ]
            })
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#tempList').html('<div style="color:red;">데이터를 가져오는 중 오류가 발생했습니다.</div>');
        }
    })
}

$(document).ready(async function (){
    await initDataTables();
})