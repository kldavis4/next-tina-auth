import { defineStaticConfig, LocalAuthProvider } from 'tinacms'

import {
  TinaUserCollection,
  DefaultAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const discordTinaUserCollection = {
    ...TinaUserCollection,
    fields: [
      {
          ...TinaUserCollection.fields[0],
          ui: {
              defaultItem: {
                  name: 'New User',
                  email: ''
              },
              itemProps: (item) => ({ label: `${item?.name} - ${item?.email}` })
          },
          fields: [
            {
              type: 'string',
              label: 'Name',
              name: 'name',
            },
            {
              type: 'string',
              label: 'Email',
              name: 'email',
              uid: true,
              required: true,
            },
          ]
      }
    ]


}

const config = defineStaticConfig({
    contentApiUrlOverride: '/api/gql',
    authProvider: isLocal ? new LocalAuthProvider() : new DefaultAuthJSProvider(),
    branch: 
        process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
        process.env.HEAD!, // Netlify branch env
    build: {
        publicFolder: 'public',
        outputFolder: 'admin',
    },
    schema: { collections: [ discordTinaUserCollection ] }
})

export default config
