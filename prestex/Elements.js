class Element
{
    constructor(id,x,y)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this._s = 1;
    }

    Render(offset)
    {
        this._s = offset.s;

        var x = this.x*this._s;
        var y = this.y*this._s;

        var style = "position:absolute;left:" + x + "px;top:"+y+"px;";
        $("div.body").append("<div class='object' id='" + this.id + "' style='" + style + "'></div>");
    }

    Create(offset)
    {
        //TODO: Create div if it doesn't exist
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
    }

    Render(offset)
    {
        super.Render(offset);

        if(this.bold != "true" && this.bold != "false") this.bold = "false";

        $("div.body #" + this.id).append("<span>" + this.text + "</span>");

        var bold = this.bold == "true" ? "bold" : "normal";
        var style = {"font-size":this.fontSize*this._s + "px", "font-weight":bold};

        $("div.body #" + this.id).css(style);
    }
}

class LatexElement extends TextElement
{
    constructor(id,x,y,text)
    {
        super(id,x,y,text);
        delete this.bold;
    }

    Render(offset)
    {
        super.Render(offset);
        delete this.bold;

        katex.render(this.text, $("div.body #" + this.id)[0], {
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

        var h = offset.s*this.h;
        var w = offset.s*this.w;

        $("div.body #" + this.id).append("<canvas height='" + h + "' width='" + w + "'></canvas>");
    }
}

class Func extends CanvasElement
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
    }

    Render(offset)
    {
        super.Render(offset);

        if(this.showAxes != "false" && this.showAxes != "true") this.showAxes = "true";

        this.BuildExpression();
        this.SetOrigin();

        let canvas = $("div.body #" + this.id + " canvas")[0];
        let ctx = canvas.getContext("2d");

        this.Graph(ctx,"rgb(128,128,128)",2);
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

    //TODO: Add graphpaper
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};