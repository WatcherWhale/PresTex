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

    //Get the next slide or create one
    var slide2 = example.GetSlide(1);
    slide2.style.plot.showAxes = true;
    slide2.style.plot.showGraphLines = true;

    //Alter the title
    slide2.objects[0].text = "Example: Animating Graphs";

    //Show the chart
    //slide2.objects[chart.id].hide = "false";

    //Hide other elements
    slide2.objects[1].text = "f(x)=sin(2x)";

    slide2.objects[2].hide = "true";
    slide2.objects[3].hide = "true";

    slide2.graphs[0].SetExpression("sin(2x)");

    slide2.graphs[1].visible = false;

    //Set the presentation to the example presentation
    SetPresentation(example);
}