$(window).ready(function()
{
    DrawEditorSlide(presentation.GetCurrentSlide());

    $(window).resize(function()
    {
        DrawEditorSlide(presentation.GetCurrentSlide());
    });
});

function DrawEditorSlide(slide)
{
    $("div.body").empty();

    let h = 0.75 * window.innerHeight;
    let w = 16/9 * h;
    let x = (window.innerWidth - w)/2;
    let y = (window.innerHeight - h)/2;

    let shrink = (0.75 * window.innerHeight)/1080;

    $("div.body").css({"left":x,"top":y,"height":h,"width":w});

    slide.Render({x:x,y:y,s:shrink});
}