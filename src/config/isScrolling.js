import { useEffect, useState } from "react";

const useScroll = ref => {
	const [scrolling, setScroll] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (node) {
			let scrollingTimeout;

			const handleScrollEnd = () => {
				setScroll(false);
			};

			const handleScroll = () => {
				setScroll(true);
				clearTimeout(scrollingTimeout);
				scrollingTimeout = setTimeout(() => handleScrollEnd(), 35);
			};

			ref.current.addEventListener("scroll", handleScroll, false);
			return () => {
				if (node) {
					node.removeEventListener("scroll", handleScroll, false);
				}
			};
		}
		return () => {};
	}, [ref]);

	return scrolling;
};

export default useScroll;
