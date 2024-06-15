function createMultiplier(x) {
    return function (y) {
        return x * y;
    };
}

export let double = createMultiplier(2);

// console.log(double(5));



function createName() {
    return function (x, y) {
        return (
            <div>
                <h2>
                    FirstName: {x}
                </h2>
                LastName: {y}
            </div>
        );
    }
};

export let funcOne = createName();





