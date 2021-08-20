import * as React from 'react';
import { IProvider, ProviderProps } from '../types';

interface CombineProvidersProps extends ProviderProps {
  providers: Array<IProvider>;
}

/**
 *
 * Component which take a list of providers and returns
 * a Provider which contain all those providers nested in it
 */
const CombineProviders: React.FC<CombineProvidersProps> = ({
  children,
  providers,
}: CombineProvidersProps) => {
  if (providers.length === 0) return <>{children}</>;

  // Nesting all providers to form a RootProvider
  const RootProvider = providers.reduce((ProviderAccumulator, Provider) => {
    return ({ children }: ProviderProps) => (
      <ProviderAccumulator>
        <Provider>{children}</Provider>
      </ProviderAccumulator>
    );
  });

  return <RootProvider>{children}</RootProvider>;
};

export default CombineProviders;
