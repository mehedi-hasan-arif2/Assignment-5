# GitHub Issues Tracker - Assignment 05

## 📝 Conceptual Questions & Answers

**1. What is the difference between var, let, and const?**
- `var` is the old way to declare variables. It is function-scoped and can be redeclared anywhere, which sometimes creates bugs.
- `let` is block-scoped, meaning it only works inside the {} where it's defined. We can update its value but can't redeclare it in the same scope.
- `const` is also block-scoped but it's for constants. Once we assign a value, we can't change it or redeclare it.

**2. What is the spread operator (...)?**
The spread operator (three dots) is used to unpack or spread out elements from an array or object. It's very useful for making copies of arrays or merging multiple objects into one without changing the original data.

**3. What is the difference between map(), filter(), and forEach()?**
- `forEach()` is just for looping through an array. It doesn't return anything.
- `map()` loops through an array and returns a brand new array with modified data.
- `filter()` also returns a new array, but only with the elements that pass a specific condition.

**4. What is an arrow function?**
An arrow function is a shorter and more modern way to write functions in JavaScript using the `=>` syntax. It's cleaner than the traditional `function` keyword and handles the `this` context differently, which is great for callbacks.

**5. What are template literals?**
Template literals are strings written with backticks (``) instead of quotes. They allow us to use multi-line strings easily and inject variables directly inside the string using the `${variable}` syntax.