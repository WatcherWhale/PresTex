class Slide
{
    constructor()
    {
        this.objects = [];
    }

    Render(offset)
    {
        this.objects.forEach(function(obj)
        {
            obj.Render(offset);
        });
    }
}
