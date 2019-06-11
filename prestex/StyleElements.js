class Color
{
    constructor(r,g,b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 1;
    }

    ToString()
    {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }

    /**
     * Scale the RGB-components by a scale
     * @param {Number} scale A scale to scale by
     * @returns {Color}
     */
    Scale(scale)
    {
        this.r *= scale;
        this.g *= scale;
        this.b *= scale;

        return this;
    }

    /**
     * Creates a color object from a hexadecimal color
     * @param {String} hex 
     * @returns {Color}
     */
    static FromHex(hex)
    {
        hex.replace("#","");

        const hexR = hex.substr(0,2);
        const hexG = hex.substr(2,2);
        const hexB = hex.substr(4,2);

        return new Color(parseInt(hexR,16),parseInt(hexG,16),parseInt(hexB,16));
    }

    /**
     * Creates a color from a template like : 'rgb(x,y,z)' or 'rgba(x,y,z,w)'
     * @param {String} str A string
     */
    static FromString(str)
    {
        //Remove all spaces from the string
        str = str.replaceAll(" ","");

        var type = str.substr(0,4);

        if(type == "rgba")
        {
            var colorValues = str.substr(5,str.length - 5).replaceAll("(","").replaceAll(")","").split(",");

            if(colorValues.length == 4)
            {
                var col = new Color(colorValues[0],colorValues[3],colorValues[2]);
                col.a = colorValues[3];
                return col;
            }
            else
            {
                return new Color(0,0,0);
            }
        }
        else if(type.substr(0,3) == "rgb")
        {
            var colorValues = str.substr(5,str.length - 5).replaceAll("(","").replaceAll(")","").split(",");

            if(colorValues.length == 3)
            {
                return new Color(colorValues[0],colorValues[3],colorValues[2]);
            }
            else
            {
                return new Color(0,0,0);
            }
        }
        else
        {
            return new Color(0,0,0);
        }
    }
}