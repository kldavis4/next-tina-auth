import DiscordProvider from 'next-auth/providers/discord'

import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'

import { TinaAuthJSOptions, AuthJsBackendAuthentication } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
        databaseClient: databaseClient,
        debug: false,
        uidProp: 'email',
        secret: process.env.NEXTAUTH_SECRET,
        providers: [
          DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
          })
        ]
      }),
      }),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}