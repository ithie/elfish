window.registerComponent(
    './modules/Water/Water',
    [
        './constants/constants',
    ],
    ([ { tileStyles } ]) => {
        return () => {
            return appendStyle(
                createTag(
                    'div'
                ),
                `
                    ${tileStyles}
                    background-color: #5c7fa7;
                `
            );
        }
    }
);