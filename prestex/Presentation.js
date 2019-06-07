class Presentation
{
    constructor()
    {
        this.slides = [];
        this.slides.push(new Slide());
        this.currentSlide = 0;
    }

    /**
     * @returns {Slide}
     */
    GetCurrentSlide()
    {
        return this.slides[this.currentSlide];
    }

    GetSlide(i)
    {
        if(i >= this.slides.length)
        {
            var slide = new Slide();

            //Copies the objects of the previous slide to the this slide
            slide.objects = _.cloneDeep(this.slides[this.slides.length - 1].objects);
            slide.graphs = _.cloneDeep(this.slides[this.slides.length - 1].graphs);

            this.slides.push(slide);
        }

        return this.slides[i];
    }

    NextSlide()
    {
        if(this.currentSlide +1 < this.slides.length) this.currentSlide++;
    }

    PreviousSlide()
    {
        if(this.currentSlide - 1 >= 0)this.currentSlide--;
    }
}