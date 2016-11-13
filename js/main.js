/**
 * Created by dyy on 2016/11/10.
 */
var newDate = new Date();
var myDate = new Date($("#birth").val());

function ha1() {
    $("#ha").animate({bottom:'-50px'});
    setInterval("ha2();", 2000);
}
function ha2() {
    $("#ha").animate({bottom:'-100px'});
    setInterval("ha1();", 10000);
}

$(document).ready(function () {
    canvas();
    ha2();
});
$("#birth").keyup(function () {//输入框改变事件
    Clear_canvas();
    canvas();
});

function Clear_canvas() {
    var canvas = document.getElementById("myLife");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(1, 1, 298, 298);
}
setInterval("life();", 100);

function life() {
    var newDate = new Date();
    var myDate = new Date($("#birth").val());
    newDate = newDate.getTime();//现在的时间
    myDate = myDate.getTime()//我的时间
    var sum = newDate - myDate;
    var live = sum / 2366820000000;
    remain = live * 100;
    remain = remain.toFixed(10);
    //alert(remain);
    $("#left").text(remain);
    $("#s1").text((sum / 1000).toFixed(1));
    $("#s2").text(((2366820000000 / 1000) - (sum / 1000)).toFixed(1));
    var day = parseInt(sum / 1000 / 60 / 60 / 24);
    var year = parseInt(day/365);
    var m = day % 365;
    var month = parseInt(m / 30);
    var schedule = (year * 12) + month;
    return schedule;

}
function canvas() {
    //获取上下文
    var canvas = document.getElementById("myLife");
    var ctx = canvas.getContext("2d");
    //描绘边框
    var grid_cols = 30;
    var grid_rows = 30;
    var cell_height = canvas.height / grid_rows;
    var cell_width = canvas.width / grid_cols;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#333333";
    //结束边框描绘
    ctx.beginPath();
    //画背景

    //画线
    for (var col = 0; col <= grid_cols; col++) {
        var x = col * cell_width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        for (var row = 0; row <= grid_rows; row++) {
            var y = row * cell_height;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
    }
    //画格子
    var index = 1;
    for (var row = 0; row < grid_rows; row++) {
        for (var col = 0; col < grid_cols; col++) {
            x = (300 / grid_cols) * col;
            y = (300 / grid_rows) * row;
            ctx.strokeStyle = "#333333";
            if (index > life()) {
                // ctx.rect(x, y, 10, 10);
            }
            else {
                ctx.fillStyle = "red";
                ctx.fillRect(x, y, 10, 10);
            }
            index++;
        }
    }
    //完成描绘
    ctx.stroke();
}
