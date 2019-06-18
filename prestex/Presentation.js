class Presentation
{
    constructor()
    {
        this.slides = [];
        this.slides.push(new Slide(0));
        this.currentSlide = 0;
    }

    /**
     * @returns {Slide} slide
     */
    GetCurrentSlide()
    {
        return this.slides[this.currentSlide];
    }

    /**
     *  Returns a slide with the given index
     * @param {Number} i The index of the reqeusted slide.
     * @returns {Slide} slide
     */
    GetSlide(i)
    {
        if(i == this.slides.length)
        {
            var slide = new Slide(i);

            //Copies the objects of the previous slide to the this slide
            slide.objects = _.cloneDeep(this.slides[this.slides.length - 1].objects);
            slide.graphs = _.cloneDeep(this.slides[this.slides.length - 1].graphs);
            slide.style = _.cloneDeep(this.slides[this.slides.length - 1].style);

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