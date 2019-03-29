---
title: What you should know about JavaScript arrays
date: '2019-03-10'
---

Let me make a bold statement: **for loops are often useless and make the code hard to read**. When it comes to iterating over an array, finding elements, sorting it or whatever you want, there's probably an array method out there that you can use.

However, some of them are still not that known and used despite their usefulness. I'll do the hard work for you by giving you the useful methods. Consider this article as your guide to JavaScript arrays methods.

**Note**: Before starting, you have to know one thing: I'm biased by functional programming. So I tend to use methods that don't mutate directly the original array. That way, I avoid side effects. I'm not saying you should never mutate an array, but at least know that some methods do it and that it can leads to side-effects. Side-effects can lead to unwanted changes and unwanted changes lead to bugs!

Knowing that, let's get started.

## The essentials

There are four things that you'll want to know when working with arrays: `map`, `filter`, `reduce` and the spread operator. They are powerful and useful.

### map

You'll use that one a lot. Basically, every time you need to modify the elements of your array, think of using `map`.

It takes one parameter: a function that is called on every element of the array. And it returns a **new array**, so no side effects here.

```js
const numbers = [1, 2, 3, 4]

const numbersPlusOne = numbers.map(n => n + 1) // Adds one to every element
console.log(numbersPlusOne) // [2, 3, 4, 5]
```

You can also create a new array that keeps only one particular property of an object:

```js
const allActivities = [
  { title: 'My activity', coordinates: [50.123, 3.291] },
  { title: 'Another activity', coordinates: [1.238, 4.292] },
  // etc.
]

const allCoordinates = allActivities.map(activity => activity.coordinates)
console.log(allCoordinates) // [[50.123, 3.291], [1.238, 4.292]]
```

So, remember, whenever you need to **transform** an array, think of using **map**.

### filter

The name of this method is pretty explicit here: Use it when you want to filter an array.

Just like `map` does, it takes a function as its only parameter that is called on every element of the array. This function needs to return a boolean:

- `true` if you want to **keep** the element in the array
- `false` if you don't want to keep it.

Then you'll have a shiny new array with the elements you wanted to keep.

For example, you can keep just the odd numbers in an array:

```js
const numbers = [1, 2, 3, 4, 5, 6]
const oddNumbers = numbers.filter(n => n % 2 !== 0)
console.log(oddNumbers) // [1, 3, 5]
```

Or you can also use it to remove a particular item in an array:

```js
const participants = [
  { id: 'a3f47', username: 'john' },
  { id: 'fek28', username: 'mary' },
  { id: 'n3j44', username: 'sam' },
]

function removeParticipant(participants, id) {
  return participants.filter(participant => participant.id !== id)
}

console.log(removeParticipant(participants, 'a3f47')) //  [{ id: 'fek28', username: 'mary' }, { id: 'n3j44', username: 'sam' }];
```

### reduce

Most difficult method to understand in my opinion. But once you master it, it's crazy how many things you can do with it.

Basically, `reduce` is about taking an array of values and combine them into one value. It takes two parameters, a callback function which is our **reducer** and an optional initial value (which is the first item of the array by default). The reducer itself takes four parameters:

- The accumulator: it accumulates the returned values in your **reducer**.
- The current value of the array
- The current index
- The array `reduce` was called upon

Most of the time, you'll just use the first two parameters: the accumulator and the current value.

Let's not be too theoretical. Here is the most common example of `reduce`:

```js
const numbers = [37, 12, 28, 4, 9]
const total = numbers.reduce((total, n) => total + n)
console.log(total) // 90
```

On the first iteration, the accumulator, which is `total`, takes an initial value of 37. The returned value is 37 + `n` and `n` is equal to 12, thus 49. On the second iteration, the the accumulator is equal to 49, the returned value is 49 + 28 = 77. And so on and so forth.

`reduce` is so powerful that you can actually use it to build a lot of array methods like `map` or `filter`:

```js
const map = (arr, fn) => {
  return arr.reduce((mappedArr, element) => {
    return [...mappedArr, fn(element)]
  }, [])
}

console.log(map([1, 2, 3, 4], n => n + 1)) // [2, 3, 4, 5]

const filter = (arr, fn) => {
  return arr.reduce((filteredArr, element) => {
    return fn(element) ? [...filteredArr] : [...filteredArr, element]
  }, [])
}

console.log(filter([1, 2, 3, 4, 5, 6], n => n % 2 === 0)) // [1, 3, 5]
```

Basically, we gave `reduce` an initial value of `[]`: our accumulator. For `map`, we ran a function whose result is added at then end of the accumulator thanks to the **spread operator** (we'll see it just after, don't worry.). For `filter`, it's nearly the same except that we ran the filter function on the element. If it returns true, we return the **previous** array, otherwise we add the element to the end of the array.

Let's see a more advanced example: deeply flatten an array, that is to say transforming something like `[1, 2, 3, [4, [[[5, [6, 7]]]], 8]]` into `[1, 2, 3, 4, 5, 6, 7, 8]`.

```js
function flatDeep(arr) {
  return arr.reduce((flattenArray, element) => {
    return Array.isArray(element)
      ? [...flattenArray, ...flatDeep(element)]
      : [...flattenArray, element]
  }, [])
}

console.log(flatDeep([1, 2, 3, [4, [[[5, [6, 7]]]], 8]])) // [1, 2, 3, 4, 5, 6, 7, 8]
```

This example is similar to `map` except that here we make use of recursion. I won't explain it because it's outside the scope of this article. However, if you want to know more about recursion, check out this [excellent resource](https://guillaumebogard.dev/blog/what-is-recursion/).

### Spread operator (ES2015)

I agree, this is not a method. However, using the spread operator can help you achieve many things when working with arrays. In fact, you can use it to expand the values of an array in another array. From that point, you can make a copy of an array or concatenate multiple arrays.

```js
const numbers = [1, 2, 3]
const numbersCopy = [...numbers]
console.log(numbersCopy) // [1, 2, 3]

const otherNumbers = [4, 5, 6]
const numbersConcatenated = [...numbers, ...otherNumbers]
console.log(numbersConcatenated) // [1, 2, 3, 4, 5, 6]
```

**Caution**: the spread operator does a **shallow copy** of the original array. But what does **shallow** mean? 🤔

Well, a shallow copy will duplicate the original elements as little as possible. So when you have an array containing numbers, strings or booleans (**primitive types**), there's no problem, values are really duplicated. However, this is not the same for **objects** or **arrays**. Only the **reference** to the original value will be copied! Therefore, if you make a shallow copy of an array containing an object and that you modify the object in the copied array, it will also modify the object in the original array since they have the **same reference**.

```js
const arr = ['foo', 42, { name: 'Thomas' }]
let copy = [...arr]

copy[0] = 'bar'

console.log(arr) // No mutations: ["foo", 42, { name: "Thomas" }]
console.log(copy) // ["bar", 42, { name: "Thomas" }]

copy[2].name = 'Hello'

console.log(arr) // /!\ MUTATION ["foo", 42, { name: "Hello" }]
console.log(copy) // ["bar", 42, { name: "Hello" }]
```

So, if you want to make a "real" copy of an array that contains object or arrays, you can use a lodash function like [cloneDeep](https://lodash.com/docs/#cloneDeep). But don't feel like you have to do such a thing. The goal here is to **be aware of how things work under the hood**.

## Good to know

You'fll find below other methods that are good to know and that can help you with some problems such as searching an element in an array, taking a portion of an array and more.

### includes (ES2015)

Have you ever used `indexOf` to know if something is in an array or not? Awful way to do it right? Luckily for us, `includes` does that for us. Give a parameter to `includes` and it will search in the array if the element exists.

```js
const sports = ['football', 'archery', 'judo']
const hasFootball = sports.includes('football')
console.log(hasFootball) // true
```

### concat

The concat method can be used to merge two or more arrays.

```js
const numbers = [1, 2, 3]
const otherNumbers = [4, 5, 6]

const numbersConcatenated = numbers.concat(otherNumbers)
console.log(numbersConcatenated) // [1, 2, 3, 4, 5, 6]

// You can merge as many arrays as you want
function concatAll(arr, ...arrays) {
  return arr.concat(...arrays)
}

console.log(concatAll([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

### forEach

Whenever you want to execute something for each array element, you'll want to use `forEach`. It takes a function as a parameter that takes itself three parameters: the current value, the index and the array:

```js
const numbers = [1, 2, 3, 4, 5]
numbers.forEach(console.log)
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
```

### indexOf

It is used to return the first index at which a given element can be found in the array. `indexOf` was also widely used to check whether an element is in an `array` or not. To be honest, I don't use it that much as of today.

```js
const sports = ['football', 'archery', 'judo']

const judoIndex = sports.indexOf('judo')
console.log(judoIndex) // 2
```

### find

The `find` method is quite similar to the `filter` method. You have to provide it a function that test each array's element. However, `find` stops testing elements as soons as it finds one that passes the test. **Not `filter`**. `filter` will iterate over the whole array no matter what.

```js
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.find(user => user.id === '6gbe')
console.log(user) // { id: '6gbe', name: 'mary' }
```

So use `filter` when you want to... well filter your **whole** array. Use `find` when you're sure you're searching for a **unique** element in your array.

### findIndex

It's exactly the same as the `find` method except that it returns the index of the first element found instead of the element directly.

```js
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.findIndex(user => user.id === '6gbe')
console.log(user) // 1
```

You may think that `findIndex` is the same as `indexOf`. Well... not exactly. The first parameter of `indexOf` is a primitive value (boolean, number, string, null, undefined or a symbol) while the first parameter of `findIndex` is a callback function.

So when you need to search the index of an element in an array of primitive values, you can use `indexOf`. If you have more complex elements such as objects, use `findIndex`.

### slice

Whenever you need to take a portion of an array or copy an array, you can use `slice`. But be careful, just like the spread operator, `slice` returns a **shallow copy** of that portion!

```js
const numbers = [1, 2, 3, 4, 5]
const copy = numbers.slice()
```

I said at the beginning of an article that for loops were often useless. Let me give you an example of how you can get rid of one.

Let's say you want to retrieve a certain amount of chat messages from an API and you want to display only five of them. You'll find below two approches: one with a for loop the other with `slice`.

```js
// The "traditional way" to do it:
// Determine the number of messages to take and use a for loop
const nbMessages = messages.length < 5 ? messages.length : 5
let messagesToShow = []
for (let i = 0; i < nbMessages; i++) {
  messagesToShow.push(posts[i])
}

// Even if "arr" has less than 5 elements,
// slice will return an entire shallow copy of the original array
const messagesToShow = messages.slice(0, 5)
```

### some

If you want to test that **at least one element** of an array passes a test, well you can use `some`. Just like `map`, `filter` or `find`, `some` takes a callback function as its only parameter. It returns `true` if at least one element pass the test, `false` otherwise.

You can use `some` when you are dealing with permissions for example:

```js
const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasDeletePermission = users.some(user =>
  user.permissions.includes('delete')
)
console.log(hasDeletePermission) // true
```

### every

Similar to `some` except that `every` tests if **all** elements pass the condition (instead of **at least one**).

```js
const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasAllReadPermission = users.every(user =>
  user.permissions.includes('read')
)
console.log(hasAllReadPermission) // false
```

### flat (ES2019)

These are the brand new methods that are coming in the JavaScript world. Basically, `flat` creates a new array by concatenating all sub-array elements into it. It accepts one parameter, a number, which represents how deep you want to flatten your array:

```js
const numbers = [1, 2, [3, 4, [5, [6, 7]], [[[[8]]]]]]

const numbersflattenOnce = numbers.flat()
console.log(numbersflattenOnce) // [1, 2, 3, 4, Array[2], Array[1]]

const numbersflattenTwice = numbers.flat(2)
console.log(numbersflattenTwice) // [1, 2, 3, 4, 5, Array[2], Array[1]]

const numbersFlattenInfinity = numbers.flat(Infinity)
console.log(numbersFlattenInfinity) // [1, 2, 3, 4, 5, 6, 7, 8]
```

### flatMap (ES2019)

Can you guess what this method does? I bet you can just with the name.

First it runs a mapping function on each element. Then it flattens the array once. Easy peasy!

```js
const sentences = [
  'This is a sentence',
  'This is another sentence',
  "I can't find any original phrases",
]

const allWords = sentences.flatMap(sentence => sentence.split(' '))
console.log(allWords) // ["This", "is", "a", "sentence", "This", "is", "another", "sentence", "I", "can't", "find", "any", "original", "phrases"]
```

In this example, you have many sentences in an array and you want to get all the words. Instead of using `map` to split all the sentences into words and then flatten the array, you can directly use `flatMap`.

Nothing to do with `flatMap`, but you can then count the number of words with the `reduce` function (just to show you another use-case of `reduce` 🙂)

```js
const wordsCount = allWords.reduce((count, word) => {
  count[word] = count[word] ? count[word] + 1 : 1
  return count
}, {})
console.log(wordsCount) // { This: 2, is: 2, a: 1, sentence: 2, another: 1, I: 1, "can't": 1, find: 1, any: 1, original: 1, phrases: 1, }
```

`flatMap` is also often used in Reactive Programming, you can see an example of it [here](http://reactivex.io/documentation/operators/flatmap.html).

### join

If you need to create a string based on the array's elements, you're looking for `join`. It allows to create a new string by concatenating all the array's elements, separated by a provided separator.

For example, you can display at a glance all the participants of an activity using `join`:

```js
const participants = ['john', 'mary', 'gary']
const participantsFormatted = participants.join(', ')
console.log(participantsFormatted) // john, mary, gary
```

Here is a more real-word example where you may want to filter the participants before and get their name:

```js
const potentialParticipants = [
  { id: 'k38i', name: 'john', age: 17 },
  { id: 'baf3', name: 'mary', age: 13 },
  { id: 'a111', name: 'gary', age: 24 },
  { id: 'fx34', name: 'emma', age: 34 },
]

const participantsFormatted = potentialParticipants
  .filter(user => user.age > 18)
  .map(user => user.name)
  .join(', ')

console.log(participantsFormatted) // gary, emma
```

### from

This is a **static** method that creates a new Array from an array-like or iterable object like a string for example. It can be useful when you're working with the dom.

```js
const nodes = document.querySelectorAll('.todo-item') // this is an instance of NodeList
const todoItems = Array.from(nodes) // now, you can use map, filter, etc. as you're workin with an array!
```

Have you seen that we used `Array` instead of an array instance? That's why `from` is called a static method.

Then you can have fun with these nodes and for example registering an event listener on each one of them with `forEach`:

```js
todoItems.forEach(item => {
  item.addEventListener('click', function() {
    alert(`You clicked on ${item.innerHTML}`)
  })
})
```

## Good to know but mutating

You'll find below other common array methods. The difference is that they modify the original array. There's nothing wrong with mutating an array but it's good to have it in mind!

For all these methods, if you don't want to mutate the original array, just make a shallow copy or deep copy beforehand:

```js
const arr = [1, 2, 3, 4, 5]
const copy = [...arr] // or arr.slice()
```

### sort

Yes, `sort` modifies the original array. In fact, it sorts the elements of an array in place. The default sorting method transforms all the elements into strings and sort them alphabetically:

```js
const names = ['john', 'mary', 'gary', 'anna']
names.sort()
console.log(names) // ['anna', 'gary', 'john', 'mary']
```

So be careful if you come from a Python background for example, doing `sort` on a numbers array just won't give you what you expected to:

```js
const numbers = [23, 12, 17, 187, 3, 90]
numbers.sort()
console.log(numbers) // [12, 17, 187, 23, 3, 90] 🤔
```

Then, how to sort the array? Well, `sort` accepts one function, a **comparison function**. This function accepts two parameters: the first element (let's call it `a`) and the second element for comparison (`b`). The comparison between these two elements need to return a number:

- If it's negative, `a` is sorted before `b`
- If it's positive, `b` is sorted before `a`
- No changes if it's 0.

Then you can sort numbers that way:

```js
const numbers = [23, 12, 17, 187, 3, 90]
numbers.sort((a, b) => a - b)
console.log(numbers) // [3, 12, 17, 23, 90, 187]
```

Or you can sort dates by the most recent:

```js
const posts = [
  {
    title: 'Create a Discord bot under 15 minutes',
    date: new Date(2018, 11, 26),
  },
  { title: 'How to get better at writing CSS', date: new Date(2018, 06, 17) },
  { title: 'JavaScript arrays', date: new Date() },
]
posts.sort((a, b) => a.date - b.date) // Substracting two dates returns the difference in millisecond between them
console.log(posts)
// [ { title: 'How to get better at writing CSS',
//     date: 2018-07-17T00:00:00.000Z },
//   { title: 'Create a Discord bot under 15 minutes',
//     date: 2018-12-26T00:00:00.000Z },
//   { title: 'Learn Javascript arrays the functional way',
//     date: 2019-03-16T10:31:00.208Z } ]
```

### fill

`fill` modifies or fills all the elements of an array from a start index to an end index with a static value.
A great use of `fill` is to fill a new array with static values.

```js
// Normally I would have called a function that generates ids and random names but let's not bother with that here.
function fakeUser() {
  return {
    id: 'fe38',
    name: 'thomas',
  }
}

const posts = Array(3).fill(fakeUser())
console.log(posts) // [{ id: "fe38", name: "thomas" }, { id: "fe38", name: "thomas" }, { id: "fe38", name: "thomas" }]
```

### reverse

I think the method's name is pretty clear here. However, keep in mind that just like `sort` does, `reverse` reverses the array in place!

```js
const numbers = [1, 2, 3, 4, 5]

numbers.reverse()
console.log(numbers) // [5, 4, 3, 2, 1]
```

### pop

That one removes the last element from an array and returns it.

```js
const messages = ['Hello', 'Hey', 'How are you?', "I'm fine"]
const lastMessage = messages.pop()
console.log(messages) // ['Hello', 'Hey', 'How are you?']
console.log(lastMessage) // I'm fine
```

## Methods you can replace

Finally, in this last section, you'll find methods that mutates the original array and that can be easily replaced with something else. I'm not saying you should ditch these methods. I just want you to realize that some array methods has side effects and that there are alternatives for that 👍

### push

This is a widely used method when working with arrays. In fact `push` allows you to add one or more elements to an array. It is also usually used to build a new array based on an old one.

```js
const todoItems = [1, 2, 3, 4, 5]

const itemsIncremented = []
for (let i = 0; i < items.length; i++) {
  itemsIncremented.push(items[i] + 1)
}

console.log(itemsIncremented) // [2, 3, 4, 5, 6]

const todos = ['Write an article', 'Proofreading']
todos.push('Publish the article')
console.log(todos) // ['Write an article', 'Proofreading', 'Publish the article']
```

If you need to build an array based on another just like `itemsIncremented`, chances are that there is a method made for it like our good friends `map`, `filter` or `reduce`. In fact we can use `map` to do the same:

```js
const itemsIncremented = todoItems.map(x => x + 1)
```

And if you want to use `push` when you need to add a new element, the spread operator got your back:

```js
const todos = ['Write an article', 'Proofreading']
console.log([...todos, 'Publish the article']) // ['Write an article', 'Proofreading', 'Publish the article']
```

### splice

`splice` is often used as a way to remove an element at a certain index. You can actually do the same with `filter`:

```js
const months = ['January', 'February', 'March', 'April', ' May']

// With splice
months.splice(2, 1) // remove one element at index 2
console.log(months) // ['January', 'February', 'April', 'May']

// Without splice
const monthsFiltered = months.filter((month, i) => i !== 3)
console.log(monthsFiltered) // ['January', 'February', 'April', 'May']
```

And now you might think, yeah but If I need to remove many elements? Well, use `slice`:

```js
const months = ['January', 'February', 'March', 'April', ' May']

// With splice
months.splice(1, 3) // remove thirds element starting at index 1
console.log(months) // ['January', 'February', 'April', 'May']

// Without splice
const monthsFiltered = [...months.slice(0, 1), ...months.slice(4)]
console.log(monthsFiltered) // ['January', 'February', 'April', 'May']
```

### shift

`shift` removes the first element of an array and returns it. To do it the functional way, you can use spread/rest:

```js
const numbers = [1, 2, 3, 4, 5]

// With shift
const firstNumber = numbers.shift()
console.log(firstNumber) // 1
console.log(numbers) // [2, 3, 4, 5]

// Without shift
const [firstNumber, ...numbersWithoutOne] = numbers
console.log(firstNumber) // 1
console.log(numbersWithoutOne) // [2, 3, 4, 5]
```

### unshift

Unshift allows you to add one or more elements to the beginning of an array. Well just like `shift`, you can use the spread operator to do such a thing:

```js
const numbers = [3, 4, 5]

// With unshift
numbers.unshift(1, 2)
console.log(numbers) // [1, 2, 3, 4, 5]

// Without unshift
const newNumbers = [1, 2, ...numbers]
console.log(newNumbers) // [1, 2, 3, 4, 5]
```

## TL;DR

- Whenever you need to perform operations on an array, don't go with a **for-loop** and don't reinvent the wheel, there's probably a method out there that does what you want to do.
- Most of the time, you'll use `map`, `filter`, `reduce` and the spread operator. They are essential tools for every developer.
- There are a lot of array methods that are great to know like `slice`, `some`, `flatMap`, etc. Recognize them and use them when it's appropriate!
- Side-effects can lead to unwanted changes. Be aware of which methods mutate your original array.
- `slice` and the spread operator make shallow copies. Thus, objects and sub-arrays will share the same reference. Be careful to that too.
- "Old" mutating array methods can be replaced with new ones. It's up to you to decide what to do with them.
