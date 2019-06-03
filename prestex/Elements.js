class Element
{
    constructor(id,x,y)
    {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    Render(offset)
    {
        var x = this.x*offset.s;
        var y = this.y*offset.s;

        var style = "position:absolute;left:" + x + "px;top:"+y+"px;";
        $("div.body").append("<div class='object' id='" + this.id + "' style='" + style + "'></div>");
    }
}

class TextElement extends Element
{
    constructor(id,x,y,text)
    {
        super(id,x,y);
        this.text = text;
    }

    Render(offset)
    {
        super.Render(offset);
        $("div.body #" + this.id).append("<span>" + this.text + "</span>");
    }
}

class LatexElement extends Element
{
    constructor(id,x,y,text)
    {
        super(id,x,y);
        this.text = text;
    }

    Render(offset)
    {
        super.Render(offset);
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
        this._func = this.BuildExpression(expression);
        this.func = expression;
        this.scale = 100;
    }

    Render(offset)
    {
        super.Render(offset);

        this._func = this.BuildExpression(this.func);

        let canvas = $("div.body #" + this.id + " canvas")[0];
        let ctx = canvas.getContext("2d");

        var axes = {};
        axes.x0 = .5 + .5*canvas.width;
        axes.y0 = .5 + .5*canvas.height;
        axes.doNegativeX = true;
        axes.scale = offset.s*this.scale;

        this.Graph(ctx,axes,"rgb(128,128,128)",2);
    }

    ShowAxes(ctx,axes) 
    {
        var x0 = axes.x0, w = ctx.canvas.width;
        var y0 = axes.y0, h = ctx.canvas.height;
        var xmin = axes.doNegativeX ? 0 : x0;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)"; 
        ctx.moveTo(xmin,y0);
        ctx.lineTo(w,y0);
        ctx.moveTo(x0,0);
        ctx.lineTo(x0,h);
        ctx.stroke();
    }

    Graph(ctx,axes,color,thick)
    {
        this.ShowAxes(ctx,axes);

        var xx, yy, dx=0.1, x0=axes.x0, y0=axes.y0, scale=axes.scale;
        var iMax = Math.round((ctx.canvas.width-x0)/dx);
        var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        for (var i=iMin;i<=iMax;i++) {
        xx = dx*i; yy = scale*this._func.eval({x:xx/scale});
        if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
        else         ctx.lineTo(x0+xx,y0-yy);
        }
        ctx.stroke();
    }

    BuildExpression(str)
    {
        var f = math.compile(str);
        return f;
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};