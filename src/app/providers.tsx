'use client'

import { NextUIProvider } from '@nextui-org/react'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks'
import './utils/autoselect.css'

const searchClient = algoliasearch(
  'latency',
  'a4390aa69f26de2fd0c4209ff113a4f9'
)

const INDEX_NAME = 'autocomplete_twitter_accounts'

export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch searchClient = {searchClient} indexName={INDEX_NAME}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </InstantSearch>
  )
}
