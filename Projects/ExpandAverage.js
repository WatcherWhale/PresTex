function LoadMe()
{
    var pres = new Presentation();
    var slide1 = pres.GetSlide(0);

    slide1.style.plot.showAxes = false;

    //Bring to center
    var title = new TextElement(slide1.GetNewObjectId(),(1920-1083.2)/2,(1080 - 100)/2,"Expanding an average");
    title.fontSize = 100;
    title.bold = "true";
    slide1.objects.push(title);

    var slide2 = pres.GetSlide(1);

    title = slide2.objects[0];
    title.fontSize = 50;
    title.x = 10;
    title.y = 10;

    var formula = new LatexElement(slide2.GetNewObjectId(),(1920-320.2)/2,(1080-277.2)/2,"\\bar{y} = \\frac{1}{n} \\sum_{i=1}^{n} y_i");
    formula.fontSize = 50;
    slide2.objects.push(formula);

    var slide3 = pres.GetSlide(2);
    
    formula = slide3.objects[formula.id];
    formula.text = "\\bar{y} = \\frac{1}{n+1} \\sum_{i=1}^{n} y_i";
    formula.x -= 150;
    
    var mistery = new LatexElement(slide3.GetNewObjectId(),1090,450.4,"+ x");
    mistery.fontSize = 50;
    mistery.color = "red";
    slide3.objects.push(mistery);

    var slide = pres.GetSlide(3);
    mistery = slide.objects[mistery.id];
    mistery.fontSize = 60;
    mistery.y -= 10;

    slide = pres.GetSlide(4);
    mistery = slide.objects[mistery.id];
    mistery.fontSize = 40;
    mistery.y += 20;

    slide = pres.GetSlide(5);
    mistery = slide.objects[mistery.id];
    mistery.hide = "true";

    formula = slide.objects[formula.id];
    formula.x += 150;
    formula.text = "\\bar{y} = \\frac{1}{n} \\sum_{i=1}^{n} y_i";

    slide = pres.GetSlide(6);
    
    var constGraph = new FunctionGraph("2");
    constGraph.color = "blue";
    var newGraph = new FunctionGraph("x");
    newGraph.color = "red";

    slide.graphs.push(constGraph);
    slide.graphs.push(newGraph);
    slide.style.plot.showAxes = true;
    slide.style.plot.transition = 100;

    formula = slide.objects[formula.id];
    formula.hide = "true";
    //formula.text = "\\bar{y}_{expanded}(x) = \\frac{1}{n+m} \\left( \\sum_{i=1}^{n} y_i + mx \\right)";

    return pres;
}