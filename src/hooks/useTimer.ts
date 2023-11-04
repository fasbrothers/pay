import { useEffect, useState } from 'react';

export interface TimerState {
	minutes: number;
	seconds: number;
	setMinutes: (minutes: number) => void;
	setSeconds: (seconds: number) => void;
}

interface TimerOptions {
	initialSeconds: number;
}

const useTimer = ({ initialSeconds }: TimerOptions): TimerState => {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [minutes, setMinutes] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}

			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval);
				} else {
					setSeconds(59);
					setMinutes(minutes - 1);
				}
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [seconds, minutes]);

	return { minutes, seconds, setMinutes, setSeconds };
};

export default useTimer;
