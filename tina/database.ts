import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { MongodbLevel } from '@kldavis4/mongodb-level'
import { GitHubProvider } from 'tinacms-gitprovider-github'

import { Redis } from "@upstash/redis";
import { RedisLevel } from "upstash-redis-level";

const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main")

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'
const redisUrl = process.env.KV_REST_API_URL
const redisToken = process.env.KV_REST_API_TOKEN

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
//      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
//        collectionName: process.env.GITHUB_BRANCH,
//        dbName: 'tinacms',
//        mongoUri: process.env.MONGODB_URI,
//      }),
      namespace: branch,
      databaseAdapter: new RedisLevel({
        redis: new Redis({
          url: redisUrl,
          token: redisToken,
        }),
      debug: process.env.DEBUG === "true" || false,
    }),
    })

