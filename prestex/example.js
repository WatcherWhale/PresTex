function LoadExamplePresentation()
{
    //Create a new presentation
    var example = new Presentation();

    //Get the currently selected slide
    var slide = example.GetCurrentSlide();

    //Create a sine wave graph
    var sine = new FunctionGraph("sin(x)");
    sine.color = "blue";
    sine.thickness = 2;
    slide.graphs.push(sine);

    var spiral = new PolarGraph("1/2 * t");
    spiral.color = "red";
    spiral.interval = [0,10];
    spiral.scaled = [false,true];
    slide.graphs.push(spiral);

    //Create The title text
    var txt = new TextElement(slide.objects.length,10,10,"Example: Graphs and Latex text");
    txt.fontSize = 50;
    txt.bold = "true";
    slide.objects.push(txt);

    //Create a latex text element
    var tex = new LatexElement(slide.objects.length,1000,350,"f(x)=sin(x)");
    tex.fontSize = 30;
    tex.color = "blue";
    slide.objects.push(tex);

    var tex2 = new LatexElement(slide.objects.length,1250,200,"r=\\frac{1}{2} \\cdot \\theta : \\theta \\in \\left[0,10\\right]");
    tex2.fontSize = 30;
    tex2.color = "red";
    slide.objects.push(tex2);

    //Create another latex text element
    var tex3 = new LatexElement(slide.objects.length,10,70,"sin(x) = cos\\left( \\frac{\\pi}{2} - x\\right)");
    tex3.fontSize = 30;
    tex3.displayMode = "false";
    slide.objects.push(tex3);

    //Create a chart
    var chart = new ChartElement(slide.objects.length,10,70,500,500);
    chart.hide = "true";
    chart.data = JSON.stringify({
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            label: 'Amount',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    });

    slide.objects.push(chart);

    //Get the next slide or create one
    var slide2 = example.GetSlide(1);
    slide2.style.background = "#222";
    slide2.style.color = "#fff";
    slide2.style.plot.showAxes = false;
    slide2.style.plot.showGraphLines = false;

    //Alter the title
    slide2.objects[0].text = "Example: Charts";
    slide2.objects[0].color = "#fff";

    //Show the chart
    slide2.objects[chart.id].hide = "false";

    //Hide other elements
    slide2.objects[1].hide = "true";
    slide2.objects[2].hide = "true";
    slide2.objects[3].hide = "true";

    slide2.graphs[0].visible = false;
    slide2.graphs[1].visible = false;

    //Set the presentation to the example presentation
    SetPresentation(example);
}