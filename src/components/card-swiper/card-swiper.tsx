import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CardStructure } from '../card-structure';
import { CardSwiperProps } from '../../@types/card.types';

export const CardSwiper = ({ cards, onSlideChange }: CardSwiperProps) => {
	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			navigation={true}
			modules={[Navigation, Pagination]}
			className='mySwiper'
			onSlideChange={swiper => onSlideChange(swiper.realIndex)}
		>
			{cards?.map(card => (
				<SwiperSlide key={card.id}>
					<CardStructure
						name={card.name}
						pan={card.pan}
						expiry_month={card.expiry_month}
						expiry_year={card.expiry_year}
						balance={card.balance}
						id={card.id}
						customer_id={card.customer_id}
						single_card={true}
						owner_name={card.owner_name}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
