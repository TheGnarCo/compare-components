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
