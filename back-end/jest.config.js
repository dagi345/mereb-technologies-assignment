module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "CommonJS", // <— CommonJS so Node can require .ts
        },
      },
    ],
  },
  moduleNameMapper: {
    // point the JS path to the TS file
    "^(.*/workers/csvWorker)\\.js$": "$1.ts",
  },
};