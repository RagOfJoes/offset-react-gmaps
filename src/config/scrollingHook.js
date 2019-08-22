import { useEffect, useState } from "react";

const useScroll = node => {
	const [scrolling, setScroll] = useState(false);
	useEffect(() => {
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
			node.addEventListener("scroll", handleScroll, false);
			return () => {
				if (node) {
					clearTimeout(scrollingTimeout);
					node.removeEventListener("scroll", handleScroll, false);
				}
			};
		} else {
			return () => {};
		}
	}, [node]);
	return scrolling;
};

export default useScroll;
