import { useEffect } from 'react';

import useRafState from '@/hooks/useRafState';
import { off, on } from '@/lib/listener';

const isBrowser = typeof window !== 'undefined';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    if (!isBrowser) {
      return;
    }

    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    on(window, 'resize', handler);

    // eslint-disable-next-line consistent-return
    return () => {
      off(window, 'resize', handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useWindowSize;
