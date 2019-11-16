function EventObject (p_Name, p_Time, p_Message, p_Description) {
    this.Name = p_Name;
    this.Time = p_Time;
    this.Message = p_Message;
    this.Description = p_Description;
}

function ScheduleObject (p_Name, p_Display, p_Description, p_EventList) {
    if(p_EventList === undefined) p_EventList = [];
    this.Name = p_Name;
    this.DisplayName = p_Display;
    this.Description = p_Description;
    this.Events = [];
    this.EventMap = [];
    this.WDays = 0;
    this.Dates = [];
    this.Reason = 0;
}

ScheduleObject.prototype.AddEvent = function (p_Event) {
    this.Events.push(p_Event);
    this.Events.sort(function(a,b) {
        return a.Time - b.Time;
    });
}

ScheduleObject.prototype.RemoveEvent = function (p_Event) {
    delete this.Events[this.Events.findIndex(function(a) {
        return a == p_Event;
    })];
    this.Events.sort(function(a,b) {
        return a.Time > b.Time;
    });
}

ScheduleObject.prototype.GetNextEvent = function (p_TimeOfDay) {
    var Event = null;
    try {
        Event = this.Events.find(function( ev ) {
            if(ev == undefined) return false;
            return ev.Time >= p_TimeOfDay;
        });
    } catch(error) {
        this.Events.forEach(function(ev) {
            if(ev.Time >= p_TimeOfDay && Event === null) Event = ev;
        });
    }
    return Event;
}

function SystemObject (p_Name, p_Path, p_Description, p_Timezone) {
    this.Name = p_Name;
    this.Path = p_Path;
    this.Description = p_Description;
    this.TimeZone = p_Timezone;
    this.Schedules = [];
    this.TimeOffset = 0;
}

SystemObject.prototype.AddSchedule = function (p_Schedule) {
    this.Schedules.push(p_Schedule);
}

SystemObject.prototype.GetNextSchedule = function () {
    CurrentDate = new Date();
    CurrentDate.setTime(CurrentDate.getTime() + this.TimeZone * 60 * 60 * 1000);
    WDayMask = 1 << CurrentDate.getUTCDay();
    DateNum = CurrentDate.getUTCDate() + 100 * (CurrentDate.getUTCMonth() + 100 * (CurrentDate.getUTCFullYear() - 1900));
    for (ScheduleN in this.Schedules) { Schedule = this.Schedules[ScheduleN];
        if(Schedule.Reason == 0
            || ( Schedule.Reason == 1 && Schedule.WDays & WDayMask )
            || ( Schedule.Reason == 2 && Schedule.Dates.indexOf(DateNum) >= 0) )
                return Schedule;
    }
    return new ScheduleObject("NONE", "NONE", "NONE");
}

SystemObject.prototype.GetMiliTime = function () {
    CurrentDate = new Date();
    CurrentDate.setTime(CurrentDate.getTime() + this.TimeZone * 60 * 60 * 1000 + this.TimeOffset * 1000);
    return CurrentDate.getTime() % 1000;
}

SystemObject.prototype.GetCurrentTime = function () {
    CurrentDate = new Date();
    CurrentDate.setTime(CurrentDate.getTime() + this.TimeZone * 60 * 60 * 1000 + this.TimeOffset * 1000);
    return CurrentDate.getUTCSeconds() + 60 * (CurrentDate.getUTCMinutes() + 60 * CurrentDate.getUTCHours());
}

SystemObject.prototype.GetNextEvent = function () {
    return this.GetNextSchedule().GetNextEvent(this.GetCurrentTime());
}

SystemObject.prototype.UpdateOffset = function (p_TimeNum) {
    this.TimeOffset = 0;
    this.TimeOffset = p_TimeNum - this.GetCurrentTime();
}


function hrTime(TimeNum, pad) {
    if(pad === undefined) pad = false;
    out = "";
    s = TimeNum % 60;
    TimeNum = (TimeNum - s) / 60;
    m = TimeNum % 60;
    TimeNum = (TimeNum - m) / 60;
    out = (TimeNum < 10 && pad? "0" : "") + TimeNum + ':' + (m < 10 ? "0" : "") + m + ':' + (s < 10 ? "0" : "") + s;
    return out;
}