import useWindowSize from '@/hooks/useWindowSize';

const useIsMobile = () => {
  const windowSize = useWindowSize();

  return windowSize.width < 767.8;
};

export default useIsMobile;
