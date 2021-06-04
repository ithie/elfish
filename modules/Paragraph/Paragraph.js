window.registerComponent(
    './modules/Paragraph/Paragraph',
    [],
    () => (props, children) => createTag(
        'p',
        {
            ...props
        },
        createTag(
            'text',
            {},
            `hallo ${children}`
        )
    )
);