$(document).keypress(function(e) {
    if(e.which == 13) {
        verifyUser();
    }
});
function verifyUser() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username && password) {
        var params = "username=" + username + "&password=" + password;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {

                var jsonResponse = JSON.parse(xhttp.responseText);
                var token = jsonResponse.token;
                var username = document.getElementById("username").value;
                var role = document.getElementById("role").value;

                if (token) {
					localStorage.setItem('access-token',token);
					localStorage.setItem('username',username);
                    verifyUserRole(username, token, role);
					
                } else {
                    alert(jsonResponse.message);

                }
            }
        };
        xhttp.open("POST", "https://www.cyient-fiops.com/XCELAPIGateway/security", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);

    } else {

        verifyFailed();

    }

}
function verifyUserRole(username, token, role) {
    var keyrole;
    if (role == 'PHD') {
        role = 'Reports';
        keyrole = 'PHD';
    } 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            var jsonResponse = JSON.parse(xhttp.responseText);
            var userRoles = jsonResponse;
            var ValidUser = false;
            if (userRoles) {
                for (var i = 0; i < userRoles.length; i++) {
                    if (userRoles[i].cn === role || userRoles[i].cn === 'MapView') {
                        for (var j = 0; j < userRoles[i].members.length; j++) {
                            var string = (userRoles[i].members[j].member).toLowerCase();
                            var nestedstring = "uid=" + username.toLowerCase();
                            if (string.indexOf(nestedstring) !== -1) {
                                ValidUser = true;
                                if (keyrole == 'PHD'){
                                     proceedSmartManage(username, token, keyrole);                                    
                                } else {
                                     proceedSmartManage(username, token, role);
                                }
                                // proceedSmartManage(username, token, role);
                            }

                        }
                    }
                }
                if (!ValidUser) {
                    alert("Not A Valid User");
                }
            } else {
                alert(jsonResponse.message);

            }
        }
    };
    xhttp.open("GET", "https://www.cyient-fiops.com/XCELAPIGateway/Roles/?ACTION=GetRoles", true);
    xhttp.send();

    // var xhttpAgs = new XMLHttpRequest();

    // var paramsAgs = "username=siteadmin&password=Info9tech&f=json&client=HTTP referer&referer=https://www.cyient-fiops.com/smartmanage&expiration=100" ;    

    // xhttpAgs.onreadystatechange = function() {
    // if(xhttpAgs.readyState == 4 && xhttpAgs.status == 200) {           
    // var res = xhttpAgs.responseText;
    // var a = res.split(',');
    // var b = a[0].split(':');
    // var c = b[1].replace(/"/g,"");
    // token = c;
    // sessionStorage.setItem("token", token);
    // proceedSmartManage(username, token, role);
    // alert(xhttpAgs.responseText);
    // }
    // };
    // xhttpAgs.open("POST", "https://framework-dev.cyient-fiops.com/server/tokens/generateToken", true);	 
    // xhttpAgs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttpAgs.send(paramsAgs);                      

}


function verifyFailed() {

    alert("Missing Username or Password");

}

function proceedSmartManage(username, token, role) {

    turnOffLogin("LoginPage");
    var iframe = document.createElement('iframe');
    if (role == "boa") {
        var SelectedRole = "BOA";
        iframe.src = "/XCEL_PROD/SmartManage_Home/index.html?config=" + SelectedRole + ".json&user=" + username + "&SMToken=" + token;
    }
    else if (role == "boe") {
        var SelectedRole = "BOE";
        iframe.src = "/XCEL_PROD/SmartManage_Home/index.html?config=" + SelectedRole + ".json&user=" + username + "&SMToken=" + token;

    }
    else if (role == 'Reports') {
        iframe.src = "/XCEL_PROD/SmartManage/Dashboard/";
    }
    else if (role == 'PHD') {
        iframe.src = "/XCEL_PROD/PhaseComparison/index.html?user=" + username + "&SMToken=" + token;
    } else if (role == "ca") {
        var SelectedRole = "CA";
        iframe.src = "/XCEL_PROD/SmartManage_Home/index.html?config=" + SelectedRole + ".json&user=" + username + "&SMToken=" + token;
    }
    else if (role == "ce") {
        var SelectedRole = "CE";
        iframe.src = "/XCEL_PROD/SmartManage_Home/index.html?config=" + SelectedRole + ".json&user=" + username + "&SMToken=" + token;
    }


    sessionStorage.setItem("loginuserrole", SelectedRole);
    sessionStorage.setItem("loginUser", username);


    iframe.height = "100%";
    iframe.width = "100%";
    iframe.style.position = "absolute";
    iframe.style.border = "none";

    document.body.appendChild(iframe);
}

function turnOffLogin(id) {
    var e = document.getElementById(id);
    e.style.zIndex = "-1";
    e.style.display = 'none';

}