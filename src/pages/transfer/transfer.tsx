import { Skeleton } from 'antd';
import { useDataFetching } from '../../hooks/useDataFetching';
import { ICardAllResponse } from '../cards/cards';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { CardSwiper } from '../../components/card-swiper';
import TransferForm from '../../components/transfer-form/transfer-form';
import { PanResponse, transferType } from './tranfer-type';

function Transfer() {
	const { isLoading, data: cards } = useDataFetching<ICardAllResponse>(
		'cards',
		'customer/card'
	);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [activeSlideIndexSelf, setActiveSlideIndexSelf] = useState(0);
	const [activeTabName, setActiveTabName] = useState<string>(
		transferType[0].name
	);
	const [input, setInput] = useState<string>('');
	const [isPayCardSelf, setIsCardSelf] = useState<boolean>(false);
	const navigate = useNavigate();
	const query = useQueryClient();

	const { isLoading: transferLoading, mutate: transfer } = useMutation(
		(values: { amount: string }) => {
			if (isPayCardSelf) {
				return httpClient.post('/transaction/transfer/self', {
					fromCardId: cards?.cards[activeSlideIndex].id,
					toCardId: cards?.cards[activeSlideIndexSelf].id,
					amount: +values.amount,
				});
			} else {
				const selectedCardPan = cards?.cards[activeSlideIndex].id;
				const sendCardPan = input;

				return httpClient.post('/transaction/transfer', {
					fromCardId: selectedCardPan,
					toCardPan: sendCardPan,
					amount: +values.amount,
				});
			}
		},
		{
			onSuccess: () => {
				navigate('/cabinet');
				query.invalidateQueries(['profile']);
				toastSuccessMessage('Transfer made successfully');
			},
		}
	);

	const {
		isLoading: panLoading,
		mutate: mutatePan,
		data: panUser,
	} = useMutation(async (pan: string) => {
		const { data } = await httpClient.post<PanResponse>(
			'/customer/card/owner',
			{
				pan,
			}
		);
		return data;
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value.replace(/\s/g, '');
		if (input.length === 16) {
			setInput(input);
			mutatePan(input);
		}
	};
	return (
		<div>
			<div className='h-16 bg-gray-100 rounded-2xl flex justify around items-center w-[300px] p-2 gap-x-2 mt-5'>
				{transferType.map(transfer => (
					<div
						key={transfer.id}
						onClick={() => {
							setActiveTabName(transfer.name);
							if (activeTabName !== transfer.name) {
								setIsCardSelf(!isPayCardSelf);
							}
						}}
						className={`rounded-[12px] hover:bg-black duration-200 hover:text-white cursor-pointer py-3 px-2 ${
							activeTabName === transfer.name
								? 'bg-black text-white'
								: 'bg-gray-100'
						}`}
					>
						{transfer.name}
					</div>
				))}
			</div>
			<div className='flex justify-center w-11/12 md:w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-1/3 mx-auto mt-3'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 3 }} />
				) : (
					<CardSwiper
						cards={cards?.cards || []}
						onSlideChange={setActiveSlideIndex}
					/>
				)}
			</div>
			{isPayCardSelf && (
				<div>
					<div className='text-center mb-2'>From = To</div>
					<div className='flex justify-center w-11/12 md:w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-1/3 mx-auto'>
						{isLoading ? (
							<Skeleton active paragraph={{ rows: 3 }} />
						) : (
							<CardSwiper
								cards={cards?.cards.sort() || []}
								onSlideChange={setActiveSlideIndexSelf}
							/>
						)}
					</div>
				</div>
			)}

			<TransferForm
				onFinish={transfer}
				isPanLoading={panLoading}
				isLoading={transferLoading}
				panUser={panUser}
				handleInputChange={handleInputChange}
				isPayCardSelf={isPayCardSelf}
			/>
		</div>
	);
}

export default Transfer;
