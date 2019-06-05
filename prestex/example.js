function LoadExamplePresentation()
{
    var example = new Presentation();

    var slide = example.GetCurrentSlide();

    var graph = new FuncElement(slide.objects.length,0,0,1920,1080,"sin(x)");
    graph.scale = 100;
    slide.objects.push(graph);

    var txt = new TextElement(slide.objects.length,10,10,"Example: Graphs and Latex text");
    txt.fontSize = 50;
    txt.bold = "true";
    slide.objects.push(txt);

    var tex = new LatexElement(slide.objects.length,1000,390,"f(x)=sin(x)");
    tex.fontSize = 30;
    slide.objects.push(tex);

    tex = new LatexElement(slide.objects.length,10,70,"sin(x) = cos\\left( \\frac{\\pi}{2} - x\\right)");
    tex.fontSize = 30;
    slide.objects.push(tex);

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

    var slide2 = example.GetSlide(1);
    txt = new TextElement(1,10,10,"Example: Charts");
    txt.fontSize = 50;
    txt.bold = "true";
    slide2.objects[1] = txt;

    slide2.objects[chart.id].hide = "false";

    slide2.objects[0].hide = "true";
    slide2.objects[2].hide = "true";
    slide2.objects[3].hide = "true";

    presentation = example;
}