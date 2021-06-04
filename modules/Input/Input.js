window.registerComponent(
    './modules/Input/Input',
    ['./libs/counter', './modules/Paragraph/Paragraph', 'system/global/state'],
    ([counter, Paragraph, { setStore }]) => ([state, setState]) => createTag(
        'input',
        {
            value: state.state !== null ? state.state : '',
            onblur: (evt) => {
                setStore('inputfield.any', evt.target.value);
                evt.preventDefault();
                setState(evt.target.value);
            },
            type: 'text',
        },
        null
    )
);