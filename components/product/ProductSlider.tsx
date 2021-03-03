import { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type SliderProps = {
	images: any;
};

const ProductSlider: FC<SliderProps> = ({ images }) => {
	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	console.log(images);
	return (
		<div>
			<Slider {...settings}>
				{images.map((img: any, i: number) => (
					<div key={i}>
						<img src={img.node.originalSrc} alt={img.node.altText} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ProductSlider;
