class Plotter
{
    /**
     * Clear the whole canvas
     */
    static ClearCanvas()
    {
        const ctx = Plotter.ctx;
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;

        ctx.clearRect(0,0,w,h);
    }

    /**
     * Plot a graph
     * @param {Graph} graph A graph
     */
    static PlotGraph(graph)
    {
        if(!graph.visible) return;

        const ctx = Plotter.ctx;

        //Get constants
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;

        ctx.beginPath();
        ctx.lineWidth = graph.thickness;
        ctx.strokeStyle = graph.color;

        const startT = graph.interval[0] == "R" ? -Plotter.origin.x * w : graph.interval[0];
        const endI = graph.interval[0] == "R" ? (ctx.canvas.width)/Plotter.precision : graph.interval[1]/Plotter.precision;
        const startI = Math.round(startT/Plotter.precision);

        //Find begin Point
        const start = Plotter.Scale(graph.GetCoordinates(startT/Plotter.scale),Plotter.scale);
        ctx.moveTo(Plotter.origin.x * w + start[0], Plotter.origin.y * h - start[1]);

        for(let i = startI + 1; i <= endI; i++)
        {
            //(x,y) = F(t)
            let coor = [];

            if(graph.scaled[0])
            {
                coor = graph.GetCoordinates(i*Plotter.precision/Plotter.scale);
            }
            else
            {
                coor = graph.GetCoordinates(i*Plotter.precision);
            }
            
            if(graph.scaled[1]) coor = Plotter.Scale(coor,Plotter.scale);

            ctx.lineTo(Plotter.origin.x*w +coor[0],Plotter.origin.y*h - coor[1]);
        }

        ctx.stroke(); 
    }

    /**
     * Draw the axes
     */
    static DrawAxes() 
    {
        if(!Plotter.style.showAxes) return;

        const ctx = Plotter.ctx;

        //Get constants
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;

        //Start path and set styling
        ctx.beginPath();
        ctx.strokeStyle = Plotter.style.axes.color.ToString(); 
        ctx.lineWidth = Plotter.style.axes.thickness;

        //X-Axis
        ctx.moveTo(0,Plotter.origin.y * h);
        ctx.lineTo(w,Plotter.origin.y * h);

        //Y-Axis
        ctx.moveTo(Plotter.origin.x * w,0);
        ctx.lineTo(Plotter.origin.x * w,h);

        ctx.stroke();
    }

    /**
     * Draw graphlines
     */
    static DrawGraphLines() 
    {
        if(!Plotter.style.showGraphLines) return;
        
        const ctx = Plotter.ctx;

        //Calculate constants
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;
        const offsetX = (Plotter.origin.x * w) % Plotter.scale;
        const offsetY = (Plotter.origin.y * h) % Plotter.scale;

        ctx.beginPath();
        ctx.strokeStyle = Plotter.style.lines.color.ToString();
        ctx.lineWidth = Plotter.style.lines.thickness;

        //X Lines
        for(var y = offsetY; y <= h; y += Plotter.scale)
        {
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
        }

        //Y Lines
        for(var x = offsetX; x <= w; x += Plotter.scale)
        {
            ctx.moveTo(x,0)
            ctx.lineTo(x,h);
        }

        ctx.stroke();
    }

    /**
     * Scale every coordinatenumber with a given factor
     * @param {Number[]} coor The coordinate
     * @param {Number} scale The scale
     */
    static Scale(coor,scale)
    {
        for (let i = 0; i < coor.length; i++)
        {
            coor[i] *= scale;           
        }

        return coor;
    }

    /**
     * Add two coordinates together
     * @param {Number[]} coor1 First coordinate
     * @param {Number[]} coor2 Seccond coordinate
     */
    static Add(coor1,coor2)
    {
        for (let i = 0; i < coor1.length; i++)
        {
            coor1[i] += coor2;           
        }

        return coor1;
    }

    /**
     * Set the new graphs to plot
     * @param {Graph[]} graphs An array of graphs
     */
    static SetNewGraphs(graphs)
    {
        //Set the conditions to animate
        Plotter.graphs.drawn = false;
        Plotter.graphs.scale = 1;

        //Move the graphs
        Plotter.graphs.previous = Plotter.graphs.current;
        Plotter.graphs.current = graphs;

        //Add 0-graphs until the length of the two arrays are the same
        while(Plotter.graphs.previous.length < graphs.length)
        {
            Plotter.graphs.previous.push(new FunctionGraph("0"));
        }
    }

    /**
     * Draw all graphs or animate them
     */
    static DrawGraphs()
    {
        //If the ctx is undefined or all the graphs are drawn return
        if(!Plotter.ctx || Plotter.graphs.drawn) return;

        Plotter.ClearCanvas();
        Plotter.DrawGraphLines();
        Plotter.DrawAxes();
        
        //Make a transisiton between the current and the previous graphs
        if(Plotter.graphs.scale - 1/(frameRate * (Plotter.style.transition/1000)) > 0)
        {
            //Decrease the scale
            Plotter.graphs.scale -= 1/(frameRate * (Plotter.style.transition/1000));

            //Loop through all graphs
            for (let i = 0; i < Plotter.graphs.current.length; i++)
            {
                const graph1 = Plotter.graphs.previous[i];
                const graph2 = Plotter.graphs.current[i];
                
                //Add the graphs to eachother with a scale
                var transGraph = Graph.AddGraphs(_.cloneDeep(graph2),_.cloneDeep(graph1),1-Plotter.graphs.scale,Plotter.graphs.scale);
                //Plot the newly created graph
                Plotter.PlotGraph(transGraph);
            }
        }
        //Just show the current graphs
        else
        {
            //Set the drawn variable to true because no additional drawing is required
            Plotter.graphs.drawn = true;
            //Set the graph scale to 0;
            Plotter.graphs.scale = 0;

            //Draw all graphs
            for (let i = 0; i < Plotter.graphs.current.length; i++)
            {
                const graph = Plotter.graphs.current[i];
                Plotter.PlotGraph(graph);
            }
        }
    }
}

Plotter.ctx;
Plotter.graphs = {current:[],previous:[],scale:0,drawn:false};
Plotter.origin = {x:1/2,y:1/2};
Plotter.scale = 1;
Plotter.precision = 0.1;
Plotter.style = 
{
    axes:
    {
        thickness: 2,
        color: new Color(128,128,128)
    },
    lines:
    {
        thickness: 2,
        color: new Color(230,230,230)
    },
    showAxes: true,
    showGraphLines: true,
    transition: 300
};