'use babel';

import swapi from 'swapi-node'

export default class MyPackageView {

  constructor() {
    // Create root element
    this.element = document.createElement("div")
    this.element.className = "inline-block swapi"
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  activate() {
    page = Math.floor(Math.random() * 9) + 1
    name = swapi.get(`http://swapi.co/api/people`).then((result) => {
      seq = Math.floor(Math.random() * result.count) + 1
      swapi.getPerson(seq).then((result) => {
        if (this.element.hasChildNodes()) {
          this.element.removeChild(this.element.lastChild)
        }
        console.log(result)
        let newContent = document.createTextNode(`Hello ${result.name}. May the force be with you`)
        this.element.appendChild(newContent)
      })
    })
  }

  getElement() {
    return this.element;
  }

}
