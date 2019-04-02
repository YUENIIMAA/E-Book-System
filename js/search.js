function showCover(e, obj) {
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    document.getElementById("preview").style.left = x + 2 + 'px';
    document.getElementById("preview").style.top = y + 2 + 'px';
    document.getElementById("preview").innerHTML = "<img border='0' src=\"../img/Covers/" + obj.innerHTML + ".jpg\">";
    document.getElementById("preview").style.display = "";
    obj.style.background = "#6495ED";
    obj.style.color = "#FFFFFF";
}
function hideCover(obj) {
    document.getElementById("preview").innerHTML = "";
    document.getElementById("preview").style.display = "none";
    obj.style.background = "#F5F5F5";
    obj.style.color = "#000000";
}