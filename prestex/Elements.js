class Element
{
    constructor(id,x,y)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.hide = "false";

        this._s = 1;
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
            return false;
        }

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

//TODO: Convert to graph element
class GraphElement extends CanvasElement
{
    constructor(id,x,y,w,h,expression)
    {
        super(id,x,y,w,h);

        this.func = expression;
        this._func = null;
        this.BuildExpression();

        this.scale = 100;
        this.precision = 0.1;

        this.showAxes = "true";
        this.origin = "middle"; //Possible values: middle;bottom; x,y
        this._origin = {x:0,y:0};
        this.SetOrigin();

        this.color = "rgb(128,128,128)";
        this.thickness = 2;
    }

    Render(offset)
    {
        super.Render(offset);

        if(this.showAxes != "false" && this.showAxes != "true") this.showAxes = "true";

        this.BuildExpression();
        this.SetOrigin();

        this.Graph(this._ctx,this.color,this.thickness);
    }

    DrawAxes(ctx) 
    {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)"; 
        ctx.strokeWidth = 2;

        //X-Axis
        ctx.moveTo(0,this._origin.y);
        ctx.lineTo(ctx.canvas.width,this._origin.y);

        //Y-Axis
        ctx.moveTo(this._origin.x,0);
        ctx.lineTo(this._origin.x,this.h * this._s);

        ctx.stroke();
    }

    DrawGraphLines(ctx) 
    {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(230,230,230)";

        //X Lines
        var h = this.h * this._s;
        var w = this.w * this._s;
        var step = this.scale * this._s;

        var offsetX = this._origin.x % step;
        var offsetY = this._origin.y % step;

        for(var y = offsetY; y <= h; y += step)
        {
            ctx.moveTo(0,y);
            ctx.lineTo(ctx.canvas.width,y);
        }

        //Y Lines
        for(var x = offsetX; x <= w; x += step)
        {
            ctx.moveTo(x,0)
            ctx.lineTo(x,this.h * this._s);
        }

        ctx.stroke();
    }

    Graph(ctx,color,thick)
    {
        ctx.clearRect(0,0,this.w * this._s,this.h * this._s);
        this.DrawGraphLines(ctx);
        if(this.showAxes != "false") this.DrawAxes(ctx);

        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        var startX = -this._origin.x;
        var endI = (ctx.canvas.width)/this.precision;
        var startI = Math.round(startX/this.precision);

        var startY = this.scale * this._s * this._func.eval({x:startX/(this.scale * this._s)});
        ctx.moveTo(this._origin.x + startX, this._origin.y - startY);

        for(let i = startI + 1; i <= endI; i++)
        {
            var x = i*this.precision;
            var y = this.scale * this._s * this._func.eval({x:x/(this.scale * this._s)});

            ctx.lineTo(this._origin.x + x,this._origin.y - y);
        }

        ctx.stroke();        
    }

    BuildExpression()
    {
        this._func = math.compile(this.func);
    }

    SetOrigin()
    {
        if(this.origin.toLowerCase() == "middle")
        {
            this._origin.x = this.w/2;
            this._origin.y = this.h/2;
        }
        else if (this.origin.toLowerCase() == "bottom")
        {
            this._origin.x = 0;
            this._origin.y = this.h;
        }
        else
        {
            this._origin.x = this.origin.split(',')[0];
            this._origin.y = this.origin.split(',')[1];
        }

        this._origin.x *= this._s;
        this._origin.y  *= this._s;
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
        this._data = JSON.parse(this.data);

        this._chart = new Chart(this._ctx, {
            type: 'bar',
            data: this._data,
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