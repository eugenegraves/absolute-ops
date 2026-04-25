import type { AuditEvent } from '../../../shared/types';
import { formatRelative } from '../../../shared/time';

const sevPill: Record<AuditEvent['severity'], string> = {
	crit: 'ao-pill ao-pill--crit',
	info: 'ao-pill ao-pill--info',
	warn: 'ao-pill ao-pill--warn'
};

export const ActivityFeed = ({ events }: { events: AuditEvent[] }) => (
	<aside className="ao-feed">
		<div className="ao-feed__head">
			<div>
				<div className="ao-feed__title">Activity</div>
				<div className="ao-feed__sub">Live audit feed (mock)</div>
			</div>
			<span className={sevPill.info}>updated · just now</span>
		</div>
		<div className="ao-feed__list">
			{events.slice(0, 8).map((event) => (
				<div className="ao-feed__item" key={event.id}>
					<div className="ao-feed__row">
						<span className={sevPill[event.severity]}>{event.role}</span>
						<span className="ao-feed__actor">{event.actor}</span>
					</div>
					<div className="ao-feed__action">{event.action}</div>
					<div className="ao-feed__meta">
						{event.target} · {formatRelative(event.at)}
					</div>
				</div>
			))}
		</div>
	</aside>
);
