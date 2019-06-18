var presentation = new Presentation();

function SetPresentation(pres)
{
    presentation = pres;
    currentGraphs = pres.slides[0].graphs;
}

function NewPresentation()
{
    presentation = new Presentation();
}

function SavePresentation()
{
    //TODO
}

function LoadPresentation(func)
{
    presentation = func();
}