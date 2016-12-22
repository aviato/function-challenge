const add = (x, y) => x + y;
const mul = (x, y) => x * y;
const sub = (x, y) => x - y;

console.log(add(3, 4), sub(3, 4), mul(3, 4));

// const identityf = x => () => x;
function identityf(x) {
    return function() {
        return x;
    };
};

const three = identityf(3)

console.log(three());

function addf(x) {
    return function(y) {
        return x + y;
    };
};

console.log(addf(3)(4));

function liftf(binary) {
    return function(first) {
        return function(second) {
            return binary(first, second);
        };
    };
};

console.log('result of liftf: ', liftf(add)(3)(4));

function curry(binary, first) {
    return function(second) {
        return binary(first, second);
    }
}

// const curry = (binary, first) => liftf(binary)(first)

const add3 = curry(add, 3);

console.log('result of curry: ', add3(4));

const inc1 = liftf(add)(1);
const inc2 = curry(add, 1);
const inc3 = addf(1);

console.log(inc1(5), inc1(inc1(5)));
console.log(inc2(5));
console.log(inc3(5), inc3(inc3(5)));

function twice(binary) {
    return function(first) {
        return binary(first, first);
    }
}

// const twice = binary => first => binary(first, first);

const double = twice(add);
const square = twice(mul);

console.log(double(11));
console.log(square(11));

function reverse(binary) {
    return function(first, second) {
        return binary(second, first);
    }
}

//const reverse = binary => (first, second) => binary(second, first);

const bus = reverse(sub);
console.log(bus(3, 2));

function composeu(unaryFirst, unarySecond) {
  return function(x) {
    return unarySecond(unaryFirst(x));
  }
}

console.log(composeu(double, square)(5));

function composeb(binOne, binTwo) {
  return function(x, y, z) {
    return binTwo(binOne(x, y), z);
  }
}

console.log(composeb(add, mul)(2, 3, 7));




































