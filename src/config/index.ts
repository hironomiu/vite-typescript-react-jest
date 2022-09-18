// TODO: Viteで.envを使う場合`import.meta.env.VITE_API_URL `で呼ぶがJestで「error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.」で怒られる
export const VITE_API_URL = 'http://127.0.0.1:4141'
