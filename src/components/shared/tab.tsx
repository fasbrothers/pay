import { Tabs } from '../../@types/profile.types';

interface TabProps {
	tabsType: Tabs[];
	activeTabName: string;
	setActiveTabName: React.Dispatch<React.SetStateAction<string>>;
	isSecondTabActive: boolean;
	setIsSecondTabActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tab({
	tabsType,
	activeTabName,
	setActiveTabName,
	isSecondTabActive,
	setIsSecondTabActive,
}: TabProps) {
	return (
		<>
			{tabsType.map(tab => (
				<div
					key={tab.id}
					onClick={() => {
						setActiveTabName(tab.code);
						if (activeTabName !== tab.code) {
							setIsSecondTabActive(!isSecondTabActive);
						}
					}}
					className={`rounded-[12px] hover:bg-[#3D4C99] duration-200 hover:text-white cursor-pointer py-3 px-2 ${
						activeTabName === tab.code
							? 'bg-[#3D4C99] text-white'
							: 'bg-gray-100'
					}`}
				>
					{tab.name}
				</div>
			))}
		</>
	);
}

export default Tab;
