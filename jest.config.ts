import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  moduleNameMapper: {
    // Map anything that starts with "@/app/" to "<rootDir>/src/app/"
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    // If you also have a general "@/" -> "src/" path:
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(customJestConfig);
