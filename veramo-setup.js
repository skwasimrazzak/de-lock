const { createAgent } = require('@veramo/core')
const { DIDManager } = require('@veramo/did-manager')
const { KeyManager } = require('@veramo/key-manager')
const { KeyManagementSystem } = require('@veramo/kms-local')
const { DIDResolverPlugin } = require('@veramo/did-resolver')
const { Resolver } = require('did-resolver')
const { getResolver } = require('ethr-did-resolver')

const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new KeyManagementSystem(),
    }),
    new DIDManager({
      store: new KeyManagementSystem(),
      defaultProvider: 'did:ethr',
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...getResolver(),
      }),
    }),
  ],
})

module.exports = agent
