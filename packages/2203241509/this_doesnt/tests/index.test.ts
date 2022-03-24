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
