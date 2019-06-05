var currentObject;
var keys = {left:37,top:38,right:39,down:40,enter:13,space:32};

$(window).ready(function()
{
    Chart.defaults.global.defaultFontStyle = "'KaTeX_Mai'";
    LoadExamplePresentation();

    DrawEditorSlide(presentation.GetCurrentSlide());

    $(window).resize(function()
    {
        DrawEditorSlide(presentation.GetCurrentSlide());
    });

    $("body").on('keydown',function(e)
    {
        if(e.which == keys.right)
        {
            presentation.NextSlide();
            DrawEditorSlide(presentation.GetCurrentSlide());
        }
        else if(e.which == keys.left)
        {
            presentation.PreviousSlide();
            DrawEditorSlide(presentation.GetCurrentSlide());
        }
    });
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