var child_process = require('child_process');
var path = require('path');

module.exports = {

  activate: function () {
    atom.commands.add('atom-workspace', 'native-color-picker:pick', this.pick);
  },

  deactivate: function() {
    if (this.child) {
      kill(this.child.pid, 'SIGKILL');
    }
  },

  pick: function () {
    var child = this.child = child_process.spawn(
      path.resolve(__dirname, '../bin/osx_colorpicker'),
      getStartColor()
    );

    var stdout = new Buffer(0);
    var stderr = new Buffer(0);

    child.stdout.on('data', function (buffer) {
      stdout = Buffer.concat([ stdout, buffer ]);
    });

    child.stderr.on('data', function (buffer) {
      stderr = Buffer.concat([ stderr, buffer ]);
    });

    child.stdout.on('close', function (err) {
      if (!err) {
        var editor = atom.workspace.getActiveTextEditor();
        var selection = editor.getSelectedText();
        var color = stdout.toString();

        if (color.length === 6) {
          if (selection.length === 7) {
            color = '#' + color + ";";
          }
          editor.insertText("#");
          editor.insertText(color);
          editor.insertText(";");
        }
      }
      else {
        editor.insertText("#");
        editor.insertText(stderr.toString());
        editor.insertText(";");
      }
    });
  }
};
/** RegEx for testing for hex colors */
var hexColorRegEx = /^[A-Fa-f0-9]{6}$/;
/**
 * Is the selected color text valid. Currently only supports hexadecimal form.
 */

function isValidColor(text) {
  return hexColorRegEx.test(text);
}

/**
 * Returns the start color arguments for the OS X Color picker app, or
 * undefined, if no start color is selected in the editor.
 */

function getStartColor() {
  var editor = atom.workspace.getActiveTextEditor();
  var selection = editor.getSelectedText();

  if (selection.length === 7) {
    selection = selection.slice(1);
  }

  if (selection.length === 6) {
    return isValidColor(selection) ? [ '-startColor', selection ] : undefined;
  }
}
