function CDTextFlash (p_ClockName, p_State) {
    Array.from(
    document.getElementById(p_ClockName).getElementsByClassName("colon")
    ).forEach(function(p_Elm) {
        p_Elm.classList.toggle("flashed");
    })
}

function CDTextUpdate (p_ClockName, p_Time) {
    clock = document.getElementById(p_ClockName);
    TimeNum = p_Time;
    s = TimeNum % 60;
    TimeNum = (TimeNum - s) / 60;
    m = TimeNum % 60;
    h = (TimeNum - m) / 60;
    clock.getElementsByClassName("hours")[0].innerHTML =   (h < 10 ? "0" : "") + h;
    clock.getElementsByClassName("minutes")[0].innerHTML = (m < 10 ? "0" : "") + m;
    clock.getElementsByClassName("seconds")[0].innerHTML = (s < 10 ? "0" : "") + s;
}