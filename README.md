# Test your fear, Wir haben einfach keine Angst

An interactive mobile game designed by Valerie Danzer implemented by [Matthias Steinbauer](https://steinbauer.org/). The game is published live in the third release of the [splace-magazine](http://www.splace-magazine.com/).

A demo version is available [here](https://apps.steinbauer.org/test-your-fear/test-your-fear.html). Make sure that you visit the page with a mobile browser. It makes heavy use of orientation sensors and accelerometers.

# Project status

The [idea and screendesign](docs/concept-screendesign.pdf) of Valerie Danzer is implemented in large parts. Right now 4 out of 5 situations are implemented. The 5th widget would require sound input which is currently not available cross-platform on mobile devices.

# Implementation technology

The widget is based on HTML5, it makes use of the `DeviceMotionEvent` and the `DeviceOrientationEvent`. Further, some of the [jQuery 3.2.1](https://jquery.com) magic is used and CSS is structured with [LESS 2.7.2](http://lesscss.org).

## Preparation

The Live version includes CSS styles from the file `test-your-fear.css` since this is a requirement of the [splace-magazine](http://www.splace-magazine.com/) framework. If changes to the LESS file `test-your-fear.less` are made a `lessc` compile run is requried. Install LESS to the project with:

```
npm -g install less
```

Compile the CSS from the LESS file with

```
lessc test-your-fear.less test-your-fear.css
```

Alternatively use the commented `less.min.js` frontend code in the `test-your-fear.html` file and move the stylesheet reference to a less include.