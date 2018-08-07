import React from 'react';
import ReactDOM from 'react-dom';

const modal = document.getElementById('gallery');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // creating a div that we'll render the modal into
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // append the element into the DOM on mount
    modal.appendChild(this.el);
  }

  componentWillUnmount() {
    // remove the element from the DOM when we unmount
    modal.removeChild(this.el);
  }

  render() {
    // use a portal to render the children into the element
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
