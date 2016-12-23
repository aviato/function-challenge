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

function limit(binary, callLimit) {
  let calls = 0;
  return function(first, second) {
    if (calls < callLimit) {
      calls += 1;
      return binary(first, second);
    }
  }

}

const add_ltd = limit(add, 1);

console.log(add_ltd(3, 4), add_ltd(3, 5));

function from(start) {
  return function() {
    let result = start;
    start += 1;
    return result;
  }
}

const index = from(0);

console.log(index(), index(), index());

function to(generator, limit) {
  return function() {
    let current = generator();
    if (current < limit) {
      return current;
    }
  }
}

let index1 = to(from(1), 3);

console.log(index1(), index1(), index1());


function fromTo(start, limit) {
  return to(from(start), limit);
}

let index2 = fromTo(0, 3);

console.log(index2(), index2(), index2(), index2());

/*function element(array, generator) {
  let index = generator ? generator : from(0);
  return function() {
    let current = index();
    if (current !== undefined) {
      return array[current];
    }
  }
}*/

function element(array, generator) {
  if (generator === undefined) {
    generator = fromTo(0, array.length);
  }
  return function() {
    let index = generator();
    if (index !== undefined) {
      return array[index];
    }
  }
}

const ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));

console.log('element tests: ', ele(), ele(), ele());

const eleNoGen = element(['a', 'b', 'c', 'd']);

console.log(
  'eleNoGen tests: ',
  eleNoGen(),
  eleNoGen(),
  eleNoGen(),
  eleNoGen(),
  eleNoGen()
);


function collect(generator, array) {
  return function() {
    let current = generator();
    if (current !== undefined) {
      array.push(current);
    }
    return current;
  }
}

let collection = [],
    col        = collect(fromTo(0, 2), collection);

console.log(
  'col test: ',
  col(),
  col(),
  col(),
  collection
);

function filter (generator, predicate) {
  return function() {
    let value;
    do {
      value = generator();
    } while (
      value !== undefined &&
      !predicate(value)
    );
    return value;
  }
}

function testThird (value) {
  return (value % 3) === 0;
}

let fil = filter(fromTo(0, 5), testThird);

console.log(
  'filter tests: ',
  fil(),
  fil(),
  fil()
);

function concat (genFirst, genSecond) {
  return function() {
    let value = genFirst();
    if (value === undefined) {
      value = genSecond();
    }
    return value;
  }
}

// Doug's code
/*function concat (gen1, gen2) {
  let gen = gen1;
  return function () {
    let value = gen();

    if (value !== undefined) {
      return value;
    }

    gen = gen2;
    return gen();
  }
}*/

const con = concat(
  fromTo(0, 3),
  fromTo(0, 2)
);

console.log(
  'testing con: ',
  con(),
  con(),
  con(),
  con(),
  con(),
  con()
);

const gensymf = char => {
  let count = from(0);
  return () => {
    let current = count();
    return `${char}${current}`;
  }
}

let geng = gensymf('G'),
    genh = gensymf('H');

console.log(
  'testing gensymf: ',
  geng(),
  genh(),
  geng(),
  genh()
);

const fibonaccif = (num1, num2) => {
  return () => {}
}
