import DiscordProvider from 'next-auth/providers/discord'
import { createAuthJSApiRoute, TinaAuthJSOptions } from 'tinacms-authjs'
import databaseClient from './__generated__/databaseClient'

export const AuthJsOptions = TinaAuthJSOptions({
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
})

export default createAuthJSApiRoute({
  authOptions: AuthJsOptions,
  disabled: process.env.TINA_PUBLIC_IS_LOCAL === 'true',
})
