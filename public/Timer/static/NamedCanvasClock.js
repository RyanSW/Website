function NamedCanvasClock(p_ClockDiv, p_Height, p_Width, p_LocX, p_LocY, p_TitleRatio, p_Title, p_Font, p_CForeground, p_CBackground, p_CColon, p_Time, p_WUnits, p_HUnits) {
    if(p_Title === undefined) p_Title = "Clock Title";
    if(p_Font === undefined) p_Font = "Monospace";
    if(p_CForeground === undefined) p_CForeground = "#000000";
    if(p_CBackground === undefined) p_CBackground = "#ffffff";
    if(p_CColon === undefined) p_CColon = "#aaaaaa";
    if(p_Time === undefined) p_Time = 0;
    if(p_HUnits === undefined) p_HUnits = "vh";
    if(p_WUnits === undefined) p_WUnits = "vw";
    this.Container = p_ClockDiv;
    this.ClockContainer = this.Container.getElementsByClassName("ClockTime")[0];
    this.Clock = this.ClockContainer.getElementsByClassName("CanvasClock")[0];
    this.TitleContainer = this.Container.getElementsByClassName("ClockTitle")[0];
    this.TitleCanvas = this.TitleContainer.getElementsByClassName("ClockTitleDisplay")[0];
    this.TitleContext = this.TitleCanvas.getContext("2d");
    this.Height = p_Height;
    this.Width = p_Width;
    this.Location = [p_LocX, p_LocY];
    this.Ratio = p_TitleRatio;
    this.WidthUnits = p_WUnits;
    this.HeightUnits = p_HUnits;
    this.Title = p_Title;
    this.Font = p_Font;
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.CanvasClock = new CanvasClock(this.Clock, this.ClockContainer, this.Font, this.ForegroundColor, this.BackgroundColor, p_CColon, p_Time);
    this.UpdateSizes();
    this.Container.addEventListener("resize", this.UpdateSizes.bind(this));
    window.addEventListener("resize", this.UpdateSizes.bind(this));
}

NamedCanvasClock.prototype.UpdateSizes = function() {
    this.Container.style.left = this.Location[0] + this.WidthUnits;
    this.Container.style.top = this.Location[1] + this.HeightUnits;
    this.Container.style.width = this.Width + this.WidthUnits;
    this.Container.style.height = this.Height + this.HeightUnits;
    TitleHeight = this.Height * this.Ratio;
    ClockHeight = this.Height - TitleHeight;
    this.TitleContainer.style.height = TitleHeight + this.HeightUnits;
    this.ClockContainer.style.height = ClockHeight + this.HeightUnits;
    this.TitleCanvas.width = this.TitleContainer.clientWidth;
    this.TitleCanvas.height = this.TitleContainer.clientHeight;
    this.TitleCanvas.style.width = this.TitleContainer.clientWidth +"px";
    this.TitleCanvas.style.height = this.TitleContainer.clientHeight +"px";
    this.CanvasClock.UpdateSizes();
    this.UpdateDisplay();
}

NamedCanvasClock.prototype.UpdateDisplay = function() {
    this.TitleContext.clearRect(0, 0, this.TitleCanvas.width, this.TitleCanvas.height);
    TextContainerWidth = this.TitleContainer.clientWidth;
    TextContainerHeight = this.TitleContainer.clientHeight;
    textRatio = GetRatio(this.Title, this.Font);
    if(TextContainerWidth / TextContainerHeight > textRatio) {
        this.TitleContext.font =  Math.floor(TextContainerHeight * 72 / 96) + "pt " + this.Font;
    } else {
        this.TitleContext.font =  Math.floor(TextContainerWidth / textRatio * 72 / 96) + "pt " + this.Font;
    }
    this.TitleContext.textBaseline = "bottom";
    this.TitleContext.textAlign = "center";
    this.TitleContext.fillStyle = this.ForegroundColor;
    this.TitleContext.fillText(this.Title, TextContainerWidth / 2, TextContainerHeight);
    this.CanvasClock.UpdateDisplay();
}

NamedCanvasClock.prototype.UpdateTitle = function(p_Title) {
    if(this.Title == p_Title) return;
    this.Title = p_Title;
    this.UpdateDisplay();
}

NamedCanvasClock.prototype.UpdateTime = function(p_Time, p_ColonFlash) {
    this.CanvasClock.UpdateTime(p_Time, p_ColonFlash);
}

NamedCanvasClock.prototype.UpdateColors = function(p_CForeground, p_CBackground, p_CColon) {
    this.CanvasClock.UpdateColors(p_CForeground, p_CBackground, p_CColon);
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.Container.style.backgroundColor = this.BackgroundColor;
    this.UpdateDisplay();
}

NamedCanvasClock.prototype.UpdateFont = function(p_Font) {
    this.CanvasClock.UpdateFont(p_Font);
    this.Font = p_Font;
    this.UpdateDisplay();
}

NamedCanvasClock.prototype.UpdateDisplayParts = function(p_Hours, p_Minutes, p_Seconds) {
    this.CanvasClock.UpdateDisplayParts(p_Hours, p_Minutes, p_Seconds);
}

NamedCanvasClock.prototype.UpdateLocation = function(p_Height, p_Width, p_LocX, p_LocY, p_TitleRatio) {
    if(p_TitleRatio !== undefined) this.Ratio = p_TitleRatio;
    this.Height = p_Height;
    this.Width = p_Width;
    this.Location = [p_LocX, p_LocY];
    this.UpdateSizes();
}

NamedCanvasClock.prototype.Show = function (p_Show) {
    this.Container.style.display = (p_Show ? "block" : "none");
    this.UpdateSizes();
}