import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useSyncExternalStore,
} from 'react';

interface ClientLoadingProps extends PropsWithChildren {
  fallback?: ReactNode;
}

const Client: FC<ClientLoadingProps> = ({ fallback = null, children }) => {
  const isServer = useIsServer();
  if (isServer) return fallback;
  return children;
};

export default Client;

const useIsServer = () =>
  useSyncExternalStore(
    () => () => {},
    () => false,
    () => true,
  );
