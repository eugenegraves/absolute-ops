import type { IndustrySlug } from '../../../shared/types';

const INDUSTRIES: { slug: 'all' | IndustrySlug; label: string }[] = [
	{ label: 'All', slug: 'all' },
	{ label: 'Logistics', slug: 'logistics' },
	{ label: 'Healthcare', slug: 'healthcare' },
	{ label: 'Retail', slug: 'retail' },
	{ label: 'Field Services', slug: 'field-services' },
	{ label: 'Public Transit', slug: 'public-transit' },
	{ label: 'Sports Performance', slug: 'sports-performance' }
];

const PRIORITIES = ['All', 'Critical', 'High', 'Normal', 'Low'] as const;
type Priority = (typeof PRIORITIES)[number];

type Props = {
	industry: 'all' | IndustrySlug;
	priority: Priority;
	search: string;
	onIndustry: (next: 'all' | IndustrySlug) => void;
	onPriority: (next: Priority) => void;
	onSearch: (next: string) => void;
};

export const FilterBar = ({
	industry,
	priority,
	search,
	onIndustry,
	onPriority,
	onSearch
}: Props) => (
	<div className="ao-ws__filters">
		<input
			className="ao-ws__search"
			placeholder="Search ID, customer, team…"
			value={search}
			onChange={(event) => onSearch(event.target.value)}
		/>
		<div className="ao-ws__filter" role="tablist" aria-label="Industry">
			{INDUSTRIES.map((item) => (
				<button
					data-active={industry === item.slug ? '1' : '0'}
					key={item.slug}
					onClick={() => onIndustry(item.slug)}
					type="button"
				>
					{item.label}
				</button>
			))}
		</div>
		<div className="ao-ws__filter" role="tablist" aria-label="Priority">
			{PRIORITIES.map((p) => (
				<button
					data-active={priority === p ? '1' : '0'}
					key={p}
					onClick={() => onPriority(p)}
					type="button"
				>
					{p}
				</button>
			))}
		</div>
	</div>
);

export type { Priority };
