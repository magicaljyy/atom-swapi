'use babel';

import MyPackageView from './my-package-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

export default {

  config: {
    activateOnStart: {
      type: 'boolean',
      default: 'true',
    }
  },

  active: true,

  consumeStatusBar(statusBar) {
    this.statusBar = statusBar
    if (atom.config.get('my-package.activateOnStart')) {
      this.show()
    }
  },

  activate(state) {
    this.state = state
    this.myPackageView = new MyPackageView();
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
    this.subscriptions.dispose();
    this.myPackageView.destroy();
  },

  serialize() {
    return {
      activateOnStart: atom.config.get('my-package.activateOnStart'),
      active: this.active
    };
  },

};
