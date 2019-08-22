import { useState, useCallback } from "react";

export const useNodeRef = () => {
	const [node, setNode] = useState(null);

	const ref = useCallback(node => {
		setNode(node);
	}, []);
	return [node, ref];
};
