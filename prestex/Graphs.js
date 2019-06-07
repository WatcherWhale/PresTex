class Graph
{
    constructor(expression)
    {
        this.SetExpression(expression);
        this.color = "black";
        this.thickness = 2;
        this.visible = true;
        this.interval = ["R"];
        this.scaled = [true,true];
    }

    SetExpression(expression)
    {
        this.expression = expression;
        this._expression = math.compile(this.expression);
    }
}

class FunctionGraph extends Graph
{
    constructor(expression)
    {
        super(expression);
    }

    GetCoordinates(t)
    {
        return [t,this._expression.eval({x:t})];
    }
}

class PolarGraph extends Graph
{
    constructor(expression)
    {
        super(expression);
    }

    GetCoordinates(t)
    {
        var r = this._expression.eval({t:t});
        
        var x = math.eval("r*cos(t)",{r:r,t:t});
        var y = math.eval("r*sin(t)",{r:r,t:t});

        return [x,y];
    }
}

class ParameterGraph extends Graph
{
    constructor(expression)
    {
        this.color = "rgb(128,128,128)";
        this.thickness = 2;
        this.visible = true;
        this.interval = ["R"];
        this.scaled = [true,true];

        this.SetExpression(expression);
    }

    GetCoordinates(t)
    {        
        var x = this._expression[0].eval({t:t});
        var y = this._expression[1].eval({t:t});

        return [x,y];
    }

    SetExpression(expression)
    {
        this.expression = expression.split(';');
        this._expression = [];

        for(var i = 0; i < this.expression.length; i++)
        {
            this._expression.push(math.compile(this.expression[i]));
        }
    }
}

