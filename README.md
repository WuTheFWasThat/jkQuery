# jkQuery

This is a very simple library, intended to act as a wrapper around jQuery to slow it down.

It may be useful for simulating slow page load.

It is a work in progress.

## USAGE ##

First, include this script src this right after your include of jQuery.

    <script src="jquery.js"></script>
    <script src="jkquery.js"></script>

jkQuery is put in the global namespace as `$$`.
To replace jQuery with jkQuery, simply add:

    <script> var $ = $$; </script>

or

    <script> var jQuery = $$; </script>

You can still access the original jQuery via `$$.$`.

jkQuery can also be configured:

    <script>
      var $ = $$.$$(config);
    </script>

### Configuration ###

By default, jkQuery slows things down by 1 second.
To adjust this, simply call

    $$.$$({ delay: 300 });

to change to 300ms, or

    $$.$$({
      delay: function() {
        var delay = 0;
        for (var i = 0; i < 1000; i++) {
          if (Math.random() < 0.3) {
            delay += 1;
          }
        }
      }
    });

to simulate latency drawn from a Poisson distribution.

More to come...
