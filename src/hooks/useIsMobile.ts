import { useWindowSize } from "@/hooks/useWindowSize";

export function useIsMobile() {
	const windowSize = useWindowSize();

	return windowSize.width < 767.8;
}
