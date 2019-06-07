class Plotter
{
    static ClearCanvas(ctx)
    {
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;

        ctx.clearRect(0,0,w,h);
    }

    static PlotGraph(graph,ctx)
    {
        if(!graph.visible) return;

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

    static DrawAxes(ctx) 
    {
        if(!Plotter.style.showAxes) return;

        //Get constants
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;

        //Start path and set styling
        ctx.beginPath();
        ctx.strokeStyle = Plotter.style.origin.color; 
        ctx.strokeWidth = Plotter.style.origin.thickness;

        //X-Axis
        ctx.moveTo(0,Plotter.origin.y * h);
        ctx.lineTo(w,Plotter.origin.y * h);

        //Y-Axis
        ctx.moveTo(Plotter.origin.x * w,0);
        ctx.lineTo(Plotter.origin.x * w,h);

        ctx.stroke();
    }

    static DrawGraphLines(ctx) 
    {
        if(!Plotter.style.showGraphLines) return;

        //Calculate constants
        const h = ctx.canvas.height;
        const w = ctx.canvas.width;
        const offsetX = (Plotter.origin.x * w) % Plotter.scale;
        const offsetY = (Plotter.origin.y * h) % Plotter.scale;

        ctx.beginPath();
        ctx.strokeStyle = "rgb(230,230,230)";

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

    static Scale(coor,scale)
    {
        for (let i = 0; i < coor.length; i++)
        {
            coor[i] *= scale;           
        }

        return coor;
    }

    static Add(coor1,coor2)
    {
        for (let i = 0; i < coor1.length; i++)
        {
            coor1[i] += coor2;           
        }

        return coor1;
    }

    //FIX
    static Animate(ctx,graph,graph2)
    {
        const startFrame = frame;

        renderEvents.on("frame",function(frameData)
        {
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
                let coor1 = [];
                let coor2 = [];

                if(graph.scaled[0])
                {
                    coor1 = graph.GetCoordinates(i*Plotter.precision/Plotter.scale);
                }
                else
                {
                    coor1 = graph.GetCoordinates(i*Plotter.precision);
                }

                if(graph2.scaled[0])
                {
                    coor2 = graph2.GetCoordinates(i*Plotter.precision/Plotter.scale);
                }
                else
                {
                    coor2 = graph2.GetCoordinates(i*Plotter.precision);
                }
                
                if(graph.scaled[1]) coor1 = Plotter.Scale(coor1,Plotter.scale);
                if(graph2.scaled[1]) coor2 = Plotter.Scale(coor2,Plotter.scale);

                coor1 = Plotter.Scale(coor1,1-(startFrame-frameData)/5000);
                coor2 = Plotter.Scale(coor2,(startFrame-frameData)/5000);

                let coor = Plotter.Add(coor1,coor2);

                ctx.lineTo(Plotter.origin.x*w +coor[0],Plotter.origin.y*h - coor[1]);
            }

            if((startFrame-frameData)/5000 == 1) renderEvents.off("frame");

            ctx.stroke();
        });
    }
}

Plotter.origin = {x:1/2,y:1/2};
Plotter.scale = 1;
Plotter.precision = 0.01;
Plotter.style = {
    origin:{
        thickness: 2,
        color: "rgb(128,128,128)"
    },
    showAxes: true,
    showGraphLines: true
}