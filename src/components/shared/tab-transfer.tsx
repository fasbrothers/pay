import { Tabs } from '../../@types/profile.types';

interface TabProps {
	tabsType: Tabs[];
	activeTabName: string;
	setActiveTabName: React.Dispatch<React.SetStateAction<string>>;
	setIsSecondTabActive: React.Dispatch<React.SetStateAction<boolean>>;
	setIsThirdTabActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function TabTransfer({
	tabsType,
	activeTabName,
	setActiveTabName,
	setIsSecondTabActive,
	setIsThirdTabActive,
}: TabProps) {
	return (
		<>
			{tabsType.map(tab => (
				<div
					key={tab.id}
					onClick={() => {
						setActiveTabName(tab.code);

						if (tab.code === 'atto') {
							setIsSecondTabActive(false);
							setIsThirdTabActive(true);
						} else if (tab.code === 'card') {
							setIsSecondTabActive(false);
							setIsThirdTabActive(false);
						} else {
							setIsSecondTabActive(true);
							setIsThirdTabActive(false);
						}
					}}
					className={`rounded-[12px] hover:bg-black duration-200 hover:text-white cursor-pointer py-3 px-2 ${
						activeTabName === tab.code ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					{tab.name}
				</div>
			))}
		</>
	);
}

export default TabTransfer;
