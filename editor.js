var currentObject;

$(window).ready(function()
{
    var graph = new Func(0,0,0,1920,1080,"Math.abs(Math.sin(x))");
    presentation.GetCurrentSlide().objects.push(graph);

    CreateLatex("f(x)=\\left|sin(x)\\right|",1020,440);

    $("div.body div.object").click(function(e)
    {
        OpenProperties($(this).attr('id'));
    });
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