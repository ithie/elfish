window.registerUtil(
    './libs/counter',
    [],
    () => {
        var countUp = 0;
        return (count) => {
            return countUp += count;
        }
    }
);