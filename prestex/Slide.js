class Slide
{
    constructor()
    {
        this.objects = [];
        this.graphs = [];
    }

    Render(offset)
    {
        this.objects.forEach(function(obj)
        {
            obj.Render(offset);
        });
    }
}
