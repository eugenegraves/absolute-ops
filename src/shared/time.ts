export const formatSlaCountdown = (seconds: number): string => {
	if (seconds <= 0) return '00:00:00';
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export const formatRelative = (iso: string, now = '2026-04-25T13:00:00Z'): string => {
	const diffMs = new Date(iso).getTime() - new Date(now).getTime();
	const diffMin = Math.round(diffMs / 60_000);
	if (Math.abs(diffMin) < 1) return 'just now';
	if (diffMin > 0) {
		if (diffMin < 60) return `in ${diffMin} min`;
		const h = Math.round(diffMin / 60);
		return `in ${h}h`;
	}
	const ago = -diffMin;
	if (ago < 60) return `${ago} min ago`;
	const h = Math.round(ago / 60);
	if (h < 24) return `${h}h ago`;
	const d = Math.round(h / 24);
	return `${d}d ago`;
};

export const formatHHMM = (iso: string): string => {
	const d = new Date(iso);
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
};
