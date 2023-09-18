import logo from '../../assets/logo.svg';
import { ChangeEvent, useState } from 'react';
import { Button, Input, Space } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { InputProps } from './sign-up.types';
import { api } from '../../api';
import generateUniqueId from '../../utils/generateUniqueId';

export default function SignUp() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [input, setInput] = useState<InputProps>({
		name: '',
		phone: '',
		password: '',
    checkPassword: '',
		uid: '',
	});

	const onChange = (e: CheckboxChangeEvent) => {
		console.log(`checked = ${e.target.checked}`);
    const uniqueId = generateUniqueId()

    if(e.target.checked){
      setInput({
        ...input,
        uid: uniqueId,
      } as InputProps);
    }
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInput({
			...input,
			[name]: value,
		} as InputProps);
	};

  const handleSubmit = async() => {
    console.log(input)
    const { name, phone, password, uid } = input;

    if(password !== input.checkPassword) {
      return alert('Password is not match')
    }

    const response = await api.post(
      '/customer/register',
      {
        name,
        phone,
        password,
        uid
      }
    )
    console.log(response)
    response.status === 200 && localStorage.setItem('uid', uid)

    
  }

	return (
		<div className='w-1/2'>
			<div className='flex flex-col justify-center items-center h-screen'>
				<div>
					<img src={logo} alt='' />
				</div>
				<h2 className=' text-lg font-medium'>Sign Up</h2>
				<form>
					<div>
						<label>Name</label>
						<Input
							onChange={handleInput}
							name='name'
							placeholder='Enter your name'
						/>
					</div>
					<div>
						<label>Phone</label>
						<Input
							onChange={handleInput}
							name='phone'
							placeholder='Enter your phone'
						/>
					</div>
					<div>
						<Space direction='horizontal'>
							<label>Password</label>
							<Input.Password
								placeholder='Enter your password'
								name='password'
								onChange={handleInput}
								visibilityToggle={{
									visible: passwordVisible,
									onVisibleChange: setPasswordVisible,
								}}
							/>
						</Space>
					</div>
					<div>
						<Space direction='horizontal'>
							<label>Password</label>
							<Input.Password
								name='checkPassword'
								onChange={handleInput}
								placeholder='Enter your password'
								visibilityToggle={{
									visible: passwordVisible,
									onVisibleChange: setPasswordVisible,
								}}
							/>
						</Space>
					</div>
					<div>
						<Checkbox name='uid' onChange={onChange}>
							UID
						</Checkbox>
					</div>
				</form>
				<Button className='bg-white text-blue-600 px-4 py-2 rounded-md mt-4' onClick={handleSubmit}>
					Create account
				</Button>
			</div>
		</div>
	);
}
