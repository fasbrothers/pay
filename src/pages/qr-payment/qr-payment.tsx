import { Skeleton } from 'antd';
import { AllCardsResponse } from '../../@types/card.types';
import { useDataFetching } from '../../hooks/useDataFetching';
import { CardSwiper } from '../../components/card/card-swiper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '../../@types/profile.types';
import Tab from '../../components/shared/tab';
import QrMetro from '../../components/transfer/qr-metro';
import QrBus from '../../components/transfer/qr-bus';
import { BackToPreviousPage } from '../../components/shared/back-to-previous-page';

function QrPayment() {
	const { t } = useTranslation();
	const paymnetType: Tabs[] = t('payment.tab', {
		returnObjects: true,
	}) as Tabs[];

	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [activeTabName, setActiveTabName] = useState<string>(
		paymnetType[0].code
	);
	const [isBusPay, setIsBusPay] = useState<boolean>(false);

	const { isLoading, data: cards } = useDataFetching<AllCardsResponse>(
		'cards',
		'customer/card'
	);

	return (
		<>
			<BackToPreviousPage title={'Qr Payment'} />
			<div className='flex justify-center w-11/12 md:w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-1/3 mx-auto mt-3'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 3 }} />
				) : (
					<>
						<CardSwiper
							cards={cards?.cards || []}
							onSlideChange={setActiveSlideIndex}
						/>
					</>
				)}
			</div>
			{cards && cards?.count > 0 ? (
				<>
					<div className='h-16 bg-gray-100 rounded-2xl flex justify-around items-center w-[200px] mx-auto p-2 gap-x-2 mt-5'>
						<Tab
							tabsType={paymnetType}
							activeTabName={activeTabName}
							setActiveTabName={setActiveTabName}
							isSecondTabActive={isBusPay}
							setIsSecondTabActive={setIsBusPay}
						/>
					</div>

					{!isBusPay ? (
						<QrMetro activeIndex={activeSlideIndex} />
					) : (
						<QrBus activeIndex={activeSlideIndex} />
					)}
				</>
			) : null}
		</>
	);
}

export default QrPayment;
