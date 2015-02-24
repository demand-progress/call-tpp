from kartograph import Kartograph

TPP_COUNTRIES = ['USA', 'CAN', 'PER', 'CHL', 'JPN', 'CHN', 
                 'THA', 'VNM', 'KHM', 'BRN', 'MYS', 'SGP',
                 'AUS', 'NZL']

config = {
    "proj": {
        "id": "lonlat",
        "lon0": 160
    },

    "layers": [
        {
            "id": "background",
            "special": "sea",
        }, 
        {
            "id": "graticule",
            "special": "graticule",
            "latitudes": 10,
            "longitudes": 10,
        },
        {
            "id": "world",
            "src": "data/ne_110m_admin_0_countries_lakes.shp",
            "join": True,
            "simplify": 1.5
        },
        {
            "id": "tpp",
            "src": "data/ne_110m_admin_0_countries_lakes.shp",
            "filter": (lambda r: r['iso_a3'] in TPP_COUNTRIES),
            "simplify": 1.5
        },
    ],

    "bounds": {
        "padding": 0.02,
        "mode": "bbox",
        "data":  [-180, -90, 180, 90]
    },

    "export": {
       "width": 1000,
       "round": 2,
    }
}

if __name__ == "__main__":
    K = Kartograph()
    css = open('map.css').read()

    fn = 'tpp.svg'
    
    K.generate(config, outfile=fn, stylesheet=css)
    print "done"
