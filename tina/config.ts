import { defineStaticConfig, LocalAuthProvider } from 'tinacms'

import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const config = defineStaticConfig({
    contentApiUrlOverride: '/api/gql',
    authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
    branch: 
        process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
        process.env.HEAD!, // Netlify branch env
    build: {
        publicFolder: 'public',
        outputFolder: 'admin',
    },
    schema: { collections: [ TinaUserCollection ] }
})

export default config
