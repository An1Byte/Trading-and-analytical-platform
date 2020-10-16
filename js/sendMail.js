let option = 1;
function getValue(num){
    option = num;
}

function sendMail() {
    // event.preventDefault();
    
    let emailLine = $(".email").val();
    if (emailLine != "") {
        if (option == 1) {
            option = "Ask a question";
        } else if (option == 2) {
            option = "Offer cooperation";
        }

        let jsonObj = {
            "select": option,
            "userName": $(".userNameMail").val(),
            "email": emailLine,
            "textArea": $(".textA").val()
        };

        $.ajax({
            type: "POST",
            url: "../php/mail.php",
            data: "jsonObj=" + JSON.stringify(jsonObj),
            success: function () {
                //alert("Сообщение отправлено"); // Конечно это не гарант отправки, а лишь передачи указаний в php.
                messAlert("Message send", 200, 3000);
                $("#btn_04").click();
                $("#btn_04").css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
            },
            error: function () {
                //alert("Сообщение не удалось отправить");
                messAlert("Message failed to send", 200, 3000);
                $("#btn_04").click();
                $("#btn_04").css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
            }
        });
        $(".email").css("background", "darkred");
        $(".email").val("");
    }
    else{
        $(".email").css("background", "red");
    }
}