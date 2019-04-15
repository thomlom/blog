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
polyglot.extends({
  thing: 'There is %{smart_count} thing |||| There are %{smart_count} things',
})
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

## Translate a phrase

## Nested objects

## Unset, clear, replace and has

## Interpolation and token

## Locale

## Smart count and Plural groups

## What have I learnt
