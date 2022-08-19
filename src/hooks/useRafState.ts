import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import useUnmount from '@/hooks/useUnmount';

const useRafState = <T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: T | ((prevState: T) => T)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
};

export default useRafState;
