import { renderTourFooter } from '../../../backend/utils/renderTourFooter';
import type { RouteKey } from '../../../shared/types';

export const TourFooter = ({ routeKey }: { routeKey: RouteKey }) => {
	const html = renderTourFooter(routeKey);
	if (!html) return null;
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
