var calenar;
let start_first;
let span_start_time = document.getElementById("start_Time");
let color;
let textDeco;
let allocationDiv = document.getElementById("allocationDiv");
//event listner 한번만 걸기를 위한
let create_fucn;
let sch_Filter_Input = document.getElementById("sch_Filter_Input")
//수정 등록 삭제 버튼
let update_sch_btn = document.getElementById("update_sch_btn");
let delete_sch_btn = document.getElementById("delete_sch_btn");
let create_sch_btn = document.getElementById("create_sch_btn");
let complate_sch_btn = document.getElementById("complate_sch_btn");

let updel = document.getElementsByClassName("updel");
//

let postApi = document.getElementsByClassName("postApi");
let postApiDis = document.getElementsByClassName("postApiDis");
//input 값들
let inputTitle = document.getElementById("inputTitle");
let inputSales = document.getElementById("inputSales");
let inputStart = document.getElementById("inputStart");
let inputEnd = document.getElementById("inputEnd");
let inputSiteManager = document.getElementById("inputSiteManager");
let inputAddress = document.getElementById("inputAddress");
let inputPrice = document.getElementById("inputPrice");
let inputRadio = document.getElementsByName("type");
let radioValue;
let inputSelect = document.getElementById("inputSelect");
let inputSelectEMP = document.getElementById("inputSelect_emp");
let inputSelectCustomerName = document.getElementById("inputSelectCustomerName");
//여기서부터 select box 관련
// id = 각 박스의 기본값 , class = 이벤트 클릭시 해당 이벤트 담당자들 값이 셀렉트되어서 노출되게 하기위함
let emp_choice_value = document.getElementsByClassName("emp_choice_value");
let emp_choice_base = document.getElementById("emp_choice_base");
let sales_choice_value = document.getElementsByClassName("sales_choice_value");
let salse_choice_base = document.getElementById("salse_choice_base");
let site_choice_value = document.getElementsByClassName("site_choice_value");
let site_choice_base = document.getElementById("site_choice_base")
let car_choice = document.getElementsByClassName("car_choice");
let base_selected = document.getElementsByClassName("base_selected");

let input_carAllocation = document.getElementById("input_carAllocation");
// 

inputSelectCustomerName.addEventListener("change",function(){
    console.log("input title = ",inputSelectCustomerName.value);    
    inputTitle.value = inputSelectCustomerName.value;
    console.log(inputTitle.value);
})

inputSelect.addEventListener("change",function(){
    console.log("input select = ", inputSelect.value )
    inputSales.value = inputSelect.value;
})

inputSelectEMP.addEventListener("change",function(){
    inputSiteManager.value = inputSelectEMP.value;
})

// 이벤트 추가 함수 
function create_sch(date){
    console.log("date =  ",date);
    for(let i=0; i<inputRadio.length;i++){
        if(inputRadio[i].checked == true){
            radioValue = inputRadio[i].value;
        }    
    
    }
    fetch("/schedule/create",{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({
            customer_Num : inputTitle.value,
            sales_Manager : inputSales.value,
            employee_Num : inputSiteManager.value,
            start_Time : date + " "+inputStart.value,
            end_Time : date + " "+inputEnd.value,
            site_Type : radioValue,
            address : inputAddress.value,
            price : inputPrice.value
            })
        })
        .then(res => res.json())
        .then(res=>{
            if(res>0){
                alert("추가완료")
                openWindow();
            }
            else{
                alert("퇴사 직원은 선택하지 못합니다");
            }
        })
    }



document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView : 'dayGridMonth',
        selectable : true,
        locale : "kr",
        editable: true,
        headerToolbar: {
            start: 'title', 
            end: 'today prev,next' 
        },
        
        eventContent: function(arg) {
            console.log(arg);
            return {
              html:  `<div style="text-decoration: ${arg.event.classNames[0]}; color: ${arg.textColor};">` + '<b>' + arg.event.title+arg.event.startStr.substring(11,16) + '</b></div>'
            };
          },
        eventDrop: function(info) {
            console.log(info);
                alert("일정을 이동했습니다!\n"+info.event.startStr.substring(0,10)+"    " +info.event.startStr.substring(11,19) ); // 이벤트를 이동할 때 알림창을 띄울 수 있습니다.
                console.log(info.event.startStr.substring(0,10) +" " +info.event.startStr.substring(11,19))
                console.log(info.event.id.substring(info.event.id.lastIndexOf('-')+1,info.event.length))
                console.log(info.event.endStr.substring(0,10) +" "+info.event.endStr.substring(11,19))
                fetch("/schedule/updateSchDrag",{
                    method :"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body : JSON.stringify({
                        site_Num : info.event.id.substring(info.event.id.lastIndexOf('-')+1,info.event.length),
                        start_Time : info.event.startStr.substring(0,10) +info.event.startStr.substring(11,19), 
                        end_Time :info.event.endStr.substring(0,10) +info.event.endStr.substring(11,19)
                        
                    })
                }).then(res=>res.json())
                .then(res=>{
                    openWindow(); 
                })

        },dateClick : function(info) {
            newModal(info);

        }
        ,
        eventClick:function(info){
            console.log("event Click");
            console.log("info = " +info.event.title);
            openModal(info.event.title,info.event.start,info.event.id)
        }

    });
    calendar.render();
});

function addEventToCalendar(event) {
    calendar.addEvent(event);
}

function removeEventFromCalender(id) {
    let calenderEvent = calendar.getEventById(id);
    calenderEvent.remove();
}

/* 모달창 */
//빈 일정 클릭시
function newModal(info){
    carAllocation.selectedIndex=0; // 배차 셀렉트박스 선택 값 초기화

    create_sch_btn.classList.remove("display_none");
    update_sch_btn.classList.add("display_none");
    delete_sch_btn.classList.add("display_none");
    complate_sch_btn.classList.add("display_none");
    allocationDiv.classList.add("display_none");
var modal = document.getElementById("myModal");
var modalTitle = document.getElementById("modal-title"); // 모달 타이틀 엘리먼트


for(let i=0;i<postApiDis.length;i++){
    postApiDis[i].classList.remove("display_none");
}
for(let i=0;i<postApi.length;i++){
    postApi[i].value = "";
}
inputAddress.classList.add("display_none");

modal.style.display = "block";
modalTitle.innerText="일정 등록";

            inputEnd.value = "";
            inputStart.value = "";
            inputAddress.value = "";
            inputPrice.value ="";
            inputSales.value= "";
            inputSiteManager.value = "";
            inputTitle.value = "";
            carSelectBase.value = "미정"
            carSelectBase.innerHTML = '배차 정보';
            input_carAllocation.value="미정";
            for(let i=0;i<base_selected.length;i++){
                base_selected[i].selected = true;
            }
            for(let i=0;i<inputRadio.length;i++){
                inputRadio[i].checked = false;
            }
            inputSelect_emp.value="";
            
for(let i=0;i<inputRadio.length;i++){
    console.log("checked radio console")
    if( inputRadio[i].value =='일반' ){
        console.log("success radio 일반 " , inputRadio[i].value)
        inputRadio[i].checked = true;
    } 
}

console.log(" date = == " +info.dateStr)
span_start_time.innerHTML = info.dateStr;
//일정추가

create_sch_btn.classList.remove("display_none");
create_fucn = info.dateStr;


//외부 공간 클릭시 닫기 
window.onclick = function(event) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    calendar.unselect();
}

create_sch_btn.addEventListener("click",function(){
    create_sch(create_fucn);
})

/*
    내가 클릭을해서 모달이 열렸어

*/

let sch_ID;
// 이벤트 클릭시 
function openModal(content,date,id) {
carAllocation.selectedIndex=0; // 배차 셀렉트박스 선택 값 초기화



    allocationDiv.classList.remove("display_none");
    create_sch_btn.classList.add("display_none");
    update_sch_btn.classList.remove("display_none");
    delete_sch_btn.classList.remove("display_none");
	complate_sch_btn.classList.remove("display_none")

let modal = document.getElementById("myModal");
let modalTitle = document.getElementById("modal-title"); // 모달 타이틀 엘리먼트
let modalContent = document.getElementById("modal-content");
let start_Time_Date = document.getElementById("start_Time_Date");
let end_Time_Date = document.getElementById("end_Time_Date");

for(let i=0;i<postApi.length;i++){
    postApi[i].value = "";
}
for(let i=0;i<postApiDis.length;i++){
    postApiDis[i].classList.add("display_none");    postApiDis[i].classList.add("display_none");
}
inputAddress.classList.remove("display_none")

 
let inputStart = document.getElementById("inputStart");
modal.style.display = "block";
modalTitle.innerText="일정 확인";
    //event id로 site pk 가져오는방법
    sch_ID = id.substring(id.lastIndexOf('-')+1,id.length);

    


        fetch("/schedule/getSchedule",{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify({
               site_Num : sch_ID
                })
        }).then(res=>res.json())
        .then(res=>{
            console.log("res===",res);
            inputEnd.value = res.end_Time.substring(11);
            inputStart.value = res.start_Time.substring(11);
            inputAddress.value = res.address;
            inputPrice.value =res.price;
            inputSales.value= res.sales_Manager;
            inputSiteManager.value = res.employee_Num;
            inputTitle.value = res.business_Name;
            radioValue = res.site_Type;
            schManageCode = res.manage_Code;
            console.log(schManageCode)
            if(schManageCode != null) {
                    fetch("/general/getCarNumber",{
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body : JSON.stringify({
                        car_code : schManageCode
                    
                    })
                }).then(res=>res.json())
                .then(res => {
                    console.log("res === = == = =" , res);
                    
                        if(res.pro_status == 1){
                            input_carAllocation.value = '배차 신청중';
                        }else if(res.pro_status ==2){
                            input_carAllocation.value = '배차 완료'
                        }

                })
                }else{
                    console.log("미정이")
                  
                    
                    input_carAllocation.value="미정";
                }
                
            
            

            for(let i=0;i<emp_choice_value.length;i++){
                if(emp_choice_value[i].value == res.customer_Num ){
                    emp_choice_value[i].selected = true;
                }
            }
            for(let i =0; i<sales_choice_value.length;i++){
                if(sales_choice_value[i].value == res.sales_Manager){
                    sales_choice_value[i].selected = true;  
                }
            }
            for(let i=0; i<site_choice_value.length;i++){
                if(site_choice_value[i].value == res.employee_Num){
                    site_choice_value[i].selected = true;
                }

            }


            for(let i=0;i<inputRadio.length;i++){
                console.log("radio",inputRadio[i].value + " //// site_type == ", res.site_Type)
                if(inputRadio[i].value == res.site_Type){
                    inputRadio[i].checked= true;
                }
            }
            let allocationState  = res.manage_Code;
            console.log("inputStart === " , inputStart.value)
            fetch("/general/getUsableList",{
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify({
                    booking_start :  res.start_Time,
                    booking_done : res.end_Time
                })
            }).then(res=>res.json())
            .then(res=>{
                console.log("사용가능차량",res);
                if(allocationState == null){
                    console.log("null입니당")
                    carAllocation.innerHTML = `<option id ="carSelectBase" value="">배차요청</option>`;
                    res.forEach(element => {
                        carAllocation.innerHTML += `<option class="car_choice" value="${element.car_num} ${element.car_code}">${element.car_num}</option>`
                     });
                }else{
                    console.log("null이 아닙ㅂ니당",allocationState);
                    fetch("/general/getAllocationState",{
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                          },
                        body : JSON.stringify({
                            manage_code : allocationState
                        })
                    }).then(res=>res.json())
                    .then(res=>{
                      console.log("배차 정보 확인 res = >>",res);  
                      carAllocation.innerHTML = `<option id ="carSelectBase" value="${res.CAR_NUM} ${res.CAR_CODE} ">${res.CAR_NUM}</option>`;
                      if(res.BOOKING_AGREE == '0'){
                        input_carAllocation.value = "배차 신청중"
                      }else{
                        input_carAllocation.value = "배차 완료";
                      }
                    })
                }
                
            })
            //사용가능 차량 리스트 가져오기 끝
            //배차 정보 가져오기
           
        })


        //수정 버튼 클릭시 수정
        update_sch_btn.addEventListener("click",function(){
                console.log("test === " , date + " "+inputStart.value)

                for(let i=0; i<inputRadio.length;i++){
                    if(inputRadio[i].checked == true){
                        radioValue = inputRadio[i].value;
                    }    
                
                }

            fetch("/schedule/updateSch",{

                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify({
                    site_Num : sch_ID,
                    customer_Num : inputSelectCustomerName.value,
                    sales_Manager : inputSelect.value,
                    employee_Num : inputSelectEMP.value,
                    start_Time : id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-')) + inputStart.value,
                    end_Time : id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-'))+inputEnd.value,
                    site_Type : radioValue,
                    address : inputAddress.value,
                    price : inputPrice.value
                })
            })
                .then(res=>res.json())
                .then(res=>{
                    if(res>0){
                        console.log("res update fetch === ", res);
                        openWindow(); 
                    }
                    else{
                alert("퇴사 직원은 선택하지 못합니다");
            }
            })
        })

        //삭제 버튼 클릭시 삭제 상태로 수정
        delete_sch_btn.addEventListener("click",function(){
            fetch("/schedule/updateSchType",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    site_Num : sch_ID,
                    site_Type : '취소'
                })
            }).then(res=>res.json())
            .then(res=>{
                if(res>0){
                    alert("일정이 취소되었습니다." +  res);
                    openWindow(); 
                }else{
                    alert("일정 취소에 실패했습니다.");
                }
            })
        })
		
		complate_sch_btn.addEventListener("click",function(){
			fetch("/schedule/updateSchType",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    site_Num : sch_ID,
                    site_Type : '완료'
                })
            }).then(res=>res.json())
            .then(res=>{
                if(res>0){
                    alert("일정이 완료되었습니다." +  res);
                    openWindow(); 
                }else{
                    alert("일정 완료에 실패했습니다.");
                }
            })
        })
		
		
    console.log("last index of ===== ",id.lastIndexOf('-'));
    console.log("id substr == ", id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-')))
    console.log("id length = ",id.length);
    console.log("id substring id ==== ",id.substring(id.lastIndexOf('-')+1,id.length));
    span_start_time.innerHTML = id.substring(id.lastIndexOf('-')-10,id.lastIndexOf('-'));   
  

console.log("date"+date);
console.log("id"+id);
//일정추가
create_sch_btn.classList.add("display_none");
create_sch_btn.addEventListener("click",function(){

    create_sch(date);
})

//외부 공간 클릭시 닫기 
window.onclick = function(event) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    calendar.unselect();
}
// 모달 닫기
function closeModal() {
var modal = document.getElementById("myModal");
modal.style.display = "none";
calendar.unselect();
}





// 배차 요청 셀렉트박스
let carAllocation = document.getElementById("carAllocation");
    carAllocation.addEventListener("change",function(){
        console.log("현장 아이디 확인  ==== " , sch_ID);
        changeSelect(sch_ID);
    })

let car_manageCode;
function changeSelect(sch_ID){
    let car_temp = carAllocation.value.substring(0,7);
    let car_number = carAllocation.value.substr(7);
    if(car_temp.value != ""){
        console.log(car_number +"==== car number" )
        let check = confirm(car_temp+" 차량으로 배차요청 하시겠습니까?");
        if(check == false){
            carAllocation.selectedIndex=0;
            //배차 선택시 상태값 변경부터 이어서 
        }
        else{
            carAllocation.value=car_temp;
            fetch("/general/carAllocation",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify({
                    car_code: car_number,
                    employee_num: inputSelect_emp.value,
                    booking_start : start_Time.innerHTML +" "+ inputStart.value,
                    booking_done :start_Time.innerHTML +" "+ inputEnd.value,
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log("car_manage 배차 요청 ===",res);
                car_manageCode = res.manage_code
                fetch("/schedule/carAllocation",{
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body : JSON.stringify({
                        site_Num : sch_ID,
                        manage_Code : car_manageCode
                    })
                }).then(res=>res.json())
                .then(res => {
                    console.log("sch 배차 정보 상태 갱신 === ",res);
                    closeModal();
                })


            })

           

        }
    }

}

//필터값 변경
function filter_name(e) {
    if(e.keyCode == 13){
        console.log("enter 입력");
        openWindow(sch_Filter_Input.value);
    }
}

// 페이지 로드 시 db에서 값 받아오기
function openWindow(e){
    let param
    console.log("e === == " , e);
    param = e;
    if(e == null || e =='undefined'){
        param  = "";
        console.log("null or undef")
    } 
    fetch("/schedule/getList?search="+param,{
        method : "GET"
    })
    .then(res => res.json())
    .then(res => {
            calendar.getEvents().forEach(function(event) {
            event.remove();
            });

            console.log("h2");
            console.log("test = ",res);
            res.forEach(element => {
               console.log("start = ", element.start_Time);
               
               start_first = element.start_Time.substr(0,10);
               console.log("start_first = ", start_first);
               console.log("site_Num === ", element.site_Num)
               let start_last = element.start_Time.substring(11,19);
                
                if(element.site_Type == '긴급'){
                    color = "red";
                    textDeco = "none";
                } 
                else if(element.site_Type =='일반'){
                    color = "black";
                    textDeco = "none"
                } 
                else if(element.site_Type == '취소'){
                    color = 'gray';
                    textDeco = "line-through";
                }else if (element.site_Type == '완료'){
                    color = 'blue';
                    textDeco = 'none';
                }
                console.log("color == ", color);
                  calendar.addEvent({
                   title : element.business_Name  + element.ceo_Name,
                   start : start_first +"T"+ start_last,
                   textColor : color,
                   classNames : textDeco,
                   end : element.end_Time,
                   id : element.ceo_Name+start_first+"-"+element.site_Num
                  })
            });
    })
}

window.addEventListener("load",function(){
    openWindow();    

})

let detailAddress = document.getElementById("detailAddress");
let jibunAddress = document.getElementById("jibunAddress")
let roadAddress = document.getElementById("roadAddress");
detailAddress.addEventListener("change",function(){
    inputAddress.value = roadAddress.value + " " + detailAddress.value;
})
