window.registerComponent(
    './modules/Index',
    [
        './modules/Paragraph/Paragraph',
        './libs/counter',
        './modules/Input/Input',
        './modules/Landscape/Landscape',
        'system/global/state',
    ],
    (
        [Paragraph, counter, Input, Landscape, { getStore }],
    ) => ([state, setState]) => appendStyle(
        createTag(
            'div',
            {},
            [
                Paragraph(
                    {
                        onclick: (evt) => {
                            evt.preventDefault();
                            setState(state.state === 0 ? 1 : state.state * 3);
                        }
                    },
                    `Hallo Welt, iter ${state.state}`
                ),
                Input(),
                Paragraph(
                    {},
                    `Content from input field ${getStore().inputfield?.any ?? 'NONE'}`,
                ),
                Landscape()
            ]
        ),
        `
            font-family: Arial, Helvetica, Sans-Serif;
        `
    )
);