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
        return this.slides[i];
    }
}