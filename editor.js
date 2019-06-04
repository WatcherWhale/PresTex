var currentObject;

$(window).ready(function()
{
    var slide = presentation.GetCurrentSlide();

    var graph = new Func(slide.objects.length,0,0,1920,1080,"sin(x)");
    slide.objects.push(graph);

    var txt = new LatexElement(slide.objects.length,1020,300,"f(x)=sin(x)");
    txt.fontSize = 30;
    slide.objects.push(txt);

    DrawEditorSlide(slide);
});

renderEvents.on('drawn',function(e)
    {
        $("div.body div.object").click(function(e)
        {
            OpenProperties($(this).attr('id'));
        });

        if(currentObject) OpenProperties(currentObject.id);
    });

function OpenProperties(objectIndex)
{
    var obj = presentation.GetCurrentSlide().objects[objectIndex];
    currentObject = obj;

    var keys = Object.keys(obj);
    $("div.properties table tbody").empty();

    keys.forEach(key =>
    {
        if(key == "id" || key.indexOf("_") == 0) return;

        var line = "<tr><td>" + key + "</td><td><input id='" + key + "' width='50%' value='" + obj[key] + "'></td></tr>";
        $("div.properties table tbody").append(line);

        $("div.properties table input").on('keypress',function(e)
        {
            if(e.which == 13)
            {
                currentObject[$(this).attr('id')] = $(this).val();
                DrawEditorSlide(presentation.GetCurrentSlide());
            }
        });
    });
}