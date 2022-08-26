import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import db1 from "../images/db1.jpg";
import db2 from "../images/db2.jpg";
import db3 from "../images/db3.jpg";

const CarouselComponent = () => {
  return (
    <Carousel
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      emulateTouch={true}
      stopOnHover={true}
    >
      <div>
        <img className="rounded-2xl" src={db1} />
      </div>
      <div>
        <img className="rounded-2xl" src={db2} />
      </div>
      <div>
        <img className="rounded-2xl" src={db3} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
