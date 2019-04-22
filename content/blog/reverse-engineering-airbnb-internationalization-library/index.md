---
title: Reverse-engineering Airbnb's internationalization library
date: '2019-04-11'
---

Curiosity is one of the most important assets of a developer. By being curious and experimenting things, you can make sure you're constantly learning and upgrading your skills. Few weeks ago, I had to implement internationalization for an app I was working on. I chose to use [Polyglot](http://airbnb.io/polyglot.js/) because it seemed simple to use and it's backed by Airbnb, a company that have many great [open sources libraries](https://airbnb.io/projects/).

When I used Polyglot, I wondered how it was built under the hood, how does one build an internationalization library? So I decided to do a little bit of reverse-engineering and to dive into the source code. And here I am, sharing with you, what I've learnt along the way.

## Quick recap about the library

But first, let's do a quick recap about what the library can do. Basically, you give Polyglot a set of translated phrases and then you can translate all your sentences in your app using a special function called `t`.

```js
const polyglot = new Polyglot({
  phrases: {
    hello: 'Hello',
    morning: 'Morning',
    auth: {
      login: 'Login',
      register: 'Register',
    },
  },
})

polyglot.t('hello') // Hello
polyglot.t('morning') // Morning
polyglot.t('auth.login') // Login
```

Notice how Polyglot handles **nested objects.**

If you want to add more phrases to the Polyglot instance, you can use the `extend` method:

```js
polyglot.extend({
  bye: 'Bye!',
})
```

It supports **interpolation**. Roughly speaking, it consists in replacing some placeholders in your phrase by a real value:

```js
polyglot.extend({
  welcome: 'Welcome %{name}',
})

polyglot.t('welcome', { name: 'Thomas' }) // Welcome Thomas
```

If you want, you can also provide your own interpolation syntax:

```js
const polyglot = new Polyglot({ interpolation: { prefix: '{{', suffix: '}}' } })

polyglot.extend({
  city: 'You live in {{city}}',
})

polyglot.t('city', { city: 'London' }) // You live in London
```

Finally, you can handle pluralization with Polyglot, that is to say, express a sentence in the plural form. To make it work properly, Polyglot needs a locale (which is `en` by default):

```js
polyglot.locale() // 'en'
polyglot.extend({
  thing: 'There is %{smart_count} thing |||| There are %{smart_count} things',
})

polyglot.t('thing', { smart_count: 1 }) // There is 1 thing
// Giving a number as a secong argument also works
polyglot.t('thing', 4) // There are 4 things
```

If you need to set the locale, you have two choices, either call the `locale` method or provide the locale during the instanciation.

```js
polyglot.locale('fr')
// OR
const polyglot = new Polyglot({ locale: 'fr' })
```

What's great is that it supports many locales, dozens of locales!

And there are the other less-used features like `unset` to remove a key from the phrases object, `clear` to remove all the phrases, `replace` to replace the current phrases with others.

```js
polyglot.unset('hello')
polyglot.unset({
  hello: 'Hello',
  auth: {
    register: 'Register',
  },
})

polyglot.replace({
  hello: 'Hey!',
  bye: 'Bye-bye',
})

polyglot.clear()
```

You may think that the translation itself is easy to do. In fact, it's just returning a value of an object based on a key. But what about nested key objects? The interpolation feature? Or the pluralization? And handling the pluralization for all the locales? 🤔

Don't worry, we'll figure it out right away.

## Translate a simple phrase

Let's start with the simplest feature: translate a simple phrase. It's as easy as getting a key from an object. Internally, when you create an instance of Polyglot, you create an empty `phrases` object that you can already extend by providing some phrases in the `options`.

```js
function Polyglot(options) {
  var opts = options || {}
  this.phrases = {}
  this.extend(opts.phrases || {})
  // ...
}

// USAGE
const polyglot = new Polyglot() // phrases -> {}
const polyglot = new Polyglot({ phrases: { hello: 'Hello' } }) // extend({hello: 'Hello'}) is called
```

You can see Polyglot uses what we call **short-circuit evaluation**. This complex term simply means JavaScript takes advantage of logical operators such as `||` (OR), `&&` (AND) to evaluate just what's necessary. Thus, if `options` is `undefined` or `null`, JavaScript will assign `{}` to `opts` as the first operand evaluates to false. But if `options` is set, it won't even look at the rest of the expression and will assign `options` to `opts`.

As for the `extend` method, it is used to put all the keys of the given object to the `phrases` object. We'll come back to it in a few moments.

Then when we'll call `t`, Polyglot will just have to look up to its internal `phrases` and return the corresponding translation for the given key after transforming it (for the interpolation and pluralization for example).

```js
Polyglot.prototype.t = function(key, options) {
  var phrase, result
  // ...
  if (typeof this.phrases[key] === 'string') {
    phrase = this.phrases[key]
  }
  // ...
  if (typeof phrase === 'string') {
    result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex)
  }
  return result
}
```

You may think this is an odd way to declare a method. Why not simply use a `class`? Because JavaScript is constantly evolving. At the time this library was written, there were no such thing as classes, it was only introduced in 2015. So we had to create classes by using **constructor functions**.

However, functions being functions, it's not efficient to put all methods inside a constructor function. In fact, methods would be created at each instanciation. That's why there is a `prototype` property inside every function: **by putting a method in the `prototype` property, you share it across all instances of your function.** Thus, when you'll call it on a function instance, it will lookup first in the function if the property exists and then in the `prototype` if such a property doesn't exist. Check out [this resource](https://tylermcginnis.com/beginners-guide-to-javascript-prototype/) to learn more about prototypes.

By the way, classes in JavaScript are **constructor functions.** Go ahead and define a `class`, you'll see its type is `Function`. Interesting, isn't it?

## Extend

The most attentives of you will think _"But what if our `phrases` object has inner objects? Does that mean that `t` will return an object and not a string?"_.

That's a legit question. As said in the recap, Polyglot handles nested `phrases` objects, so don't worry about it. In fact, `extend` processes recursively all the keys in the object passed as an argument and put them in the internal `phrases` object, **no matter how deep they are.** The nested keys are concatenated with the corresponding key which is one level above them using the dot notation.

```js
var forEach = require('for-each')

// ...

Polyglot.prototype.extend = function(morePhrases, prefix) {
  forEach(
    morePhrases,
    function(phrase, key) {
      var prefixedKey = prefix ? prefix + '.' + key : key
      if (typeof phrase === 'object') {
        this.extend(phrase, prefixedKey)
      } else {
        this.phrases[prefixedKey] = phrase
      }
    },
    this
  )
}
```

**Note**: Polyglot uses a package called [for-each](https://github.com/Raynos/for-each) to iterate over both objects and arrays. They simply are polyfills so that Polyglot doesn't require added methods like `Array.prototype.forEach`. If you wonder what is the third `this` argument passed to `forEach`, it allows to specify what is `this` in the callback function (the second argument), that it to say an instance of Polyglot. (yes, `this` can be complicated sometimes.)

So let's say, you want to call `extend` to the following object:

```js
polyglot.extend({
  hello: 'Hello',
  auth: {
    login: 'Login',
    register: 'Register',
  },
})
```

For the `hello` key, `prefix` will be `undefined` so `prefixedKey` is equal to `hello`. The `phrase` (`Hello`) is a string, so we map `Hello` to `hello` in the internal `phrases`.

For `auth`, there is still no prefix, so `prefixedKey` is equal to `auth`. However, `phrase` is an object, so we'll recursively call `extend` with the object corresponding to the `auth` key, that it so say `{ login: ..., register: ... }` and the prefixedKey which is `auth`.

For `login`, there is a prefix which is `auth`, so `prefixedKey` is equal to `auth.login`. Here `phrase` is a string so we map `Login` to `auth.login` in the internal phrases. It's exactly the same behavior for `register`.

That way, you make sure you traverse all your object and map every key to a string value in the **flattened** `phrases` object which is equal to that:

```js
{
  hello: 'Hello',
  auth.login: 'Login',
}
```

Note that `extend` actually extends the `phrases` object and **doesn't replace it.** The only things that will get replaced will be the conflicting keys. For example if you call `extend` with an object which got a `hello` key and that key already exists in `phrases`, it will be replaced.

## Interpolation

Let's come back to `transformPhrase`, shall we? You may remember that we use it in the `t` function to transform the phrase we get via our key:

```js
if (typeof phrase === 'string') {
  result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex)
}
```

We'll dive into its code to understand how one can build the interpolation feature.

You may think that this is a hard task but it's just replacing a generic word in a phrase by some words in an object. And what's great is that [`String.prototype.replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) does most of the work for us. Indeed, according to MDN, The `replace` method returns a new string with some or all matches of a pattern replaced by a replacement. Then, you just need to define a regular expression to capture what you need to replace and fetch the corresponding word in the options object.

```js
var has = require('has')

// ...

var replace = String.prototype.replace

// ...

var defaultTokenRegex = /%\{(.*?)\}/g

function transformPhrase(phrase, substitutions, locale, tokenRegex) {
  // ...

  var result = phrase
  var interpolationRegex = tokenRegex || defaultTokenRegex

  // ...

  result = replace.call(result, interpolationRegex, function(
    expression,
    argument
  ) {
    if (!has(options, argument) || options[argument] == null) {
      return expression
    }
    return options[argument]
  })

  return result
}
```

This is how interpolation is done under the hood. Not less, not more. But there are things you may be unfamiliar with like `call` or `String.prototype.replace`.

Beforehand, three essential things are declared:

1. We require the `has` package which is a shortcut for `Object.prototype.hasOwnProperty.call`
2. We cache the `String.prototype.replace` method.
3. We create the `defaultRegexToken` that will be used to match the generic words in our sentences. Basically, this regex means _"match anything that is included inside `%{}`"_. Note that this regular expression is **lazy** (`.*?`) instead of **greedy** (`.*`).

That being said, we can learn how `transformPhrase` behaves. It takes four parameters: `phrase`, `substitutions`, `locale` and `tokenRegex`. We're mostly interested in `phrase` and `tokenRegex` for now as the other parameters are needed for pluralization. Then, we assign to `interpolationRegex` the regex that will be used for the replacements. It can be a custom regex (remember the custom interpolation option in the recap?) or the `defaultTokenRegex` explained above.

Then, we actually replace the phrase using the regular expression. As `replace` is cached, we need to use the `call` method to specify on which string we want to invoke the `replace` function, that is to say, `result`. If that really bothers you, it's the same as:

```js
result = result.replace(interpolationRegex, function(expression, argument) {
  if (!has(options, argument) || options[argument] == null) {
    return expression
  }
  return options[argument]
})
```

The second argument of `replace` can either have the form of a string or a function. Here we use the function because we need to retrieve the value associated to the eventual generic word in the options. This function will be run on every match with the following arguments:

- `expression`: refers to the match itself, `%{name}` for example.
- `argument`: refers to the captured group (`(.*?)`), that is to say everything inside the interpolation syntax. By default, it is everything inside `%{}`.

If the captured string is a property of the `options` object passed to `t` and is different than `null`, then we return its associated value otherwise we return the expression itself. The returned value will be used as a replacement for the match.

Let's apply it on an example to fully understand it:

```js
polyglot.extend({
  user: 'Hi, your name is %{name}. You are a %{job} and you like %{hobby}.',
})

polyglot.t('user', {
  name: 'Thomas',
  hobby: 'Traveling',
})
```

We assume we haven't provided any custom interpolation syntax to polyglot. Then, `interpolationRegex` is equal to `/%\{(.*?)\}/g`.

We call `replace` on the phrase `'Hi, your name is %{name}. You are a %{job} and you like %{hobby}.'`. We'll have three matches: `%{name}`, `%{job}` and `%{hobby}`. For every match, we run a function:

1. `expression` = `%{name}`, `argument` = `name`. Is `name` in the options object? **Yes**, then return the associated value: `Thomas`.
2. `expression` = `%{job}`, `argument` = `job`. Is `job` in the options object? No, return the expression: `%{job}`.
3. `expression` = `%{hobby}`, `argument` = `hobby`. Is `hobby` in the options object? Yes, then return the associated value: `Traveling`.

The result of the translation is: `Hi, your name is Thomas. You are a %{job} and you like Traveling.` That's not rocket science after all! 😉

### Custom interpolation syntax

Now that we saw how to implement interpolation, let's see how to make customizing the interpolation syntax possible. Polyglot allows you to customize the prefix and the suffix so that you can use `{{name}}` or `|name|` instead of `%{name}`.

_"Easy"_, you might think. _"Just change the regex!_". And you would be right, that's what Polyglot does. It uses a custom regex called `tokenRegex` that is built when you create an instance of Polyglot:

```js
function Polyglot(options) {
  var opts = options || {}
  // ...
  this.tokenRegex = constructTokenRegex(opts.interpolation)
}
```

This `tokenRegex` is then passed to `transformPhrase` which is assigned to `interpolationRegex` if it holds a value:

```js
function transformPhrase(phrase, substitutions, locale, tokenRegex) {
  // ...
  var interpolationRegex = tokenRegex || defaultTokenRegex
  // ...
}
```

`constructTokenRegex` is a fairly simple function. Its purpose is to return a new regex based on the given prefix and suffix.

```js
var delimiter = '||||'

// ...

function escape(token) {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function constructTokenRegex(opts) {
  var prefix = (opts && opts.prefix) || '%{'
  var suffix = (opts && opts.suffix) || '}'

  if (prefix === delimiter || suffix === delimiter) {
    throw new RangeError(
      '"' + delimiter + '" token is reserved for pluralization'
    )
  }

  return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g')
}
```

There are two things to consider though:

- We can't choose a prefix or a suffix that is equal to `||||` as it's used for pluralization.
- We **must escape** the prefix and the suffix. But why is that? Well, you'll probably use special characters such as `{`, or `[` or maybe `*`. However, these symbols mean something for the regex, so we need to escape them with a backslash. That's the responsibility of the `escape` function. It will escape any special regex character. More precisely, it will replace the regex symbol by a backslash followed by the matched symbol (corresponds to `$&`).

As an example, `constructTokenRegex({ prefix: '[[', suffix: ']]' })` returns `/\[\[(.*?)\]\]/g` and not `/[[(.*?)]]/g`.

## Smart count and plural groups

Now the second part of `transformPhrase`: pluralization. That one can be tough to build. Indeed, you have to make it possible for Polyglot to choose a phrase among others both based on a number and a locale. For example, did you know that there are no plural forms in Chinese but there are six in Arabic? Also, did you know that in French, zero is singular while it's plural in English? To make pluralization happen, we need to take account of all these rules.

**Note**: you can find all plural rules [here](http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html)

Roughly speaking, here's what Polyglot does:

1. Reference all possible rules and map them to the corresponding locales.
2. When you translate a phrase which has multiple forms, split them based on a delimiter. Thus, you get an array of phrases (more precisely, all the plural forms of the phrase).
3. Retrieve the rule associated to the locale given to Polyglot. This rule takes a number as a parameter and returns another number indicating which plural form to choose.
4. Returns the correct phrase using the number returned by the rule (which acts as an array index).

We are going to detail this step by step.

First, here is an extract of all the rules and their corresponding locales:

```js
var pluralTypes = {
  arabic: function(n) {
    // http://www.arabeyes.org/Plural_Forms
    if (n < 3) {
      return n
    }
    var lastTwo = n % 100
    if (lastTwo >= 3 && lastTwo <= 10) return 3
    return lastTwo >= 11 ? 4 : 5
  },
  bosnian_serbian: russianPluralGroups,
  chinese: function() {
    return 0
  },
  croatian: russianPluralGroups,
  french: function(n) {
    return n > 1 ? 1 : 0
  },
  german: function(n) {
    return n !== 1 ? 1 : 0
  },
  // ...
}

var pluralTypeToLanguages = {
  arabic: ['ar'],
  bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
  chinese: [
    'id',
    'id-ID',
    'ja',
    'ko',
    'ko-KR',
    'lo',
    'ms',
    'th',
    'th-TH',
    'zh',
  ],
  croatian: ['hr', 'hr-HR'],
  german: [
    'fa',
    'da',
    'de',
    'en',
    'es',
    'fi',
    'el',
    'he',
    'hi-IN',
    'hu',
    'hu-HU',
    'it',
    'nl',
    'no',
    'pt',
    'sv',
    'tr',
  ],
  french: ['fr', 'tl', 'pt-br'],
}
```

You can see for example that for a german rule (which includes english), we return the plural form if the number is different than one, otherwise we return the singular form.

Let's come back to `transformPhrase`. Now we can focus on the pluralization part:

```js
function transformPhrase(phrase, substitutions, locale, tokenRegex) {
  // ...

  if (substitutions == null) {
    return phrase
  }

  var result = phrase

  var options =
    typeof substitutions === 'number'
      ? { smart_count: substitutions }
      : substitutions

  if (options.smart_count != null && result) {
    var texts = split.call(result, delimiter)
    result = trim(
      texts[pluralTypeIndex(locale || 'en', options.smart_count)] || texts[0]
    )
  }

  // ...

  return result
}
```

## Other features

Unset, clear, replace, has and onMissing

## What have I learnt
