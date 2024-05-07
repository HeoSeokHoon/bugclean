


const chat_container = document.getElementById("chat_container");
chat_container.scrollTop = chat_container.scrollHeight;
let lastWriter;
let username1 = '${pageContext.request.userPrincipal.name}';
let username2;
const sendData = localStorage.getItem('sendData');
const sendDataMsg = JSON.parse(localStorage.getItem('sendDateMsg'));
    
console.log("send date == > ", sendData);
console.log("senddate msg == > ", sendDataMsg)
                    // 로그인 한 사람 사원번호 예정
                    let id1 = sendData.substring(0,7);
                    // 상대방 번호 될 예정
                    let id2 = sendData.substring(7);
                    let t;
window.onload = function(){
    fetch("/chat/getEmpName",{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({
                        username : username1
                    })
                }).then(res=>res.json())
                .then(res=>{
                    console.log("res=== > ",res)
                    username1 = res.NAME;
                    

                    if(res.EMPLOYEE_NUM != id1){
                        t = id2;
                        id2 = id1;
                        id1 = t;
                    }
                    fetch("/chat/getEmpInfo",{
                        method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({
                        employee_num : id2
                    })
                    }).then(res=>res.json())
                    .then(res=>{
                        console.log("res  id2 ===>",res);
                        let profile= "/focus-bootstrap-main/theme/images/base_profile.png";
                        if(res.PROFILE != null){
                            profile = "/files/profile/" +res.PROFILE 
                        }
                        console.log("profile==>",profile)
                        alert(`<div style="display : inline-block"><img id="user2_profile" src="${profile}"></div>`);
                        document.getElementById("chat_person").innerHTML = `<div style="display : inline-block"><img id="user2_profile" src="${profile}"></div>` + 
                        '<b>'+ res.DEP_NAME+" " + res.POS_NAME+ " " + res.NAME + '</b><hr> ';
                        username2 = res.NAME;

                                        // 채팅내역 불러오기 성공! 집가서 채팅창에 뿌려주면됩니다!!!
                                        for(let i=0;i<sendDataMsg.length;i++){
                                            console.log(sendDataMsg[i]);
                                            let send_Time = sendDataMsg[i].msg_send_time.substring(5,16);
                                            let send_hour = parseInt(send_Time.substring(6,8));
                                            let send_apm = '오전'
                                           
                                            if(send_hour>=12 && send_hour != 24){
                                                send_apm = '오후'
                                            }
                                            console.log(send_apm);
                                            if(send_hour%12 != 0){
                                                send_hour %= 12;
                                            }else if(send_hour %12 ==0 && send_hour/12 == 2){
                                                send_hour = '00';
                                            }
                                            else{
                                                send_hour=12;
                                            }

                                            let send_date =  send_Time.substring(0,5)+ " "+ send_apm + " " + +send_hour + " : " + send_Time.substring(send_Time.length-2,send_Time.length);

                                            console.log("send time == ", send_Time);
                                            if(i>0){
                                                if(sendDataMsg[i].employee_num == sendDataMsg[i-1].employee_num && sendDataMsg[i].msg_send_time.substring(8,16) == sendDataMsg[i-1].msg_send_time.substring(8,16)){
                                                    if(sendDataMsg[i].employee_num === id1){
                                                                str = "<div class='col-6 username1'>";
                                                                str += "<div class='alert alert-secondary' style='padding : 2%; font-size:small;'>";
                                                                str += sendDataMsg[i].msg_contents ;
                                                                str += "</div></div>";
                                                                $("#msgArea").append(str);
                                                            }
                                                            else{
                                                                str = "<div class='col-6 username2'>";
                                                                str += "<div class='alert alert-warning' style='padding : 2%; font-size:small;'>";
                                                                str +=   sendDataMsg[i].msg_contents ;
                                                                str += "</div>"
                                                                $("#msgArea").append(str);
                                                            }
                                                    
                                                }else if(sendDataMsg[i].employee_num === id1){
                                                                str = "<div class='col-6 username1'>";
                                                                str += "<p style='font-size : x-small; margin-top : auto;'>"+send_date + "</p>";
                                                                str += "<div class='alert alert-secondary' style='padding : 2%; font-size:small;'>";
                                                                str += sendDataMsg[i].msg_contents ;
                                                                str += "</div></div>";
                                                                $("#msgArea").append(str);
                                                            }
                                                            else{
                                                                str="<div class='user2_name'>" + `<img id="user2_profile" src="${profile}">`+ username2 +"</div>";
                                                                str += "<div class='col-6 username2'>";
                                                                
                                                                str += "<div class='alert alert-warning' style='padding : 2%; font-size:small;'>";
                                                                str +=   sendDataMsg[i].msg_contents ;
                                                                str += "</div>"
                                                                str +=  "<p style='font-size : x-small; margin-top : auto;'>"+send_date+"</p>"+"</div>";
                                                                $("#msgArea").append(str);
                                                            }
                                            }else if(i==0){
                                                if(sendDataMsg[i].employee_num === id1){
                                                str = "<div class='col-6 username1'>";
                                                str += "<p style='font-size : x-small; margin-top : auto;'>"+send_date + "</p>";
                                                str += "<div class='alert alert-secondary' style='padding : 2%; font-size:small;'>";
                                                str += sendDataMsg[i].msg_contents ;
                                                str += "</div></div>";
                                                $("#msgArea").append(str);
                                            }
                                            else{
                                                str="<div class='user2_name'>" + `<img id="user2_profile" src="${profile}">`+ username2 +"</div>";
                                                str += "<div class='col-6 username2'>";
                                                
                                                str += "<div class='alert alert-warning' style='padding : 2%; font-size:small;'>";
                                                str +=   sendDataMsg[i].msg_contents ;
                                                str += "</div>"
                                                str +=  "<p style='font-size : x-small; margin-top : auto;'>"+send_date+"</p>"+"</div>";
                                                $("#msgArea").append(str);
                                            }
                                        }          
                                        }

                    })
                })

}
                    console.log("sendData ===>",sendData);
                    console.log("sendDateMsg ===> ", sendDataMsg)

                
    
                    var roomName = "${room.name}";
                    var roomId = sendData;
                    
    
                    console.log("id1 == " , id1 , " id2= == > ", id2);
                    
                    let message;

                    var today = new Date();   

                    var hours = ('0' + today.getHours()).slice(-2); 
                    var minutes = ('0' + today.getMinutes()).slice(-2);
                    var timeString = hours + ':' + minutes
                    console.log(timeString);
                    console.log(roomName + ", " + roomId + ", " + username1);
    
                    var sockJs = new SockJS("/stomp/chat");
                    //1. SockJS를 내부에 들고있는 stomp를 내어줌
                    var stomp = Stomp.over(sockJs);
    
                    //2. connection이 맺어지면 실행
                    stomp.connect({}, function (){
                       console.log("STOMP Connection")
    
                       //4. subscribe(path, callback)으로 메세지를 받을 수 있음
                       stomp.subscribe("/sub/chat/room/" + roomId, function (chat) {
                           var content = JSON.parse(chat.body);
    
                           var writer = content.writer;
                           var str = '';
                           console.log("fetch 진입 ");
                           fetch("/chat/getLastWriter",{
                            method : 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body : JSON.stringify({
                                room_num : roomId
                            })
                           }).then(res=>res.json())
                           .then(res=>{
                            var today = new Date(); 
                            var hours = ('0' + today.getHours()).slice(-2); 
                            var minutes = ('0' + today.getMinutes()).slice(-2);
                            var timeString = hours + ':' + minutes
                            console.log(timeString);
                            console.log(roomName + ", " + roomId + ", " + username1);

                            console.log("sub ==> ", res.msg_send_time.substring(11,16));
                            console.log('res last writer==>', res);
                            if(id1 == res.employee_num && res.msg_send_time.substring(11,16) == timeString ){
                                if(writer === username1){
                                    str = "<div class='col-6 username1'>";
                                    str += "<div class='alert alert-secondary' style='padding : 2%; font-size:small';>";
                                    str +=  content.message;
                                    str += "</div></div>";
                                    $("#msgArea").append(str);
                           }
                                else{
                                    str = "<div class='col-6 username2'>";
                                    str += "<div class='alert alert-warning' style='padding : 2%; font-size:small';>";
                                    str +=  content.message ;
                                    str += "</div>";
                                    $("#msgArea").append(str);
                                }
                            }else{
                                if(writer === username1){
                                    str = "<div class='col-6 username1'>";
                                    str += "<p style='font-size : x-small; margin-top : auto;'>"+ timeString +"</p>";
                                    str += "<div class='alert alert-secondary' style='padding : 2%; font-size:small';>";
                                    str +=  content.message;
                                    str += "</div></div>";
                                    $("#msgArea").append(str);
                           }
                                else{
                                    str="<div class='user2_name'>" + '<img id="user2_profile" src="/focus-bootstrap-main/theme/images/base_profile.png">'+ username2 +"</div>";
                                    str += "<div class='col-6 username2'>";
                                    str += "<div class='alert alert-warning' style='padding : 2%; font-size:small';>";
                                    str +=  content.message ;
                                    str += "</div>";
                                    str += "<p style='font-size : x-small; margin-top : auto;'>"+ timeString + "</p>" + "</div>";
                                    $("#msgArea").append(str);
                                }
                            }
                           })

                           
                           
                           
                       });
    
                       //3. send(path, header, message)로 메세지를 보낼 수 있음
                       stomp.send('/pub/chat/enter', {}, JSON.stringify({ room_num: roomId, writer: username1}))
                    });
    
                    $("#button-send").on("click", function(e){
                        var msg = document.getElementById("msg");
                        message = $("#msg").val();
                        console.log(username1 + ":" + msg.value);
                        stomp.send('/pub/chat/message', {}, JSON.stringify({room_num: roomId, message: msg.value, writer: username1}));
                        sendMessage(roomId,msg.value,id1);
                        msg.value = '';
                    });
                    function enterKey(){
                        console.log("enter",window.event.keyCode)
                        if(window.event.keyCode == 13){
                        var msg = document.getElementById("msg");
                        message = $("#msg").val();
                        console.log(username1 + ":" + msg.value);
                        stomp.send('/pub/chat/message', {}, JSON.stringify({room_num: roomId, message: msg.value, writer: username1}));
                        sendMessage(roomId,msg.value,id1);
                        msg.value = '';
                        }
                    }        
                    
                    function sendMessage(roomId,msg,username){
                        fetch("/chat/sendMsg",{
                            method : "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body : JSON.stringify({
                                employee_num : username,
                                msg_contents : msg,
                                room_num : roomId
                            })
                        }).then(res=>res.json())
                        .then(res=>{

                        })
                    }

                    window.onresize = function(){
                        window.resizeTo(400,665)
                    }
