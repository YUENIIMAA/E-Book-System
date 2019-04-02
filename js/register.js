function checkPasswd() {
    if (document.getElementById("usrName").value == "") {
        alert("用户名禁止为空！");
        return;
    }
    if (document.getElementById("passwd").value == "") {
        alert("密码禁止为空！");
        return;
    }
    if (document.getElementById("passwd").value != document.getElementById("2ndpasswd").value) {
        alert("两次输入的密码不一致！");
        return;
    }
    alert("亲爱的" + document.getElementById("usrName").value + "您好\n" + "您已成功注册\n" + "请记住您的密码：" + document.getElementById("passwd").value);
}