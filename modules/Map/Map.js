window.registerUtil(
    './modules/Map/Map',
    [
        './modules/Gras/Gras',
        './modules/Sand/Sand',
        './modules/Water/Water',
    ],
    ([Gras, Sand, Water]) => {
        return () => [
            [ Water, Water, Water, Water, Water, Water],
            [ Water, Water, Sand, Sand, Water, Water],
            [ Water, Sand, Gras, Gras, Sand, Water],
            [ Water, Sand, Gras, Gras, Sand, Water],
            [ Water, Water, Sand, Sand, Water, Water],
            [ Water, Water, Water, Water, Water, Water],
        ];
    }
);