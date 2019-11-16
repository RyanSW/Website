function ParseFromDataObject (p_Object) {
    System = new SystemObject(p_Object.Name, p_Object.Path, p_Object.Description, p_Object.Timezone);
    for (ScheduleObN in p_Object.Schedules) { ScheduleOb = p_Object.Schedules[ScheduleObN];
        Schedule = new ScheduleObject(ScheduleOb.Name, ScheduleOb.DisplayName, ScheduleOb.Description);
        Schedule.WDays = ScheduleOb.WDays;
        Schedule.Reason = ScheduleOb.Reason;
        for (DateOb in ScheduleOb.Dates) Schedule.Dates.push(ScheduleOb.Dates[DateOb]);
        for (EventObN in ScheduleOb.Events) { EventOb = ScheduleOb.Events[EventObN];
            Event = new EventObject(EventOb.Name, EventOb.Time, EventOb.Message, EventOb.Description);
            Schedule.AddEvent(Event);
        }
        System.AddSchedule(Schedule);
    }
    return System;
}

function GetSystem (p_Path, p_Callback) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", function() {
        p_Callback(ParseFromDataObject(JSON.parse(this.responseText)));
    });
    xmlHttp.open("GET", p_Path);
    xmlHttp.send();
}
