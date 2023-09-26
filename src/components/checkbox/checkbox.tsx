import { Form } from 'antd';
import Checkbox from 'antd/es/checkbox';
import '../../pages/sign-up/sign-up.scss'


export const CheckBox = () => {

	return (
		<Form.Item  valuePropName="checked" name="trust">
			<Checkbox >Trusted device</Checkbox>
		</Form.Item>
	);
};
