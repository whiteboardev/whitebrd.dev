import type {GithubProfile, GithubRepos} from "../../domain/github"
import type {EnvConfig} from '../../domain/env'


export async function fetchGithubProfile(): Promise<GithubProfile> {
    const request = createGithubProfileRequest()
    const rawResponse = await fetch(request);
    return rawResponse.json()
}

export async function fetchGithubRepos(githubUserReposUrl: string): Promise<GithubRepos> {
    const myReposResponse = await fetch(githubUserReposUrl);
    return myReposResponse.json()
}

function getEnvironmentConfig(): EnvConfig {
    return {
        github: {
            url: process.env.GITHUB_API_URL as string,
            token: process.env.GITHUB_API_TOKEN as string,
            username: process.env.GITHUB_USERNAME as string
        }
    }
}

function createUrl(baseUrl: string): URL {
    return new URL(baseUrl)
}

function createGithubProfileRequest(): Request {
    const config = getEnvironmentConfig()
    const url = createUrl(config.github.url)
    const headers = createGithubRequestHeaders(config.github.token)
    url.pathname = `/users/${config.github.username}`
    return new Request(url, {
        headers
    })
}

function createGithubRequestHeaders(token: string): Headers {
    const headers = new Headers()
    headers.append('Authorization', token)
    return headers
}