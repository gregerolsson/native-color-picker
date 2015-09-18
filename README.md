# OS X Color Picker

> **Note**: Currently only works on OS X. Windows support can probably be added on (pull) request.

A simple color picker that uses the handy and trusted OS X color picker
that also includes the very useful eye dropper for picking a color from
any pixel on screen.

Activate with `Shift`-`Cmd`-`C` or from the context-menu of your editor (right-click).
Inserts or replaces the currently selected text with the selected color, in hexadecimal form.

![OS X Native Color Picker](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

## Roadmap

* Make the insertion mechanism a little smarter so it detects if a
  color is already under the cursor; the color text will be automatically selected
  and replaced when picking.
* Seed the picker with any color already under the cursor
* Use the same color format during insertion, as any color already under the cursor
* Allow only bright pink to be picked.
