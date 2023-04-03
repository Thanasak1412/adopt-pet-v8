import { Component } from "react";

export default class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: "http://pets-images.dev-apis.com/pets/none.jpg",
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={idx}
              className={active === idx ? "active" : ""}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    );
  }
}
