# vite-typescript-react-jest

vite + TypeScript + React

react-router-dom + Recoil + react-hook-form + zod + TanStack Query

Jest + testing-library

## Run

```
npm run dev
```

## Test

```
npm run test
```

## Install Memo

### Vite

```
npm create vite@latest .
npm install
```

### TailWind

[Install Tailwind CSS with Create React App](https://tailwindcss.com/docs/guides/create-react-app)

### react-router-dom

```
npm install react-router-dom
```

### Recoil

```
npm install recoil
```

### react-hook-form + Zod

```
npm install react-hook-form @hookform/resolvers zod
```

### Testing

#### Jest

`npx jest --init`で`jest.config.ts`が作成される（後から設定変更可能）

```
npm install --save-dev jest jsdom eslint-plugin-jest @types/jest @types/jsdom ts-jest jest-environment-jsdom
npx jest --init


✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Would you like to use Typescript for the configuration file? … yes
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … no
✔ Which provider should be used to instrument code for coverage? › babel
✔ Automatically clear mock calls, instances, contexts and results before every test? … no
```

```
touch tsconfig.jest.json
```

`tsconfig.jest.json`

```
{
  "extends": "./tsconfig.json"
}
```

`jest.config.ts`に以下を設定

```
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
```

TODO: jest が v29 に上がり以下のワーニングが出ている

```
ts-jest[ts-jest-transformer] (WARN) Define `ts-jest` config under `globals` is deprecated. Please do
transform: {
    <transform_regex>: ['ts-jest', { /* ts-jest config goes here in Jest */ }],
},
```

#### testing-library

```
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

#### ts-node

```
npm install --save-dev ts-node
```

#### babel

```
npm install --save-dev babel-jest @babel/preset-env @babel/preset-react
touch babel.config.js
```

`babel.config.js`

```
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
}
```

#### fetch

install 後テストコードに`import 'cross-fetch/polyfill'`で import する

```
npm install --save cross-fetch
```

#### MSW

```
npm install --save-dev msw
```

### TanStack Query

[Installation](https://tanstack.com/query/v4/docs/installation)

### CodeMirror

[GitHub](https://github.com/uiwjs/react-codemirror)

```
npm install @uiw/react-codemirror
npm install @codemirror/lang-sql
```

### React Icons

```
npm install react-icons
```
