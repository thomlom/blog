---
title: Test React apps with React Testing Library
date: "2019-10-09"
cover: "cover.jpg"
---

![Red ball light](cover.jpg)

Building web applications is not an easy task as of today. To do so, you're probably using something like React, Vue or Angular. Your app is faster, the code is both more maintainable and readable. But that's not enough. The more your codebase grows, the more complex and buggy it is. So if you care about that, **learn to write tests**. That's what we'll do today for React apps.

Luckily for you, there are already testing solutions for React, especially one: [react-testing-library](https://github.com/testing-library/react-testing-library) made by [Kent C. Dodds](https://kentcdodds.com/). So, let's discover it, shall we?

## Why React Testing Library

Basically, React Testing Library (RTL) is made of simple and complete React DOM testing utilities that encourage good testing practices, especially one:

> The more your tests resemble the way your software is used, the more confidence they can give you. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106)

In fact, developers tend to test what we call **implementation details**. Let's take a simple example to explain it. You want to create a counter that you can both increment and decrement. Here is the implementation (with a class component) and its two according tests: the first one is written with [Enzyme](https://github.com/airbnb/enzyme) and the other one with React Testing Library.

```jsx
// counter.js
import React from "react";

class Counter extends React.Component {
  state = { count: 0 };
  increment = () => this.setState(({ count }) => ({ count: count + 1 }));
  decrement = () => this.setState(({ count }) => ({ count: count - 1 }));
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
```

```jsx
// counter-enzyme.test.js
import React from "react";
import { shallow } from "enzyme";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.state("count")).toBe(0);

    wrapper.instance().increment();
    expect(wrapper.state("count")).toBe(1);

    wrapper.instance().decrement();
    expect(wrapper.state("count")).toBe(0);
  });
});
```

```jsx
// counter-rtl.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    fireEvent.click(incrementButton);
    expect(counter.textContent).toEqual("1");

    fireEvent.click(decrementButton);
    expect(counter.textContent).toEqual("0");
  });
});
```

**Note**: Don't worry if you don't fully understand the test files, we'll see all of this afterwards 😉

Can you guess which test file is the best one and why? If you're not used to tests, you may think that both are fine. In fact, the two tests make sure that the counter is incremented and decremented. However, the first one is testing implementation details and it has two risks:

- **false positive**: the test passes even if the code is broken.
- **false negative**: the test is broken even if the code is right.

Let's illustrate these two points. Let's say you want to refactor your components because you want to make it possible to set any count value. So you remove your `increment` and `decrement` methods and then add a new `setCount` method. Let's say you forgot to wire this new method to your different buttons:

```jsx
// counter.js
export default class Counter extends React.Component {
  state = { count: 0 };
  setCount = count => this.setState({ count });
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
```

The first test (Enzyme) will pass, but the second one (RTL) will fail. Indeed, the first one doesn't care if your buttons are **correctly wired** to the methods. It just looks at the implementation itself, that is to say your `increment` and `decrement` method. This is a **false positive.**

Now, let's say it's November 2018, you hear about hooks everywhere and you decide to try them out on your favorite counter, thus you change its implementation:

```jsx
// counter.js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

This time, the first test is going to be broken even if your counter still works. This is a **false negative**! Enzyme will complain about `state` not being able to work on functional components:

```sh
ShallowWrapper::state() can only be called on class components
```

Then you have to change the test:

```jsx
import React from "react";
import { shallow } from "enzyme";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const setValue = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(initialValue => [initialValue, setValue]);
    const wrapper = shallow(<Counter />);

    wrapper
      .find("button")
      .last()
      .props()
      .onClick();
    expect(setValue).toHaveBeenCalledWith(1);
    // We can't make any assumptions here on the real count displayed
    // In fact, the setCount setter is mocked!

    wrapper
      .find("button")
      .first()
      .props()
      .onClick();
    expect(setValue).toHaveBeenCalledWith(-1);
  });
});
```

To be honest, I'm not even sure if this is the right way to test it with Enzyme when it comes to hooks. In fact, we can't even make assumptions on the displayed count because of the mocked setter.

However, the test without implementation details work as expected in all cases! So, if you had something to retain so far, it would be to **avoid testing implementation details**.

**Note**: I'm not saying Enzyme is bad. I'm just saying testing implementation details is going to make your tests harder to maintain and unreliable. In this article, we are going to use React Testing Library because it encourages testing best practices.

## Decompose a simple test step-by-step

Maybe there is still an air of mistery around the test written with React Testing Library. As a reminder, here it is:

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./app";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    fireEvent.click(incrementButton);
    expect(counter.textContent).toEqual("1");

    fireEvent.click(decrementButton);
    expect(counter.textContent).toEqual("0");
  });
});
```

Let's decompose it to understand how they're made of. Introducing the **AAA** pattern: **Arrange, Act, Assert**.

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./app";

describe("<Counter />", () => {
  it("properly increments the counter", () => {
    // Arrange
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    // Act
    fireEvent.click(incrementButton);
    // Assert
    expect(counter.textContent).toEqual("1");

    // Act
    fireEvent.click(decrementButton);
    // Assert
    expect(counter.textContent).toEqual("0");
  });
});
```

Almost of your tests will be written that way. First, you **arrange** (= setup) your code so that everything is ready for the next steps. Then, you **act**, you perform the steps a user is supposed to do (such as a click). Finally, you make **assertions** on what is supposed to happen.

## Arrange

In our test, we've done two tasks in the arrange part:

- Render the component
- Getting the different elements of the DOM needed.

You can do so with `render` which is part of RTL's API. Its signature is the following:

```jsx
function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult
```

Where `ui` is the component to mount. You can provide some options but they are not often needed so, I let you check out what's possible [in the docs](https://testing-library.com/docs/react-testing-library/api#render-options).

Basically, all this function does is that it [renders your component](https://github.com/testing-library/react-testing-library/blob/d0149e8ae498bdc02ee88d86546d76d6b7772ba1/src/pure.js#L52) using `ReactDOM.render` (or hydrate for server-side rendering) in a newly created `div` appended directly to `document.body`. As a result, you get a lot of queries from [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/api-queries) and some other useful methods such as [debug](https://testing-library.com/docs/react-testing-library/api#debug), [rerender](https://testing-library.com/docs/react-testing-library/api#rerender) or [unmount](https://testing-library.com/docs/react-testing-library/api#unmount).

But what are these queries, you may think? There are just utilities that allow you to query the DOM like a user would do it: finding elements by label text, by placeholder, by title. Here are some queries examples taken from [the docs](https://testing-library.com/docs/dom-testing-library/api-queries#queries):

- `getByLabelText`: searches for the label that matches the given text passed as an argument, then find the element associated with that label.
- `getByText`: search for all elements that have a text node with textContent matching the given text passed as an argument.
- `getByTitle`: returns the element that has a `title` attribute matching the given text passed as an argument.
- `getByPlaceholderText`: searches for all elements with a `placeholder` attribute and find one that matches the given text passed as an argument.

There are many variants to a particular query:

- `getBy`: return the first matching node for a query, and throw an error if no elements match or if more than one match is found.
- `getAllBy`: return an array of all matching nodes for a query, and throw an error if no elements match.
- `queryBy`: return the first matching node for a query, and return null if no elements match. This is useful for asserting an element that is not present.
- `queryAllBy`: return an array of all matching nodes for a query, and return an empty array (`[]`) if no elements match.
- `findBy`: return a **promise** which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 4500ms.
- `findAllBy`: return a **promise** which resolves to an array of elements when any elements are found which match the given query.

For more informations, one more time, [check the docs](https://testing-library.com/docs/dom-testing-library/api-queries#variants), they're easy to understand, well-written and full of great examples.

Let's come back to our example:

```jsx
const { getByText } = render(<Counter />);
const counter = getByText("0");
const incrementButton = getByText("+");
const decrementButton = getByText("-");
```

In this example, you can see that we first render the `<Counter/>`. The base element of this component will look like the following:

```jsx
<body>
  <div>
    <Counter />
  </div>
</body>
```

Then, thanks to `getByText`, we query the increment button, the decrement button and the counter. Hence, we will get for each button an instance of [HTMLButtonElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLButtonElement) and for the counter an instance of [HTMLParagraphElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement).

## Act

Now that everything is properly setup, we can act. For that, we use most of the time `fireEvent` from [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/api-events) whose signature is the following:

```jsx
fireEvent(node: HTMLElement, event: Event)
```

Simply put, this function takes a DOM node (that you can query with the queries seen above!) and fires DOM events such as `click`, `focus`, `change`, etc. There are a lot of other events you can dispatch that you can find [here](https://github.com/testing-library/dom-testing-library/blob/dbbea6ee514399d0b37690ce5c56bb21f5ae2cb3/src/events.js#L1).

Our example is fairly simple as we just want to click a button, so we simply do:

```jsx
fireEvent.click(incrementButton);
// OR
fireEvent.click(decrementButton);
```

## Assert

Here comes the last part. Firing an event usually trigger some changes in your app. So we must do some assertions to make sure these changes happened. In our test, a good way to do so is to make sure the count rendered to the user has changed. Thus, we just have to assert the `textContent` property of `counter` is incremented or decrement:

```jsx
expect(counter.textContent).toEqual("1");
expect(counter.textContent).toEqual("0");
```

And tadaaa! You successfully wrote a test that doesn't test implementation details 🥳

**Note**: This AAA pattern is not specific to Testing Library. In fact, it's even the general structure of any test case. I showed you this here because I found it interesting to see how Testing Library makes it convenient to write your tests in every part.

## More on fireEvent and better assertions with jest-dom

Let's go deeper in this part by testing a more complex example. The app we're going to test is a simple to-do app whose features are the following:

- Add a new to-do
- Mark a to-do as completed or active
- Remove a to-do
- Filter the to-dos: all, active and done to-dos

Yes I know, you may be sick of to-do apps in every tutorial, but hey, they're great examples!

Here is the code:

```jsx
import React from "react";

function Todos({ todos: originalTodos }) {
  const filters = ["all", "active", "done"];
  const [input, setInput] = React.useState("");
  const [todos, setTodos] = React.useState(originalTodos || []);
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);

  const addTodo = e => {
    if (e.key === "Enter" && input.length > 0) {
      setTodos(todos => [{ name: input, done: false }, ...todos]);
      setInput("");
    }
  };

  // Make use of useMemo to avoid filtering the todos on every re-render
  const filteredTodos = React.useMemo(
    () =>
      todos.filter((todo, i) => {
        if (activeFilter === "all") {
          return todo;
        }

        if (activeFilter === "active") {
          return !todo.done;
        }

        if (activeFilter === "done") {
          return todo.done;
        }
      }),
    [todos, activeFilter]
  );

  const toggle = index => {
    setTodos(todos =>
      todos.map((todo, i) =>
        index === i ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const remove = index => {
    setTodos(todos => todos.filter((todo, i) => i !== index));
  };

  return (
    <div>
      <h2 className="title">To-dos</h2>
      <input
        className="input"
        onChange={e => setInput(e.target.value)}
        onKeyDown={addTodo}
        value={input}
        placeholder="Add something..."
      />
      <ul className="list-todo">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(({ name, done }, i) => (
            <li
              key={`${name}-${i}`}
              className="todo-item"
              data-testid={`todo-${i}`}
            >
              <input
                data-testid="checkbox"
                type="checkbox"
                checked={done}
                onChange={() => toggle(i)}
              />
              <div className="todo-infos">
                <span className={`todo-name ${done ? "todo-name-done" : ""}`}>
                  {name}
                </span>
                <button className="todo-delete" onClick={() => remove(i)}>
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">No to-dos!</p>
        )}
      </ul>
      <ul className="list-filters">
        {filters.map(filter => (
          <li
            key={filter}
            className={`filter ${
              activeFilter === filter ? "filter-active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
```

## Add a new to-do

You saw previously how `fireEvent` allows you to click on a button queried with RTL queries functions (such as `getByText`). Let's see how to use the other events. In this app, we can add a new to-do by writing something in the input and then pressing the `Enter` key. Thus, we'll need to dispatch two events: `change` to add a text in the input and `keyDown` to press the enter key. Let's write a first part of the test:

```jsx
// Using getByPlaceholderText here is convenient
// since it's visible to a real user and specific to an input
const { getByPlaceholderText, getByText } = render(<App />);
const input = getByPlaceholderText("Add something...");
const todo = "Read Master React Testing";

getByText("No to-dos!");

fireEvent.change(input, { target: { value: todo } });
fireEvent.keyDown(input, { key: "Enter" });
```

In this code, we:

1. Query the input by its placeholder
2. Declare the to-do we're going to add
3. Assert there were no to-dos using `getByText` (if `No to-dos!` was not in the app, `getByText` would throw)
4. Add the to-do in the input
5. Press the enter key.

One thing that may surprises you is the second argument we pass to `fireEvent`. Maybe you would expect it to be a single string instead of an object with a `target` property. `fireEvent` dispatches an event to mimic what happens in a real app (it makes use of [dispatchEvent](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/dispatchEvent) under the hood). Thus, you need to dispatch the event as it would happen in your app, that includes setting the `target` property. The same logic goes for the `keyDown` event and the `key` property.

What should happen if we add a new to-do?

- There should be a new item in the list
- The input should be empty

Hence, we need to query somehow the new item in the DOM and make sure the `value` property of the input is empty:

```jsx
getByText(todo);
expect(input.value).toBe("");
```

The full test becomes:

```jsx
test("adds a new to-do", () => {
  const { getByPlaceholderText, getByText } = render(<Todos />);
  const input = getByPlaceholderText(/add something/i);
  const todo = "Read Master React Testing";

  getByText("No to-dos!");

  fireEvent.change(input, { target: { value: todo } });
  fireEvent.keyDown(input, { key: "Enter" });

  getByText(todo);
  expect(input.value).toBe("");
});
```

## jest-dom

The more you'll write tests with RTL, the more you'll have to write assertions for your different DOM nodes. Writing such assertions can sometimes be repetitive and a little bit hard to read. For that, you can install another `testing-library` tool called `jest-dom`. As stated on their [repository](https://github.com/testing-library/jest-dom), `jest-dom` provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.

There are many matchers you can use such as:

- [toBeInTheDocument](https://github.com/testing-library/jest-dom#tobeinthedocument)
- [toBeDisabled](https://github.com/testing-library/jest-dom#tobedisabled)
- [toHaveTextContent](https://github.com/testing-library/jest-dom#tohavetextcontent)
- [toHaveValue](https://github.com/testing-library/jest-dom#tohavevalue)
- And more!

You can install it with the following command:

```sh
npm install --save-dev @testing-library/jest-dom
```

Then, you have to import the package **once** to extend the Jest matchers:

```jsx
import "@testing-library/jest-dom/extend-expect";
```

**Note**: I recommend that you do that in `src/setupTests` if you use [Create React App](https://create-react-app.dev/docs/running-tests#src-setuptestsjs-1). If you don't use CRA, import it in one of the files defined in the [`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array) key of your Jest config.

Let's come back to our test. By installing `jest-dom`, it would become:

```jsx
test("adds a new to-do", () => {
  const { getByPlaceholderText, getByText } = render(<App />)
  const input = getByPlaceholderText(/add something/i)
  const todo = "Read Master React Testing"
  getByText("No to-dos!")

  fireEvent.change(input, { target: { value: todo } })
  fireEvent.keyDown(input, { key: "Enter" })

  getByText(todo)
  // Only this part changes 👇
  expect(input).toHaveValue("")
```

It's not much, but it's more readable, especially when you write a lot of assertions.

If we were to rewrite the counter test, we could use `toHaveTextContent` for example:

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    fireEvent.click(incrementButton);
    expect(counter).toHaveTextContent("1");

    fireEvent.click(decrementButton);
    expect(counter).toHaveTextContent("0");
  });
});
```

**💡 If you would like to see more test examples on this to-do app, I created a repo that contains all the examples of this article [right here](https://github.com/thomlom/react-testing-library-examples)!**

## Asynchronous tests

I agree, the counter and the to-do app are contrived examples. In fact, most real-world applications involve asynchronous actions: data fetching, lazy-loaded components, etc. Thus, you need to handle these actions in your tests. Luckily for us, RTL gives us asynchronous utilities like `wait` or `waitForElement`.

In this part, we will use a very simple posts app whose features are the following:

- Create a post
- See the newly created post in a list of posts
- See an error if something have gone wrong while creating the post.

Here is the code and the associated app. Try it out.

```jsx
// app.js
import React from "react";

import { addPost } from "./api";

function App() {
  const [posts, addLocalPost] = React.useReducer((s, a) => [...s, a], []);
  const [formData, setFormData] = React.useReducer((s, a) => ({ ...s, ...a }), {
    title: "",
    content: "",
  });
  const [isPosting, setIsPosting] = React.useState(false);
  const [error, setError] = React.useState("");

  const post = async e => {
    e.preventDefault();

    setError("");

    if (!formData.title || !formData.content) {
      return setError("Title and content are required.");
    }

    try {
      setIsPosting(true);
      const {
        status,
        data: { id, ...rest },
      } = await addPost(formData);
      if (status === 200) {
        addLocalPost({ id, ...rest });
      }
      setIsPosting(false);
    } catch (error) {
      setError(error.data);
      setIsPosting(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={post}>
        <h2>Say something</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Your title"
          onChange={e => setFormData({ title: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="Your post"
          onChange={e => setFormData({ content: e.target.value })}
          rows={5}
        />
        <button className="btn" type="submit" disabled={isPosting}>
          Post{isPosting ? "ing..." : ""}
        </button>
      </form>
      <div>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

```js
// api.js
let nextId = 0;

export const addPost = post => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({ status: 200, data: { ...post, id: nextId++ } });
      } else {
        reject({
          status: 500,
          data: "Something wrong happened. Please, retry.",
        });
      }
    }, 500);
  });
};
```

Let's test the post creation feature. To do so, we need to:

1. Mock the API to make sure a creation resolves with a good result
2. Fill in the tile
3. Fill in the content of the post
4. Click the Post button

Let's first query the corresponding elements.

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { addPost as addPostMock } from "./api";
import Posts from "./Posts";

jest.mock("./api");

describe("Posts", () => {
  test("adds a post", async () => {
    addPostMock.mockImplementation(post => {
      return Promise.resolve({ status: 200, data: { ...post, id: 1 } });
    });
    const { getByPlaceholderText, getByText, debug } = render(<Posts />);
    const title = getByPlaceholderText(/title/i);
    const content = getByPlaceholderText(/post/i);
    const button = getByText(/post/i);
    const postTitle = "This is a post";
    const postContent = "This is the content of my post";
  });
});
```

You can see I've queried them differently this time. Indeed, the queries also accept a **regular expression as an argument.** It can be handy if you want to quickly query a long text or if you want to query a substring of your sentence in case you're still not sure of the wording.

For example, I know the placeholder of my content should include the word _"post"_ but I know the placeholder is going to change and I don't want my tests to break because of a simple change. So I use:

```jsx
const content = getByPlaceholderText(/post/i);
```

**Note**: for the same reason, I use `i` to make the search case-insensitive.

Then, we have to fire the corresponding events and make sure the post have been added. Let's try it out:

```jsx
test("adds a post", () => {
  addPostMock.mockImplementation(post => {
    return Promise.resolve({ status: 200, data: { ...post, id: 1 } });
  });
  const { getByPlaceholderText, getByText, queryByText } = render(<Posts />);
  const title = getByPlaceholderText(/title/i);
  const content = getByPlaceholderText(/post/i);
  const button = getByText(/post/i);
  const postTitle = "This is a post";
  const postContent = "This is the content of my post";

  fireEvent.change(title, { target: { value: postTitle } });
  fireEvent.change(content, { target: { value: postContent } });
  fireEvent.click(button);

  // Oops, this will fail ❌
  expect(queryByText(postTitle)).toBeInTheDocument();
  expect(queryByText(postContent)).toBeInTheDocument();
});
```

If you would run this test, it wouldn't work! In fact, RTL can't query your post title! But why? To answer that question, I'll have to introduce you to one of your next best friends: `debug`.

## debug

Simply put, `debug` is a utility function returned by `render` that prints out a representation of your component's associated DOM. Let's use it:

```jsx
test("adds a post", () => {
  addPostMock.mockImplementation(post => {
    return Promise.resolve({ status: 200, data: { ...post, id: 1 } });
  });
  const { getByPlaceholderText, getByText, queryByText, debug } = render(
    <Posts />
  );
  const title = getByPlaceholderText(/title/i);
  const content = getByPlaceholderText(/post/i);
  const button = getByText(/post/i);
  const postTitle = "This is a post";
  const postContent = "This is the content of my post";

  fireEvent.change(title, { target: { value: postTitle } });
  fireEvent.change(content, { target: { value: postContent } });
  fireEvent.click(button);

  debug();

  expect(queryByText(postTitle)).toBeInTheDocument();
  expect(queryByText(postContent)).toBeInTheDocument();
});
```

In our case, `debug` outputs something similar to this:

```html
<body>
  <div>
    <div>
      <form class="form">
        <h2>
          Say something
        </h2>
        <input placeholder="Your title" type="text" />
        <textarea placeholder="Your post" rows="5" type="text" />
        <button class="btn" disabled="" type="submit">
          Post ing...
        </button>
      </form>
      <div />
    </div>
  </div>
</body>
```

Now that you know what your DOM looks like, we can guess what's happening. The post hasn't been added. If you closely pay attention, you can see the button's text is now `Posting` instead of `Post`.

Do you know why? Because posting a post is **asynchronous** and we're trying to execute the tests without waiting for the asynchronous actions. We're just in the **Loading** phase. What we can only do for now is to make sure we indicate the user that stuff is going on:

```jsx
test("adds a post", () => {
  addPostMock.mockImplementation(post => {
    return Promise.resolve({ status: 200, data: { ...post, id: 1 } });
  });
  const { getByPlaceholderText, getByText } = render(<Posts />);
  const title = getByPlaceholderText(/title/i);
  const content = getByPlaceholderText(/post/i);
  const button = getByText(/post/i);
  const postTitle = "This is a post";
  const postContent = "This is the content of my post";

  fireEvent.change(title, { target: { value: postTitle } });
  fireEvent.change(content, { target: { value: postContent } });
  fireEvent.click(button);

  expect(button).toHaveTextContent("Posting");
  expect(button).toBeDisabled();
});
```

## wait and waitForElement

Luckily for us, we can do something about that. More precisely, RTL can do something about that with [asynchronous utilities](https://testing-library.com/docs/dom-testing-library/api-async) such as `wait` whose signature is the following:

```ts
function wait(
  callback?: () => void,
  options?: {
    timeout?: number;
    interval?: number;
  }
): Promise<void>;
```

Simply put, `wait` takes a callback which contains expectations and wait for a certain time until these expectation passes.

By default this certain time is at most `4500ms` at an interval of `50ms` (the first function call is fired immediately). So, we're going to make use of that function and put our initial assertions in it. The full test now becomes:

```jsx
import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

// ...

describe("Posts", () => {
  test("adds a post", async () => {
    // ...
    fireEvent.click(button);

    expect(button).toHaveTextContent("Posting");
    expect(button).toBeDisabled();

    await wait(() => {
      getByText(postTitle);
      getByText(postContent);
    });
  });
});
```

It passes! 🎉

There are also different ways to do what we just did above. Indeed, we mocked our API call so it's supposed to resolve **immediately**. In that case, we would just have to wait for one tick of the [event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ). That's possible with `wait` too. Just give it no callback and run your assertions after it:

```jsx
import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

// ...

describe("Posts", () => {
  test("adds a post", async () => {
    // ...
    fireEvent.click(button);

    expect(button).toHaveTextContent("Posting");
    expect(button).toBeDisabled();

    await wait();
    getByText(postTitle);
    getByText(postContent);
  });
});
```

But now what if instead trying every `50ms`, you could have a way to observe the DOM of your component and somehow be notified of its change? It would be convenient for us, isn't it? That's what `waitForElement` is made for:

```jsx
import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

// ...

describe("Posts", () => {
  test("adds a post", async () => {
    // ...
    fireEvent.click(button);

    expect(button).toHaveTextContent("Posting");
    expect(button).toBeDisabled();

    await waitForElement(() => getByText(postTitle));
    getByText(postContent);
  });
});
```

**Note**: In our example we can safely run the assertions for the rest of our content (just after the `await` statement) as if there is a title, it means our API returned us the full post.

**Second note:** `waitForElement` makes use of [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) under the hood. I recommend you to [check it out](https://github.com/testing-library/dom-testing-library/blob/master/src/wait-for-element.js) if you're curious.

Last but not least, you can also verify a post have been added with `findBy*` [queries](https://github.com/testing-library/dom-testing-library/blob/master/src/query-helpers.js#L70) which is just a combination of `getBy*` queries and `waitForElement`:

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// ...

describe("Posts", () => {
  test("adds a post", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<Posts />);

    // ...

    expect(button).toHaveTextContent("Posting");
    expect(button).toBeDisabled();

    await findByText(postTitle);
    getByText(postContent);
  });
});
```

**Note**: remember, `findByText` is asynchronous! If you find yourself forgetting the `await` statement a little bit too much, I encourage you to install the following plugin: [eslint-plugin-testing-library](https://github.com/Belco90/eslint-plugin-testing-library), it contains a rule that prevent you to do so! 😉

Pheeeew! That part was not easy.

Hopefully, these three examples allowed you to have an in-depth look at how you can start to write tests for your React apps, but that's just the tip of the iceberg! A complex app often makes use of `react-router`, `redux`, React's Context, third-party libraries (`react-select` for example). So how to write tests that take account of these problems? Well, I think this article is already enough for you, but who knows, maybe I'll write another article on these subjects... 😏
