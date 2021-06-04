window.registerComponent(
    './modules/Gras/Gras',
    [
        './constants/constants',
    ],
    (
        [ { tileStyles } ],
    ) => ([state, setState]) => appendStyle(
        createTag(
            'div',
            {
                onclick: (evt)  => {
                    evt.preventDefault();
                    console.log('ONCLICK', !!state.state);
                    setState(!state.state);
                },
            }
        ),
        `
            ${tileStyles}
            background-color: #297119;
            ${
                !!state.state && `
                    border: 3px solid red;
                `
            }
        `
    )
);