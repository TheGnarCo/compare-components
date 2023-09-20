This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This was to test the general performance structure of `React.Component`, `React.PureComponent`,
Functional Stateless Components (FSCs) and `React.memo`ized FSCs.

Users can toggle various settings in a terribly built UI to compare rendering times in a way that
possibly reflects regular production environments:

* Toggle the number of props: More props mean pure/memoized components take more time to
do shallow comparisons
* Toggle the number of components rendered
* Toggle the complexity of components: in an arbitrary way to see when the benefit of avoiding
render complexity overcomes the time taken to shallow compare props
* Toggle the purity and functional-ness of components
* Toggle whether components receive the same props on successive renders or if a passed prop is
mutated to trigger re-renders in pure/memoized components

Just clone, install with `yarn` or `npm`, and run `yarn start` or `npm start` to mess around.
If you want more reliable data, do `yarn build` or `npm build` and then host the result using
https://www.npmjs.com/package/serve or python simple HTTP server or whatever you'd like.

### TODO
Comments
Breaking components into separate files

## About The Gnar Company

<a href="https://www.thegnar.com/">
    <img alt="The Gnar Company" src="https://avatars0.githubusercontent.com/u/17011419?s=100&v=4" />
</a>

If you’re ready to dream it, we’re ready to build it. The Gnar is a custom software company ready to tackle your biggest challenges. Visit [The Gnar Company website](https://www.thegnar.com/) to learn more about us or [contact us](https://www.thegnar.com/contact) to see how we can help design and develop your product.
