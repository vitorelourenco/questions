Question:

I'm under the impression that jest.spyOn.mockImplementationOnce can mock a function as long as it is implemented as a function expression, but might fail to mock when the function is written as a function declaration. Why is it behaving like that?

I have one TS file in the folder \*/this_works with the following code:

```
export function myFunction() {
  return myOtherFunction();
}

export const myOtherFunction = function() {
  return 'something';
};
```

And then another TS file in the folder \*/this_doesnt with the following code:

```
export function myFunction() {
  return myOtherFunction();
}

export function myOtherFunction() {
  return 'something';
}
```

The only difference between them is that `myOtherFunction` is either a function declaration or a function expression.

Both files are submitted to the same test with `jest`.

```
import * as myModule from '../index';

describe('myFunction', () => {
  it('does something', () => {
    jest
        .spyOn(myModule, 'myOtherFunction')
        .mockImplementationOnce(
            function() {
              return 'hello jest';
            },
        );
    const result = myModule.myFunction();
    expect(result).toEqual('hello jest');
  });
});
```

All code can be found at my [playground repo's folder]()

The result is that the function expression is mocked and the test passes, while the function declaration is not mocked and the test fails.

Anecdotally, this seems to only happen if the function being mocked is not being called directly, instead it is being called by another function. When the declared function gets called directly, the tests passes.

I would like to understand why that is so I can write better tests. 
