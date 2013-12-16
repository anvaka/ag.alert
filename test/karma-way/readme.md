Testing with karma runner
------------------------

Note: this is only experimental example. I must admit karma requires **a lot** 
of work. I frankly think it should be much easier...

Just imagine, to run simple tests I had to:

1. Install Karma
2. Initialize config file for karma
3. Edit karma config file to include angular/jquery dependencies
4. Add angular mocks, which augment global object (`window`).
5. Add karma browserify to make it work nicely with browserify.

It is a lot of work for simple test set up! Frankly this should be as easy as
writing tests in `tap`
