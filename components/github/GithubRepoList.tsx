import React from "react";
import { GithubRepos } from "../../domain/github";
import GithubRepo from "./GithubRepo";

interface Props {
  repos: GithubRepos[];
}

export default function GithubRepoList(props: Props) {
  return (
    <ul className="flex flex-col md:flex-row justify-start items-start w-full space-y-2 md:space-y-0 md:space-x-2">
      {props.repos.map((repo) => (
        <GithubRepo
          key={repo.id}
          name={repo.name}
          pushed_at={repo.pushed_at}
          repoUrl={repo.html_url}
          openIssuesCount={repo.open_issues_count}
        />
      ))}
    </ul>
  );
}
