import { Form } from 'antd';
import Checkbox from 'antd/es/checkbox';
import '../../pages/sign-up/sign-up.scss';

export const CheckBox = ({
	title,
	name,
	style,
}: {
	title: string;
	name: string;
	style?: string;
}) => {
	return (
		<Form.Item className={style} valuePropName='checked' name={name}>
			<Checkbox>{title}</Checkbox>
		</Form.Item>
	);
};
