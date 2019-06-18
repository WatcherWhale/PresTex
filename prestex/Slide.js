class Slide
{
    constructor(id)
    {
        this.id = id;
        this.objects = [];
        this.graphs = [];

        this.style =
        {
            background: "white",
            color: "black",
            font: "KaTeX_Main",
            plot:
            {
                axes:
                {
                    thickness: 2,
                    color: new Color(128,128,128)
                },
                lines:
                {
                    thickness: 2,
                    color: new Color(230,230,230)
                },
                showAxes: true,
                showGraphLines: true,
                transition: 300
            }
        }
    }

    /**
     * Render this slide
     * @param {{s:Number}} offset Offset values
     */
    Render(offset)
    {
        //Set the style of the background
        $("div.body").css({background:this.style.background,color:this.style.color});

        //Set the style of the plot
        Plotter.style = this.style.plot;

        //Render all elements of the slide
        this.objects.forEach(function(obj)
        {
            obj.Render(offset);
        });
    }

    GetNewObjectId()
    {
        return this.objects.length;
    }
}
