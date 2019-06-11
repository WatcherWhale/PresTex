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
        //Remove all spaces from the string and make it lowercase
        str = str.replaceAll(" ","");
        str = str.toLowerCase();

        if(str.indexOf("#") != -1) return Color.FromHex(str);

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
        }
        else if(type.substr(0,3) == "rgb")
        {
            var colorValues = str.substr(5,str.length - 5).replaceAll("(","").replaceAll(")","").split(",");

            if(colorValues.length == 3)
            {
                return new Color(colorValues[0],colorValues[3],colorValues[2]);
            }
        }

        if(Object.keys(GetColorNames()).indexOf(str) != -1)
        {
            return GetColorNames()[str];
        }
        else
        {
            //If all else fails return black
            return new Color(0,0,0);
        }
    }
}

function GetColorNames() 
{
    var colorArrs = [['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen']
    ,['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32']]; 

    var colors = {};
    for (let i = 0; i < colorArrs[0].length; i++)
    {
        const name = colorArrs[0][i].toLowerCase();
        const hex = colorArrs[1][i]; 
        
        colors[name] = Color.FromHex(hex);
    }

    return colors;
}