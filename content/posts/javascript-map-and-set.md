---
title: JavaScript Map and Set
date: 2021-09-05
tags: [javascript]
---
## Map

`Map` is similar to `Object`. But the main difference is that `Map` allows keys of any type.

`new Map()` – creates the map.

`map.set(key, value)` – stores the value by the key.

`map.get(key)` – returns the value by the key, undefined if key doesn’t exist in map.

`map.has(key)` – returns true if the key exists, false otherwise.

`map.delete(key)` – removes the value by the key.

`map.clear()` – removes everything from the map.

`map.size` – returns the current element count.


```js
let map = new Map();

map.set('1', 'str1'); // string
map.set(1, 'num1'); // numeric
map.set(true, 'boolean'); // boolean

console.log(map.get('1')); // 'str1'
console.log(map.get(1)); // 'num1'
console.log(map.get(true)); // 'boolean'
```


For looping over a `map`, there are 3 methods.

`map.keys()` – returns an iterable for keys,

`map.values()` – returns an iterable for values,

`map.entries()` – returns an iterable for entries [key, value], it’s used by default in for..of.

```js
let coffeeMenu = new Map([
  ['americano', 3.5],
  ['espresso', 3],
  ['latte',    5]
]);

for (let coffee of coffeeMenu.keys()) {
  console.log(`${coffee} costs $${coffeeMenu.get(coffee)}`)
}

for (let coffee of coffeeMenu.entries()) {
  console.log(`${coffee[0]} costs $${coffeeMenu.get(coffee[0])}`)
}

// 'americano costs $3.5'
// 'espresso costs $3'
// 'latte costs $5'
```

`Map` has an built-in `forEach` method.

```js
coffeeMenu.forEach((value, key, map) => {
  console.log(`key: ${key}, value: ${value}`)
})
```


<b>How to turn an object into a Map?</b>

```js
let obj = {
  verano: 'summer',
  primavera: 'spring'
}

const seasonObj = Object.entries(obj)
// [ [ 'verano', 'summer' ], [ 'primavera', 'spring' ] ]

const season = new Map(seasonObj)

season.forEach((value, key) => {
  console.log(`${key} in english: ${value}`)
})

// 'verano in english: summer'
// 'primavera in english: spring'

```


then, <b>How to turn a Map into an object?</b>

We can use `Object.fromEntries` to get an object from `Map`.

```js
Object.fromEntries(season.entries());
Object.fromEntries(season); // same result as above line

// { verano: 'summer', primavera: 'spring' }

let shoeBrands = Object.fromEntries([['converse', 'casual'], ['nike', 'sports'], ['addidas', 'sports']])

// { converse: 'casual', nike: 'sports', addidas: 'sports' }
```


## Set

`Set`'s each value occurs only once

`new Set(iterable)` – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.

`set.add(value)` – adds a value, returns the set itself.

`set.delete(value)` – removes the value, returns true if value existed at the moment of the call, otherwise false.

`set.has(value)` – returns true if the value exists in the set, otherwise false.

`set.clear()` – removes everything from the set.

`set.size` – is the elements count.

```js
let furnitures = ['chair', 'table', 'sofa', 'doorknob', 'rug', 'table', 'sofatable']
furnitures.length; // 7

const furnitureSet = new Set(furnitures);
furnitureSet.size; // 6

furnitureSet.has('chair'); // true
```




<b>Iteration over Set</b>

We can use `for..of` or `forEach`

```js
for (furniture of furnitureSet) {
  console.log('furniture:', furniture)
}
```

`set.keys()` – returns an iterable object for values.

`set.values()` – same as set.keys(), for compatibility with Map

`set.entries()` – returns an iterable object for entries [value, value], exists for compatibility with Map.



## Array.from
Also I'll mention `Array.from` method which can be used very often with Map and Set structure.

<b>It can be used when using Set, to convert array-like object to an array.</b>

The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```






<b>Parameters</b>
1. `arrayLike`
An array-like or iterable object to convert to an array.

2. `mapFn (Optional)`
Map function to call on every element of the array.

3. `thisArg (Optional)`
Value to use as this when executing mapFn




<b><i>References</i></b>
- https://javascript.info/map-set
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
- https://www.samanthaming.com/tidbits/90-object-from-entries/