# JSX

It seems like React component are returning HTML markup. However, this is not the case. The layout of React component s is mostly written using JSX looks like HTML, we are dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into Java Script.

After compiling, our application looks like this:

```
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```

The compilation i shandled by Babel. Projects created with create-react-app or vite are configured to compile automatically. We will learn more about this topic in part 7 of this course.

It is also possible to write React as "pure Javascrip" without using JSX. Althouh, noboody do it.

In pratice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate Javascropt within curly braces. The idea of JSX is quite simlar to manu templating languages, such as Thymeleaf used along with Java Spring, which are used on servers.

JSX is "XML-like ", Which means that every tag needs to be closed. For example a newliine «is an empty element, which in HTML can be written as follows:

<p> Hello World <p> <br>

but when writing JSX, the tag needs to be closed:

```
<br />
```

# Multiple components

Let's modify the file App.jsx as follows:

```
const Hello = () => {
return (
  <div
    <h1 Greetings </h1>
    <>Heloo/>
    <Hello />
    <Hello/>
    <div/>
  )
}


```


NB export at the bottom is left out in these examples, now and in the future. It is still needed for the code to work.

Writing component with React is easy, and by combining componen ts, even a more complex application can be kept fairly maintainable. Indeed, a core philosophy of React is composing applications from many specialized reusable components,

Another strong convention is the idea of a *root component called* Appat the top of the component tree of the application. Nevertheless, as we will learn in part 06 there are situations wher the component *App* is not exactly the root, but is wrapped within an appropriate utility component.
