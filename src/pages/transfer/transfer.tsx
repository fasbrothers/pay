import { Skeleton } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { CardSwiper } from '../../components/card/card-swiper';
import TransferForm from '../../components/transfer/transfer-form';
import SouthIcon from '@mui/icons-material/South';
import { OutletContextType, PanResponse } from '../../@types/card.types';
import Tab from '../../components/shared/tab';
import { Tabs } from '../../@types/profile.types';
import { useTranslation } from 'react-i18next';

function Transfer() {
	const { t } = useTranslation();
	const [isLoading, cards] = useOutletContext() as OutletContextType;

	const transferType: Tabs[] = t('transfer.tab', {
		returnObjects: true,
	}) as Tabs[];

	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [activeSlideIndexSelf, setActiveSlideIndexSelf] = useState(0);
	const [activeTabName, setActiveTabName] = useState<string>(
		transferType[0].code
	);
	const [input, setInput] = useState<string>('');
	const [isPayCardSelf, setIsPayCardSelf] = useState<boolean>(false);
	const navigate = useNavigate();
	const query = useQueryClient();

	const { isLoading: transferLoading, mutate: transfer } = useMutation(
		async (values: { amount: string }) => {
			if (isPayCardSelf) {
				const { data } = await httpClient.post('/transaction/transfer/self', {
					fromCardId: cards?.uzcard[activeSlideIndex].id,
					toCardId: cards?.uzcard[activeSlideIndexSelf].id,
					amount: +values.amount,
				});
				data.message ? toastSuccessMessage(data.message) : null;
				return data;
			} else {
				const selectedCardPan = cards?.uzcard[activeSlideIndex].id;
				const sendCardPan = input;

				const { data } = await httpClient.post('/transaction/transfer', {
					fromCardId: selectedCardPan,
					toCardPan: sendCardPan,
					amount: +values.amount,
				});
				data.message ? toastSuccessMessage(data.message) : null;
				return data;
			}
		},
		{
			onSuccess: () => {
				navigate('/cabinet/transactions');
				query.invalidateQueries(['profile']);
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
			{cards?.uzcard?.length > 0 && (
				<div className='h-16 bg-gray-100 rounded-2xl flex justify-around items-center w-[350px] p-2 gap-x-2 mt-5'>
					<Tab
						tabsType={transferType}
						activeTabName={activeTabName}
						setActiveTabName={setActiveTabName}
						isSecondTabActive={isPayCardSelf}
						setIsSecondTabActive={setIsPayCardSelf}
					/>
				</div>
			)}
			<div className='flex justify-center w-11/12 md:w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-1/3 mx-auto mt-3'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 3 }} />
				) : (
					<CardSwiper
						cards={cards?.uzcard || []}
						onSlideChange={setActiveSlideIndex}
					/>
				)}
			</div>
			{isPayCardSelf && (
				<div>
					{cards?.uzcard?.length > 0 && (
						<div className='text-center mb-2 text-gray-400'>
							<SouthIcon sx={{ fontSize: '50px' }} />
						</div>
					)}

					<div className='flex justify-center w-11/12 md:w-4/5 lg:w-2/3 xl:w-3/5 2xl:w-1/3 mx-auto'>
						{isLoading ? (
							<Skeleton active paragraph={{ rows: 3 }} />
						) : (
							<CardSwiper
								cards={cards?.uzcard || []}
								onSlideChange={setActiveSlideIndexSelf}
							/>
						)}
					</div>
				</div>
			)}

			{cards?.uzcard?.length > 0 && (
				<TransferForm
					onFinish={transfer}
					isPanLoading={panLoading}
					isLoading={transferLoading}
					panUser={panUser}
					handleInputChange={handleInputChange}
					isPayCardSelf={isPayCardSelf}
				/>
			)}
		</div>
	);
}

export default Transfer;
