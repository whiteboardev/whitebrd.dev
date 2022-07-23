import React from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import AppHeader from "../components/AppHeader";
import AppMain from "../components/AppMain";
import { fetchGithubRepos } from "../data/remote";
import { fetchGithubProfile } from "../data/remote/repos";
import type { GithubProfile, GithubRepos } from "../domain/github";

interface Props {
  github: {
    user: GithubProfile;
    repos: GithubRepos[];
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props: Props) => {
  console.log(props);
  return (
    <>
      <AppHeader />
      <AppMain repos={props.github.repos} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const githubUser = await fetchGithubProfile();
  const githubRepos = await fetchGithubRepos(githubUser.repos_url);
  return {
    props: {
      github: {
        user: githubUser,
        repos: githubRepos,
      },
    },
  };
};

export default Home;
