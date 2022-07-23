import type { GithubProfile, GithubRepos } from "../../domain/github";
import type { EnvConfig } from "../../domain/env";

export async function fetchGithubProfile(): Promise<GithubProfile> {
  const request = createGithubProfileRequest();
  const rawResponse = await fetch(request);
  return rawResponse.json();
}

export async function fetchGithubRepos(githubUserReposUrl: string): Promise<GithubRepos[]> {
  const myReposResponse = await fetch(githubUserReposUrl);
  return myReposResponse.json();
}

function getEnvironmentConfig(): EnvConfig {
  return {
    github: {
      url: process.env.NEXT_PUBLIC_GITHUB_API_URL as string,
      token: process.env.NEXT_PUBLIC_GITHUB_API_TOKEN as string,
      username: process.env.NEXT_PUBLIC_GITHUB_USERNAME as string,
    },
  };
}

function createGithubProfileRequest(): Request {
  const config = getEnvironmentConfig();
  const headers = createGithubRequestHeaders(config.github.token);
  const url = `${config.github.url}/users/${config.github.username}`;
  return new Request(url, {
    headers,
  });
}

function createGithubRequestHeaders(token: string): Headers {
  const headers = new Headers();
  headers.append("Authorization", token);
  return headers;
}
