'use babel';

import MyPackageView from './my-package-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

export default {

  // myPackageView: null,
  // modalPanel: null,
  // subscriptions: null,

  consumeStatusBar(statusBar) {
    this.statusBar = statusBar
  },

  activate() {
    this.myPackageView = new MyPackageView();
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.myPackageView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package:toggle': () => this.show()
    }));
  },

  show() {
    this.myPackageView.activate()
    this.statusBarTile = this.statusBar.addLeftTile({item: this.myPackageView.getElement(), priority: 100})
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    //this.statusBarTile.destroy()
    //this.statusBarTile = null
    this.myPackageView.destroy();
  },

  serialize() {
    return {
      // activate: this.activate
    };
  },

  toggle() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      this.download(selection).then((html) => {
        editor.insertText(html)
      }).catch((error) => {
        atom.notifications.addWarning(error.reason)
      })
      // let reversed = selection.split('').reverse().join('') + 'jyy'
      // editor.insertText(reversed)
    }

    // console.log('MyPackage was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  },

  download(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject({
            reason: 'Unable to download page'
          })
        }
      })
    })
  }

};
