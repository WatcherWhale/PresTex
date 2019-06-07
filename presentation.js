var keys = {left:37,top:38,right:39,down:40,enter:13,space:32};
Chart.defaults.global.defaultFontFamily = "'KaTeX_Mai'";
$(window).ready(function()
{
    LoadExamplePresentation();

    DrawSlide(presentation.GetCurrentSlide());

    $("body").on('keydown',function(e)
    {
        if(e.which == keys.right)
        {
            presentation.NextSlide();
            DrawSlide(presentation.GetCurrentSlide());
        }
        else if(e.which == keys.left)
        {
            presentation.PreviousSlide();
            DrawSlide(presentation.GetCurrentSlide());
        }
    });
});