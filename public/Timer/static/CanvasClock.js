function CanvasClockDivided (p_ClockDiv, p_Containter, p_Clocks, p_Index) {
    return new CanvasClock(p_ClockDiv, p_Containter, "Monospace", "#000000", "#ffffff", "#aaaaaa", 0, p_Clocks, p_Index);
}

function CanvasClock (p_ClockDiv, p_Containter, p_Font, p_CForeground, p_CBackground, p_CColon, p_Time, p_Clocks, p_Index) {
    if(p_Font === undefined) p_Font = "Monospace";
    if(p_CForeground === undefined) p_CForeground = "#000000";
    if(p_CBackground === undefined) p_CBackground = "#ffffff";
    if(p_CColon === undefined) p_CColon = "#aaaaaa";
    if(p_Time === undefined) p_Time = 0;
    if(p_Clocks === undefined) p_Clocks = 1;
    if(p_Index === undefined) p_Index = 0;
    this.ClockDiv = p_ClockDiv;
    this.ClockDiv.style.display="block";
    this.Container = p_Containter;
    this.Font = p_Font;
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.ColonColor = p_CColon;
    this.Time = p_Time;
    this.ClocksInContainer = p_Clocks;
    this.ClockIndex = p_Index;
    this.CenterData = [];
    this.TimeDispCanvases = [
        [this.ClockDiv.getElementsByClassName("sec2")[0],
         this.ClockDiv.getElementsByClassName("sec1")[0]],
        [this.ClockDiv.getElementsByClassName("min2")[0],
         this.ClockDiv.getElementsByClassName("min1")[0]],
        [this.ClockDiv.getElementsByClassName("hrs2")[0],
         this.ClockDiv.getElementsByClassName("hrs1")[0]],
        [this.ClockDiv.getElementsByClassName("col1")[0],
         this.ClockDiv.getElementsByClassName("col2")[0]]
    ];
    this.TimeDispContexts = [];
    for(disp in this.TimeDispCanvases) {
        parts = [];
        for(part in this.TimeDispCanvases[disp])
            parts.push(this.TimeDispCanvases[disp][part].getContext("2d"));
        this.TimeDispContexts.push(parts);
    }
    this.viewstates = [true, true, true];
    this.cvAmt = 8;
    this.cvWidth = 0;
    this.cvHeight = 0;
    this.marginLeft = 0;
    this.marginTop = 0;
    this.MaxRatio = GetMaxRatio(this.Font);
    this.ColonFlashState = true;
    this.FontSize = 0;
    this.Container.addEventListener("resize", this.UpdateSizes.bind(this));
    window.addEventListener("resize", this.UpdateSizes.bind(this));
    this.UpdateSizes();
    this.AutoHideHours = false;
    this.AutoHideMinutes = false;
}

CanvasClock.prototype.UpdateDisplay = function() {
    var workingtime = this.Time;
    for(i = 0; i<3; i++) {
        partTime = workingtime % 60;
        for (part in this.TimeDispContexts[i]) {
            this.TimeDispContexts[i][part].clearRect(0, 0, this.cvWidth, this.cvHeight);
            this.TimeDispContexts[i][part].fillText(partTime % 10, this.CenterData[partTime % 10], this.cvHeight);
            partTime = Math.floor(partTime / 10);
        }
        workingtime = Math.floor(workingtime / 60);
    }
    for(part in this.TimeDispContexts[3]) {
        this.TimeDispContexts[3][part].clearRect(0, 0, this.cvWidth, this.cvHeight);
        this.TimeDispContexts[3][part].fillStyle = (this.ColonFlashState ? this.ForegroundColor : this.ColonColor);
        this.TimeDispContexts[3][part].fillText(":", this.CenterData[":"], this.cvHeight);
    }
}

CanvasClock.prototype.UpdateSizes = function() {
    ContainerWidth = this.Container.clientWidth / this.cvAmt;;
    ContainerHeight = this.Container.clientHeight / this.ClocksInContainer;
    if(ContainerWidth / ContainerHeight > this.MaxRatio) {
        this.cvHeight = Math.floor(ContainerHeight);
        this.cvWidth = Math.floor(ContainerHeight * this.MaxRatio);
    } else {
        this.cvWidth = Math.floor(ContainerWidth);
        this.cvHeight = Math.floor(ContainerWidth / this.MaxRatio);
    }
    this.ClockDiv.width = this.cvWidth * this.cvAmt;
    this.ClockDiv.style.width = this.cvWidth * this.cvAmt + "px";
    this.ClockDiv.height = this.cvHeight;
    this.ClockDiv.style.height = this.cvHeight + "px";
    
    for(disp in this.TimeDispCanvases)
        for(part in this.TimeDispCanvases[disp]) {
            this.TimeDispCanvases[disp][part].width = this.cvWidth;
            this.TimeDispCanvases[disp][part].height = this.cvHeight;
            this.TimeDispCanvases[disp][part].style.width = this.cvWidth+"px";
            this.TimeDispCanvases[disp][part].style.height = this.cvHeight+"px";
        }
    for(disp in this.TimeDispContexts)
        for(part in this.TimeDispContexts[disp]) {
            this.TimeDispContexts[disp][part].font = Math.floor(this.cvHeight * 72 / 96) + "pt " + this.Font;
            this.TimeDispContexts[disp][part].textBaseline = 'bottom';
            this.TimeDispContexts[disp][part].fillStyle = this.ForegroundColor;
        }
    [0,1,2,3,4,5,6,7,8,9,":"].forEach(function(num) {
        this.CenterData[num] = (this.cvWidth - this.TimeDispContexts[3][1].measureText(num).width) / 2;
    }, this);
    this.marginLeft = (ContainerWidth * this.cvAmt - this.ClockDiv.width) / 2;
    this.marginTop = (ContainerHeight - this.ClockDiv.height) / 2;
    if(this.ClockIndex>0) this.marginTop = 0;
    this.ClockDiv.style.marginLeft = this.marginLeft + "px";
    this.ClockDiv.style.marginTop = this.marginTop + "px";
    this.UpdateDisplay();
}

CanvasClock.prototype.UpdateTime = function(p_Time, p_ColonFlash) {
    if(p_Time >= 0)
        this.Time = p_Time;
    if(p_ColonFlash != undefined) this.ColonFlashState = p_ColonFlash;
    if(this.AutoHideHours) this.UpdateDisplayParts(this.Time > 60 * 60, this.viewstates[1], this.viewstates[2]);
    if(this.AutoHideMinutes) this.UpdateDisplayParts(this.Time > 60, this.Time > 60, this.viewstates[2]);
    this.UpdateDisplay();
}

CanvasClock.prototype.UpdateColors = function(p_CForeground, p_CBackground, p_CColon) {
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.ColonColor = p_CColon;
    this.ClockDiv.style.background = this.BackgroundColor;
    for(i = 0; i < 3; i ++) for (part in this.TimeDispContexts[i]) this.TimeDispContexts[i][part].fillStyle = this.ForegroundColor;
    this.UpdateDisplay();
}

CanvasClock.prototype.UpdateFont = function(p_Font) {
    this.Font = p_Font;
    this.MaxRatio = GetMaxRatio(this.Font);
    this.UpdateSizes();
}

CanvasClock.prototype.UpdateDisplayParts = function(p_Hours, p_Minutes, p_Seconds) {
    if(this.viewstates[0] == p_Hours
    && this.viewstates[1] == p_Minutes
    && this.viewstates[2] == p_Seconds) return;
    this.viewstates[0] = p_Hours;
    this.viewstates[1] = p_Minutes;
    this.viewstates[2] = p_Seconds;
    sum = this.viewstates[0]+this.viewstates[1]+this.viewstates[2];
    switch(sum) {
        case 3: this.cvAmt = 8; break;
        case 2: this.cvAmt = 5; break;
        case 1: this.cvAmt = 2; break;
    }
    for(disp in this.TimeDispCanvases) for(part in this.TimeDispCanvases[disp])  this.TimeDispCanvases[disp][part].style.display = "none";
    if(this.viewstates[0])
        for(part in this.TimeDispCanvases[2]) this.TimeDispCanvases[2][part].style.display="inline";
    if(this.viewstates[0] && this.viewstates[1]) this.TimeDispCanvases[3][0].style.display="inline";
    if(this.viewstates[1])
        for(part in this.TimeDispCanvases[1]) this.TimeDispCanvases[1][part].style.display="inline";
    if(this.viewstates[1] && this.viewstates[2]) this.TimeDispCanvases[3][1].style.display="inline";
    if(this.viewstates[2])
        for(part in this.TimeDispCanvases[0]) this.TimeDispCanvases[0][part].style.display="inline";
    this.UpdateSizes();
}

//Handling Ratios

var RatioCanvasContext = document.createElement("canvas").getContext("2d");
function GetRatio (p_TestChar, p_Font) {
    RatioCanvasContext.font = "360pt " + p_Font;
    return RatioCanvasContext.measureText(p_TestChar).width / 480;
}

function GetMaxRatio (p_Font) {
    Ratios = [];
    for(i = 0; i < 10; i++) {
        Ratios[String(i)] = GetRatio(i, p_Font);
    }
    Ratios[":"] = GetRatio(":", p_Font);
    mx = 0;
    for(n in Ratios) if (Ratios[n] > mx) mx = Ratios[n];
    return mx;
}