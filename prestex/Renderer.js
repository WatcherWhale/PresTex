var renderEvents = new EventEmitter();
var currentGraphs = [];
var frame = 0;
var frameRate = 60;

function DrawEditorSlide(slide)
{
    //TODO: Limit width too
    let h = 0.75 * window.innerHeight;
    let w = 16/9 * h;
    let x = (window.innerWidth - w)/2;
    let y = (window.innerHeight - h)/2;

    let shrink = (0.75 * window.innerHeight)/1080;

    $("div.body").css({"left":x,"top":y,"height":h,"width":w});

    slide.Render({x:x,y:y,s:shrink});
    PlotGraphs(slide,shrink);

    renderEvents.emit("drawn",{'target':'editor'});
}

function DrawSlide(slide)
{
    let shrink = window.innerWidth/1920;
    $("div.body").css({"left":0,"top":0,"height":'100%',"width":'100%',"overflow":"hidden"});

    slide.Render({x:0,y:0,s:shrink});
    PlotGraphs(slide,shrink);

    renderEvents.emit("drawn",{'target':'present'});
}

function PlotGraphs(slide,shrink)
{
    if($("div.body canvas.plots").length == 0)
    {
        $("div.body").append("<canvas class='plots'></canvas>");
    }

    var canvas = $("div.body canvas.plots")[0];

    canvas.width = shrink*1920;
    canvas.height = shrink*1080;
    Plotter.scale = shrink * 100;

    var ctx = canvas.getContext("2d");

    Plotter.ClearCanvas(ctx);
    Plotter.DrawGraphLines(ctx);
    Plotter.DrawAxes(ctx);

    for (let i = 0; i < slide.graphs.length; i++)
    {
        const graph = slide.graphs[i];
        Plotter.PlotGraph(graph,ctx);
    }
}

setInterval(function()
{
    frame++;
    renderEvents.emit("frame",{"frame":frame});
},1000/frameRate);