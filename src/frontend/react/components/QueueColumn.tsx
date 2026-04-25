import type { Operation, OperationStatus } from '../../../shared/types';
import { SLAClock } from './SLAClock';

type Action = (id: string) => void;

type Props = {
	title: OperationStatus;
	items: Operation[];
	onDispatch: Action;
	onAdvance: Action;
	onComplete: Action;
};

const nextActionFor = (status: OperationStatus) => {
	if (status === 'New') return 'Dispatch';
	if (status === 'Assigned') return 'Start';
	if (status === 'In Progress' || status === 'At Risk') return 'Complete';
	return null;
};

export const QueueColumn = ({
	title,
	items,
	onDispatch,
	onAdvance,
	onComplete
}: Props) => (
	<div className="ao-col">
		<div className="ao-col__head">
			<span className="ao-col__title">{title}</span>
			<span className="ao-col__count">{items.length}</span>
		</div>
		{items.map((op) => {
			const next = nextActionFor(op.status);
			const handleNext = () => {
				if (op.status === 'New') return onDispatch(op.id);
				if (op.status === 'Assigned') return onAdvance(op.id);
				return onComplete(op.id);
			};
			return (
				<div
					className="ao-card-op"
					data-risk={op.status === 'At Risk' ? '1' : '0'}
					key={op.id}
				>
					<div className="ao-card-op__row">
						<span className="ao-card-op__id">{op.id}</span>
						<SLAClock initialSeconds={op.slaSeconds} />
					</div>
					<div className="ao-card-op__customer">{op.customer}</div>
					<div className="ao-card-op__location">
						{op.location} · {op.team} · {op.assignedTo}
					</div>
					<div className="ao-card-op__row">
						<span className="ao-card-op__industry">{op.industryLabel}</span>
						<span className="ao-card-op__location">{op.priority}</span>
					</div>
					<div className="ao-card-op__actions">
						{next && (
							<button
								type="button"
								className="ao-card-op__btn"
								onClick={handleNext}
							>
								{next}
							</button>
						)}
						{op.status !== 'Completed' && (
							<button
								type="button"
								className="ao-card-op__btn ao-card-op__btn--ghost"
								onClick={() => onComplete(op.id)}
							>
								Resolve
							</button>
						)}
					</div>
				</div>
			);
		})}
		{items.length === 0 && (
			<div style={{ color: 'var(--fg-soft)', fontSize: 12, padding: 12 }}>
				Empty
			</div>
		)}
	</div>
);
