import { useEffect, useState } from 'react';
import { formatSlaCountdown } from '../../../shared/time';

type Props = { initialSeconds: number };

export const SLAClock = ({ initialSeconds }: Props) => {
	const [seconds, setSeconds] = useState(initialSeconds);
	useEffect(() => {
		if (seconds <= 0) return undefined;
		const id = setInterval(() => {
			setSeconds((s) => Math.max(0, s - 1));
		}, 1000);
		return () => clearInterval(id);
	}, [seconds]);
	const low = seconds > 0 && seconds < 5 * 60;
	return (
		<span className="ao-card-op__sla" data-low={low ? '1' : '0'}>
			{formatSlaCountdown(seconds)}
		</span>
	);
};
