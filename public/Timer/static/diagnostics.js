//Data.json

var data_jsonSys;
function MakeCell(Row, Content, Span) {
    Col = Row.insertCell(-1);
    Col.innerHTML = Content;
    Col.rowSpan = Span;
}
function ProcessDataJson(sys) {
    data_jsonSys = sys;
    document.getElementById("json_Name").innerHTML = sys.Name;
    document.getElementById("json_Description").innerHTML = sys.Description;
    document.getElementById("json_Path").innerHTML = sys.Path;
    document.getElementById("json_Timezone").innerHTML = sys.TimeZone;
    document.getElementById("json_SchedulesAmt").innerHTML = sys.Schedules.length;
    schedules_json = document.getElementById("DataSchedules");
    schedRow = schedules_json.insertRow(-1);
    for (scheduleN in sys.Schedules) { schedule = sys.Schedules[scheduleN];
        evLen = schedule.Events.length;
        MakeCell(schedRow, schedule.Name, evLen);
        MakeCell(schedRow, schedule.Description, evLen);
        MakeCell(schedRow, schedule.DisplayName, evLen);
        MakeCell(schedRow, schedule.Reason, evLen);
        MakeCell(schedRow, schedule.WDays, evLen);
        MakeCell(schedRow, schedule.Dates, evLen);
        MakeCell(schedRow, evLen, evLen);
        for (eventN in schedule.Events) { event = schedule.Events[eventN];
            if(event == undefined) continue;
            schedRow.insertCell(-1).innerHTML = event.Name;
            schedRow.insertCell(-1).innerHTML = event.Description;
            schedRow.insertCell(-1).innerHTML = event.Message;
            schedRow.insertCell(-1).innerHTML = event.Time;
            schedRow.insertCell(-1).innerHTML = hrTime(event.Time);
            schedRow = schedules_json.insertRow(-1);
        }
    }
    schedules_json.deleteRow(-1);
    document.getElementById("DataWaitNotice").style.display = "none";
    document.getElementById("DataDisplay").style.display = "block";
    EventClockRefresh();
    EventClockInit();
    EMInitialize();
}



//WebSockets

var WSEventTable;
function WSRecv(message) {
    row = WSEventTable.insertRow(-1);
    row.insertCell(-1).innerHTML="Data Received";
    row.insertCell(-1).innerHTML=message.data;
}
function WSOpen() {
    row = WSEventTable.insertRow(-1);
    row.insertCell(-1).innerHTML="Socket Opened";
    row.insertCell(-1).innerHTML="";
}
function WSClose() {
    row = WSEventTable.insertRow(-1);
    row.insertCell(-1).innerHTML="Socket Closed";
    row.insertCell(-1).innerHTML="";
}



//EventCLockTest

function EventClockInit() {
    document.getElementById("EventClockNotice").style.display = "none";
    document.getElementById("EventClockData").style.display = "block";
}

function EventClockRefresh() {
    EventClockAuto();
    time = data_jsonSys.GetCurrentTime();
    event = data_jsonSys.GetNextEvent();
    document.getElementById("EventClockTime").innerHTML=hrTime(time);
    document.getElementById("EventClockTimeSys").innerHTML=time;
    document.getElementById("EventClockDisplay").innerHTML=data_jsonSys.GetNextSchedule().DisplayName;
    if(event == undefined) {
        document.getElementById("EventClockName").innerHTML="No remaining events";
    } else {
        document.getElementById("EventClockName").innerHTML=event.Name;
        evTime = event.Time;
        document.getElementById("EventClockNext").innerHTML=hrTime(evTime);
        document.getElementById("EventClockNextSys").innerHTML=evTime;
        count = evTime - time;
        document.getElementById("EventClockCount").innerHTML=hrTime(count);
        document.getElementById("EventClockCountSys").innerHTML=count;
        
    }
}

var interval;
var updated;

function EventClockAuto() {
    if(updated != document.getElementById("EventClockAutoCount").checked){
        updated = document.getElementById("EventClockAutoCount").checked;
        if(updated)
        interval = setInterval(EventClockRefresh, 500);
        else
        clearInterval(interval);
    }
}



//Event Manager
var manager;
var EMLog;
var EMLogHolder;

function EMLogMessage(p_Message) { return;
    EMLog.innerHTML+="\n" + p_Message;
    EMLogHolder.scrollTop = EMLogHolder.scrollHeight;
}

function EMFlash(p_Time, p_FlashState) {
    EMLogMessage("Flash - " + p_Time + " - " + p_FlashState);
    document.getElementById("EventManagerColon").style.fontWeight = 
        (p_FlashState ? "bold" : "");
    ["CurrentTime", "EventTime", "CountTime", "DisplaySettingsTestClock1", "DisplaySettingsTestClock2"].forEach(function(n) {
        if(typeof(n) != null)
            CDTextFlash(n, p_FlashState);
    });
    CanvasClockCurrent.UpdateTime(p_Time, !p_FlashState);
    CanvasClockCount.UpdateTime(CanvasClockCount.Time, !p_FlashState);
}

function EMTick(p_Time, p_TimeRemaining, p_Event) {
    log = "Tick - " + p_Time + " - " + p_TimeRemaining + " - ";
    if(p_Event == undefined)
        log += "No more events";
    else
        log += p_Event.Name;
    EMLogMessage(log);
    var clocks = [["CurrentTime", p_Time],["DisplaySettingsTestClock1", p_Time]];
    if(p_Event != undefined) {
        document.getElementById("EventManagerNextName").innerHTML = p_Event.Name;
        document.getElementById("EventManagerTimeNext").innerHTML = hrTime(p_Event.Time);
        document.getElementById("EventManagerTimeNextSys").innerHTML = p_Event.Time;
        document.getElementById("EventManagerNextTime").innerHTML = hrTime(p_TimeRemaining);
        document.getElementById("EventManagerNextTimeSys").innerHTML = p_TimeRemaining;
        clocks.push(["EventTime", p_Event.Time]);
        clocks.push(["CountTime", p_TimeRemaining]);
        clocks.push(["DisplaySettingsTestClock2", p_TimeRemaining]);
        CanvasClockCount.UpdateTime(p_TimeRemaining);
    }
    document.getElementById("EventManagerCurrentTime").innerHTML = hrTime(p_Time);
    document.getElementById("EventManagerCurrentTimeSys").innerHTML = p_Time;
    document.getElementById("EventManagerDayType").innerHTML = manager.System.GetNextSchedule().DisplayName;
    clocks.forEach(function(n) {
         CDTextUpdate(n[0], n[1]);
     })
     CanvasClockCurrent.UpdateTime(p_Time);
    
}

function EMNotice(p_Event) {
    EMLogMessage("Notice - " + p_Event.Name + " - " + p_Event.Message);
}

function EMNoticeClose(p_Event) {
    EMLogMessage("Notice Closed - " + p_Event.Name + " - " + p_Event.Message);
}

function EMInitialize() {
    EMLog = document.getElementById("EventManagerLog");
    EMLogHolder = document.getElementById("EventManagerLogHolder");
    EMLogMessage("Data.json Received");
    manager = new EventManagerObject(data_jsonSys);
    EMLogMessage("Manager constructed");
    manager.OnFlash = EMFlash;
    manager.OnTick = EMTick;
    manager.OnNotice = EMNotice;
    manager.OnNoticeClose = EMNoticeClose;
    EMLogMessage("Event Handlers connected..");
    document.getElementById("EventManagerData").style.display = "block";
    EMLogMessage("Shown Event Manager Data");
    EMStart();
}

function EMStart () {
    EMLogMessage("Starting Manager");
    manager.Start();
}

function EMStop () {
    EMLogMessage("Stopping Manager");
    manager.Stop();
}


//ClockDisplayTest

var CDTFlash = true;

var sheet;
var DSTForeground, DSTBackground, DSTColon;

var styles_json;

function DropDownSelect(container) {
    style = styles_json[document.getElementById("DSTSelection").value];
    DSTForeground.value = style.foreground;
    DSTBackground.value = style.background;
    DSTColon.value = style.colon;
    UpdateDisplaySettings(container);
}

function DropDownInit() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", function() {
        styles_json = JSON.parse(this.responseText);
        selection = document.getElementById("DSTSelection");
        count = 0;
        for (style in styles_json) {
            option = document.createElement("option");
            option.value = count++;
            option.innerHTML = style.name;
            selection.appendChild(option);
        }
    });
    xmlHttp.open("GET", "/static/styles.json");
    xmlHttp.send();
}

function UpdateDisplaySettings(container) {
    sheet.innerHTML = "." + container + "{color:" + DSTForeground.value + ";background-color:"
        + DSTBackground.value + "} ."+container + " .colon.flashed{color:" + DSTColon.value + "}";
}

function InitDisplaySettings() {
    sheet = document.createElement('style');
    document.body.appendChild(sheet);
    DSTForeground = document.getElementById("DSTForeground");
    DSTBackground = document.getElementById("DSTBackground");
    DSTColon = document.getElementById("DSTColon");
    DropDownInit();
}


//Canvas Clock
var CanvasClockCurrent, CanvasClockCount;



//Load All

function doload() {
    GetSystem("/"+path+"/data.json", ProcessDataJson);
    WSEventTable = document.getElementById("WebSocketEvents");
    wspath = "ws"+(window.location.protocol == "https:" ? "s" : "")+"://"+host+"/ws/"+path;
    document.getElementById("WebSocketAddress").innerHTML=wspath;
    var ws = new WebSocket(wspath);
    ws.onopen = WSOpen;
    ws.onclose = WSClose;
    ws.onmessage = WSRecv;
    InitDisplaySettings();
    CanvasClockCurrent = CanvasClockDivided(
        document.getElementById("CanvasClockCurrent"),
        document.getElementById("CanvasTest"),
        2,0
    );
    CanvasClockCount = CanvasClockDivided(
        document.getElementById("CanvasClockCount"),
        document.getElementById("CanvasTest"),
        2,1
    );
    CanvasClockCount.AutoHideHours = true;
}
window.onload = doload;