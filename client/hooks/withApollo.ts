import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"
 
export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: "http://127.0.0.1:4000/graphql/",
      cache: new InMemoryCache({addTypename: false}).restore(initialState || {})
    })
)