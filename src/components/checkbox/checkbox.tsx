import { Form } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import '../../pages/sign-up/sign-up.scss'

interface CheckBoxProps {
  input: any;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}


export const CheckBox: React.FC<CheckBoxProps> = ({input, setInput}) => {
	const onChange = (e: CheckboxChangeEvent) => {
		setInput({
			...input,
			trust: e.target.checked,
		});
	};
	return (
		<Form.Item>
			<Checkbox onChange={onChange}>Trusted device</Checkbox>
		</Form.Item>
	);
};
