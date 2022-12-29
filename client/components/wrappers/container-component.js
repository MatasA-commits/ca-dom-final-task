class ContainerComponent{
  htmlElement;

  constructor({children}){

    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'container';
    this.htmlElement.append(
      ...children,
    )
  }
}

export default ContainerComponent;