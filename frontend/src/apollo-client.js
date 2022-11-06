import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/yoshisada/erc721p-erc721c",
    cache: new InMemoryCache(),
});

export default client;