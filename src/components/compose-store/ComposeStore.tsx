import React, {ReactNode, JSXElementConstructor} from 'react';

declare interface IComposeStoreProps {
  wrappers: Array<{Provider: JSXElementConstructor<React.PropsWithChildren<any>>; store: unknown}>;
  Child: ReactNode;
}
const ComposeStore = ({wrappers, Child}: IComposeStoreProps): JSX.Element => (
  <>
    {wrappers.reduceRight(
      (Acc, {Provider, store}) => (
        <Provider value={store}>{Acc}</Provider>
      ),
      Child,
    )}
  </>
);

export default ComposeStore;
