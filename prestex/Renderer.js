var renderEvents = new EventEmitter();

function DrawEditorSlide(slide)
{
    //TODO: Limit width too
    let h = 0.75 * window.innerHeight;
    let w = 16/9 * h;
    let x = (window.innerWidth - w)/2;
    let y = (window.innerHeight - h)/2;

    let shrink = (0.75 * window.innerHeight)/1080;

    $("div.body").css({"left":x,"top":y,"height":h,"width":w});

    slide.Render({x:x,y:y,s:shrink});

    renderEvents.emit("drawn",{'target':'editor'});
}

function DrawSlide(slide)
{
    let shrink = window.innerWidth/1920;
    $("div.body").css({"left":0,"top":0,"height":'100%',"width":'100%',"overflow":"hidden"});

    slide.Render({x:0,y:0,s:shrink});

    renderEvents.emit("drawn",{'target':'present'});
}