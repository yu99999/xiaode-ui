module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"    // 不分析类型声明文件
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom"  // 使用垫片对 jsdom 进行 polyfill
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTest.ts"  // 扩展库文件
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx",
    "json",
    "jsx",
    "node"
  ],
  "resetMocks": true    // 自动重置 mock 数据
}