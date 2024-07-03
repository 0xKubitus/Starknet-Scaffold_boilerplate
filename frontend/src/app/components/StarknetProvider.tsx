"use client";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  alchemyProvider,
  argent,
  braavos,
  infuraProvider,
  lavaProvider,
  nethermindProvider,
  reddioProvider,
  StarknetConfig,
  starkscan,
  voyager,
  useInjectedConnectors,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

interface StarknetProviderProps {
  children: React.ReactNode;
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  //? I'M NOT SURE IF IT IS MANDATORY TO PROVIDE
  //? A VALUE FOR THE 2 BELOW ENVIRONMENT VARIABLES?
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const nodeProvider = process.env.NEXT_PUBLIC_PROVIDER!;

  let provider;
  if (nodeProvider == "infura") {
    provider = infuraProvider({ apiKey });
  } else if (nodeProvider == "alchemy") {
    provider = alchemyProvider({ apiKey });
  } else if (nodeProvider == "lava") {
    provider = lavaProvider({ apiKey });
  } else if (nodeProvider == "nethermind") {
    provider = nethermindProvider({ apiKey });
  } else {
    provider = reddioProvider({ apiKey });
  }

  return (
    <StarknetConfig
      connectors={connectors}
      // chains={[mainnet, sepolia]} //? let's only use sepolia for now
      chains={[sepolia]}
      provider={provider}
      // provider={publicProvider()} //? <- this is how the provider is configured by default in Starknet React (rather than all the above)
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
