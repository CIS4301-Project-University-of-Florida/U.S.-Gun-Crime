// Environment variable autocomplete suggestions:
// https://medium.com/javascript-in-plain-english/how-to-get-typescript-type-completion-by-defining-process-env-types-6a5869174f57
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    HOST: string;
    PORT: string;
    ORCL_USERNAME: string;
    ORCL_PASSWORD: string;
    ORCL_CONNECT: string;
    USE_MOCK_DB: string;
  }
}
