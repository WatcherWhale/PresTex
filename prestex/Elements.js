class Element
{
    constructor(id,x,y)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.hide = "false";

        this._s = 1;
        this._selector;
    }

    Render(offset)
    {
        this._s = offset.s;
        this.Create(offset); 
        
        var x = this.x*this._s;
        var y = this.y*this._s;        
        var style = {position:"absolute",left:x + "px", top:y + "px"};

        $("div.body div#" + this.id).css(style);

        if(this.hide == "true")
        {
            $("div.body div#" + this.id).hide();
        }
        else
        {
            this.hide = "false";
            $("div.body div#" + this.id).show();
        }
    }

    Create()
    {
        if($("div.body div.object#" + this.id).length == 0)
        {
            $("div.body").append("<div class='object' id='" + this.id + "'></div>");
            this._selector = $("div.body div.object#" + this.id);
            return false;
        }

        this._selector = $("div.body div.object#" + this.id);
        return true;
    }
}

class TextElement extends Element
{
    constructor(id,x,y,text)
    {
        super(id,x,y);
        this.text = text;
        this.fontSize = 20;
        this.bold = "false";
        this.color = "black";
    }

    Render(offset)
    {
        super.Render(offset);
        this.Create();
        
        if(this.bold != "true" && this.bold != "false") this.bold = "false";
        var bold = this.bold == "true" ? "bold" : "normal";
        var style = {"font-size":this.fontSize*this._s + "px", "font-weight":bold,"color":this.color};

        $("div.body #" + this.id).css(style);
        $("div.body #" + this.id + " span.text").html(this.text);
    }

    Create()
    {
        if(!super.Create())
        {
            $("div.body #" + this.id).append("<span class='text'>" + this.text + "</span>");
            return false;
        }

        return true;
    }
}

class LatexElement extends TextElement
{
    constructor(id,x,y,text)
    {
        super(id,x,y,text);
        delete this.bold;
        this.displayMode = "true";
        this.colorIsTextColor = "true";
    }

    Render(offset)
    {
        if(this.displayMode != "false") this.displayMode == "true";
        if(this.colorIsTextColor != "false") this.colorIsTextColor == "true";

        super.Render(offset);
        delete this.bold;

        katex.render(this.text, $("div.body #" + this.id)[0], {
            displayMode: this.displayMode == "true",
            colorIsTextColor: this.colorIsTextColor == "true",
            throwOnError: false
        });
    }
}

class CanvasElement extends Element
{
    constructor(id,x,y,w,h)
    {
        super(id,x,y);

        this.w = w;
        this.h = h;
    }

    Render(offset)
    {
        super.Render(offset);
        this.Create(offset);

        var h = offset.s*this.h;
        var w = offset.s*this.w;

        this._canvas = $("div.body div#" + this.id + " canvas")[0];
        this._ctx = this._canvas.getContext("2d");

        this._canvas.height = h;
        this._canvas.width = w;

        $("div.body div#" + this.id).css({width:w,height:h});
    }

    Create()
    {
        if(!super.Create())
        {
            $("div.body #" + this.id).append("<canvas></canvas>");
            return false;
        }

        return true;
    }
}

//TODO: Options
class ChartElement extends CanvasElement
{
    constructor(id,x,y,w,h)
    {
        super(id,x,y,w,h);
        this.data = "{}";
        this._data = {};
    }

    Render(offset)
    {
        super.Render(offset);
        this._selector.toggleClass("chart",true);
        this._data = JSON.parse(this.data);

        this._chart = new Chart(this._ctx, {
            type: 'bar',
            data: this._data,
            responsive: true,
            scaleFontColor: "#FFFFFF",
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};