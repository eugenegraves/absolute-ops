import { useMemo, useState } from 'react';
import { PRIMARY_NAV } from '../../../shared/nav';
import type {
	AuditEvent,
	IndustrySlug,
	Operation,
	OperationStatus
} from '../../../shared/types';
import { ActivityFeed } from '../components/ActivityFeed';
import { FilterBar, type Priority } from '../components/FilterBar';
import { Inspector } from '../components/Inspector';
import { QueueColumn } from '../components/QueueColumn';
import { TourFooter } from '../components/TourFooter';

type Props = {
	cssPath: string;
	initialOperations: Operation[];
	initialAudit: AuditEvent[];
};

const COLUMNS: OperationStatus[] = [
	'New',
	'Assigned',
	'In Progress',
	'At Risk',
	'Completed'
];

export const Workspace = ({ cssPath, initialOperations, initialAudit }: Props) => {
	const [operations, setOperations] = useState(initialOperations);
	const [audit, setAudit] = useState(initialAudit);
	const [industry, setIndustry] = useState<'all' | IndustrySlug>('all');
	const [priority, setPriority] = useState<Priority>('All');
	const [search, setSearch] = useState('');

	const filtered = useMemo(
		() =>
			operations.filter((op) => {
				if (industry !== 'all' && op.industry !== industry) return false;
				if (priority !== 'All' && op.priority !== priority) return false;
				if (!search) return true;
				const needle = search.toLowerCase();
				return (
					op.id.toLowerCase().includes(needle) ||
					op.customer.toLowerCase().includes(needle) ||
					op.assignedTo.toLowerCase().includes(needle) ||
					op.team.toLowerCase().includes(needle)
				);
			}),
		[operations, industry, priority, search]
	);

	const counts = useMemo(() => {
		const out = new Map<OperationStatus, Operation[]>();
		for (const status of COLUMNS) out.set(status, []);
		for (const op of filtered) {
			const list = out.get(op.status);
			if (list) list.push(op);
		}
		return out;
	}, [filtered]);

	const move = async (id: string, action: 'dispatch' | 'advance' | 'complete') => {
		setOperations((prev) =>
			prev.map((op) => {
				if (op.id !== id) return op;
				const next: OperationStatus =
					action === 'dispatch'
						? 'Assigned'
						: action === 'advance'
							? 'In Progress'
							: 'Completed';
				return { ...op, status: next };
			})
		);
		setAudit((prev) => [
			{
				action: action === 'complete' ? 'Resolved operation' : `${action} from workspace`,
				actor: 'You',
				at: new Date().toISOString(),
				id: `live-${Date.now()}`,
				role: 'Dispatcher',
				severity: 'info',
				target: id
			},
			...prev
		]);
		try {
			await fetch('/workspace/api/transition', {
				body: JSON.stringify({ action, id }),
				headers: { 'content-type': 'application/json' },
				method: 'POST'
			});
		} catch {
			/* mock backend, fire-and-forget */
		}
	};

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>AbsoluteOps · Operator Workspace</title>
				<meta
					name="description"
					content="React operator workspace — kanban, queue, activity feed, dispatch actions."
				/>
				<link rel="icon" href="/assets/ico/favicon.ico" />
				<link rel="stylesheet" href={cssPath} />
			</head>
			<body>
				<div className="ao-shell ao-ws">
					<nav className="ao-topnav">
						<a className="ao-brand" href="/">
							<span className="ao-brand-mark" />
							<span>AbsoluteOps</span>
						</a>
						<div className="ao-nav">
							{PRIMARY_NAV.map((item) => (
								<a
									key={item.routeKey}
									href={item.href}
									data-framework={item.framework}
									aria-current={item.routeKey === 'workspace' ? 'page' : undefined}
								>
									<span className="ao-nav__chip" aria-hidden="true" />
									{item.label}
								</a>
							))}
						</div>
					</nav>

					<header className="ao-ws__head">
						<span className="ao-fw-pill" data-framework="react"><span className="ao-fw-pill__dot" aria-hidden="true" />React · SSR + hydrate</span>
						<h1>Operator Workspace</h1>
						<p style={{ color: 'var(--fg-muted)' }}>
							Live kanban for the dispatch desk. Filter by industry and priority, search any
							operation, and move work through the pipeline. Cards highlight when at risk.
						</p>
						<FilterBar
							industry={industry}
							priority={priority}
							search={search}
							onIndustry={setIndustry}
							onPriority={setPriority}
							onSearch={setSearch}
						/>
					</header>

					<div className="ao-ws__layout">
						<div className="ao-ws__board">
							{COLUMNS.map((status) => (
								<QueueColumn
									items={counts.get(status) ?? []}
									key={status}
									onAdvance={(id) => move(id, 'advance')}
									onComplete={(id) => move(id, 'complete')}
									onDispatch={(id) => move(id, 'dispatch')}
									title={status}
								/>
							))}
						</div>
						<ActivityFeed events={audit} />
					</div>
				</div>
				<TourFooter routeKey="workspace" />
				<Inspector routeKey="workspace" />
			</body>
		</html>
	);
};

export default Workspace;
