import { useEffect } from "react";

import { useRafState } from "@/hooks/useRafState";
import { off, on } from "@/lib/listener";

const isBrowser = typeof window !== "undefined";

export function useWindowSize(
	initialWidth = Infinity,
	initialHeight = Infinity,
) {
	const [state, setState] = useRafState<{ width: number; height: number }>({
		height: isBrowser ? window.innerHeight : initialHeight,
		width: isBrowser ? window.innerWidth : initialWidth,
	});

	useEffect((): (() => void) | void => {
		if (!isBrowser) {
			return;
		}

		const handler = () => {
			setState({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};

		on(window, "resize", handler);

		// eslint-disable-next-line consistent-return
		return () => {
			off(window, "resize", handler);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state;
}
