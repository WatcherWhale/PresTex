var presentation = new Presentation();

function CreateText(text,x,y)
{
    var slide = presentation.GetCurrentSlide();
    var txt = new TextElement(slide.objects.length,x,y,text);
    slide.objects.push(txt);

    DrawEditorSlide(slide);
}

function CreateLatex(text,x,y)
{
    var slide = presentation.GetCurrentSlide();
    var txt = new LatexElement(slide.objects.length,x,y,text);
    slide.objects.push(txt);

    DrawEditorSlide(slide);
}