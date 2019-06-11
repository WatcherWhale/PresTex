class Slide
{
    constructor()
    {
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

    Render(offset)
    {
        $("div.body").css({background:this.style.background,color:this.style.color});

        Plotter.style = this.style.plot;

        this.objects.forEach(function(obj)
        {
            obj.Render(offset);
        });
    }
}
