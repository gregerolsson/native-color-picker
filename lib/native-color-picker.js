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
      path.resolve(__dirname, '../bin/osx_colorpicker')
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
      var editor = atom.workspace.getActiveTextEditor();

      if (!err) {
        var color = '#' + stdout.toString();

        if (color.length === 7) {
          editor.insertText('#' + stdout.toString());
        }
      }
      else {
        editor.insertText(stderr.toString());
      }
    });
  }
}
