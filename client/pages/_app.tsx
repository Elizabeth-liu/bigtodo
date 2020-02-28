import React from "react"
import App from "next/app"
import Head from "next/head"
import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "../hooks/withApollo"
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"
import 'antd/dist/antd.css'
import './normalize.css'
import './app.less'


// since "apollo" isn't a native Next.js prop we have to declare it's type.
interface IProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

// adds our custom props interface to the generic App base class.
class MyApp extends App<IProps> {
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider. 
    const { Component, pageProps, apollo } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </React.Fragment>
    )
  }
}

// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp)
