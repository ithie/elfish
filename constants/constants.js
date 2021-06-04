window.registerUtil(
    './constants/constants',
    [],
    () => {
        tileSize = 100;
        return {
            tileSize,
            tileStyles: `
                display: inline-block;
                box-sizing: border-box;
                height: ${tileSize}px;
                width: ${tileSize}px;
                padding: 0;
                margin: 0;
                line-height: 0;
                border: 0;
            `,
        };
    }
);