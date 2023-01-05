# Bug Report

There has been a few issues in the past about TypeScript having problems generating correct results around CJS and default export.
But those issues focus on certain aspect of the problem and I couldn't find one that clearly show how big an issue it is.

So I decided to give it a shot and it seems to be worse than I thought.

Here are a few TL;DRs:

When you use `export default` in your code:

- The declaration for CJS is incorrect.

When you consume a package that uses `export default` and transpiled to CJS:

- `module: ES* or Node*` does not produce correct code (runtime error)

When using `moduleResolution: Node16 or NodeNext`:

- You cannot use `allowSyntheticDefaultImports` or `esModuleInterop`, which you must use in `Node` for packages with `export =`

Related issues:

https://github.com/microsoft/TypeScript/issues/50501
https://github.com/microsoft/TypeScript/issues/50152
https://github.com/microsoft/TypeScript/issues/41898

### 🔎 Search Terms

<!--
  What search terms did you use when trying to find an existing bug report?
  List them here so people in the future can find this one more easily.
-->

### 🕗 Version & Regression Information

<!-- When did you start seeing this bug occur?

"Bugs" that have existed in TS for a long time are very likely to be FAQs; refer to
  https://github.com/Microsoft/TypeScript/wiki/FAQ#common-bugs-that-arent-bugs

If possible, please try testing the nightly version of TS to see if it's already been fixed.
For npm: `typescript@next`
This is also the 'Nightly' version in the playground: http://www.typescriptlang.org/play/?ts=Nightly

Note: The TypeScript Playground can be used to try older versions of TypeScript.

Please keep and fill in the line that best applies:
-->
- This is a crash
- This changed between versions ______ and _______
- This is the behavior in every version I tried, and I reviewed the FAQ for entries about _________
- I was unable to test this on prior versions because _______

### ⏯ Playground Link

<!--
  A link to a TypeScript Playground "Share" link which shows this behavior

  The TypeScript Workbench can be used for more complex setups, try
  https://www.typescriptlang.org/dev/bug-workbench/

  As a last resort, you can link to a repo, but these will be slower for us to investigate.
-->
[Playground link with relevant code](https://www.typescriptlang.org/play?#code/PTAEFkE9QYwewCYFNQHM5IM6gBZIE5JA)

### 💻 Code

<!-- Please post the relevant code sample here as well-->
```ts
// We can quickly address your report if:
//  - The code sample is short. Nearly all TypeScript bugs can be demonstrated in 20-30 lines of code!
//  - It doesn't use external libraries. These are often issues with the type definitions rather than TypeScript bugs.
//  - The incorrectness of the behavior is readily apparent from reading the sample.
// Reports are slower to investigate if:
//  - We have to pare too much extraneous code.
//  - We have to clone a large repo and validate that the problem isn't elsewhere.
//  - The sample is confusing or doesn't clearly demonstrate what's wrong.
```

### 🙁 Actual behavior

<!-- What happened, and why it was wrong -->

### 🙂 Expected behavior

<!-- What you expected to happen instead, and why -->
