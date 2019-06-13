class Graph
{
    /**
     * @param {String} expression A math expression
     */
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

    /**
     * @returns {Color}
     */
    GetColor()
    {
        return Color.FromString(this.color);
    }

    /**
     * Returns the corrosponding carthesioan coordinates.
     * @param {Number} t The value of the t axis
     * @returns {Number[]}
     */
    GetCoordinates(t)
    {
        //Default value
        return [t,t];
    }

    Scale(scale)
    {
        this.SetExpression(scale + "(" + this.expression + ")");
    }

    Add(graph)
    {
        this.SetExpression(this.expression + " + " + graph.expression);
    }

    /**
     * Add two graphs of the same type together,
     * this doesn't work with parameter graphs at the moment.
     * @param {Graph} graph1 The graph to add too
     * @param {Graph} graph2 The graph to add
     * @param {Number} scale1 The scale the first graph needs to be scaled with
     * @param {Number} scale2 The scale the seccond graph needs to be scaled with
     */
    static AddGraphs(graph1,graph2,scale1,scale2)
    {
        //Just return the first graph
        if(typeof(graph1) == typeof(ParameterGraph) || typeof(graph2) == typeof(ParameterGraph)) return graph1;

        //Scale both graphs
        graph1.Scale(scale1);
        graph2.Scale(scale2);

        //Add graph2 to graph1
        graph1.Add(graph2);

        //return the new graph
        return graph1;
    }
}

class FunctionGraph extends Graph
{
    /**
     * @param {String} expression A function expression
     */
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
    /**
     * @param {String} expression A polar expression
     */
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
    /**
     * @param {String} expression A parameter expression, divided with a ';'
     */
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

