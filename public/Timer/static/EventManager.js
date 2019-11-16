function EventManagerObject (p_sys) {
    this.System = p_sys;
    this.Interval = 0;
    this.evTime = 0;
    this.Updated = true;
    this.CurrentEvent = undefined;
    this.OldEvent = undefined;
    //Handle Flash (for colons)
    this.OnFlash = function (p_Time, p_FlashState) {};
    this.FlashFreq = 50;
    this.FlashCur = 0;
    this.FlashState = true;
    //Handle Ticks (Updating time displays)
    this.OnTick = function (p_TimeCurrent, p_TimeRemaining, p_Event) {};
    this.TickFreq = 100;
    this.TickCur = 0;
    //Handle Notices (Displaying the starts and ends of events)
    this.OnNotice = function(p_Event) {};
    this.OnNoticeClose = function (p_Event) {};
    this.NoticeWait = 5000;
    this.isNotice = false;
}

EventManagerObject.prototype.TimeRemaining = function () {
    return this.evTime - this.System.GetCurrentTime();
}

EventManagerObject.prototype.Process = function () {
    miltime = this.System.GetMiliTime() / 10;
    var man = this;
    if(this.TickCur++ >= miltime % this.TickFreq) {
        this.TickCur = 0;
        setTimeout(function() {
            man.OnTick(man.System.GetCurrentTime(), man.TimeRemaining(), man.CurrentEvent);
        }, 0);
    }
    if(this.FlashCur++ >= miltime % this.FlashFreq) {
        this.FlashCur = 0;
        setTimeout(function() {
            man.OnFlash(man.System.GetCurrentTime(), man.FlashState);
            man.FlashState = ! man.FlashState;
        }, 0);
    }
    if(this.TimeRemaining() <= 0) {
        this.OldEvent = this.CurrentEvent;
        if(this.OldEvent != undefined && !this.isNotice) {
            this.isNotice = true;
            setTimeout(function() {
                man.OnNotice(man.OldEvent);
            }, 0);
            setTimeout( function() {
                this.isNotice = false;
                this.OnNoticeClose(this.CurrentEvent);
            }.bind(this), this.NoticeWait);
        }
        this.CurrentEvent = this.System.GetNextEvent();
        if(this.CurrentEvent != undefined)
            this.evTime = this.CurrentEvent.Time;
        else
            this.evTime = 0;
    }
    sysevent = this.System.GetNextEvent();
    if(sysevent != undefined && sysevent.Time < this.evTime) {
        this.CurrentEvent = sysevent;
        this.evTime = this.CurrentEvent.Time;
    }
}

EventManagerObject.prototype.Start = function () {
    var man = this;
    this.Interval = setInterval(function () {
        man.Process();
    }, 10);
}

EventManagerObject.prototype.Stop = function () {
    clearInterval(this.Interval);
}
