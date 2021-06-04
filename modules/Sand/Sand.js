window.registerComponent(
    './modules/Sand/Sand',
    [
        './constants/constants',
    ],
    ([ { tileStyles } ]) => {
        return () => appendStyle(
            createTag(
                'div'
            ),
            `
                ${tileStyles}
                background-color: #b88428;
            `
        );
    }
);