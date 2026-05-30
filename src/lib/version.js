import packageInfo from '../../package.json'

const commitRef = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? 'dev'

export const appVersion = packageInfo.version
export const buildVersion = commitRef === 'dev' ? 'dev' : commitRef.slice(0, 7)
