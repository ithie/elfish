window.registerComponent(
    './modules/Landscape/Landscape',
    [
        './modules/Map/Map',
        './constants/constants',
    ],
    ([MapTiles, { tileSize }]) => () => createTag(
        'div',
        {},
        MapTiles().map(
            (mapTileRow) => appendStyle(
                createTag(
                    'div',
                    {},
                    mapTileRow.map(
                        (mapTile) => mapTile()
                    )
                ),
                `
                    display: block;
                    border: 0;
                    padding: 0;
                    margin: 0;
                    height: ${tileSize}px;
                    width: ${mapTileRow.length * tileSize}px;
                    max-width: ${mapTileRow.length * tileSize}px;
                `
            )
        )
    )
);