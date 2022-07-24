import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { fetchGithubRepos } from "../../data/remote";
import { fetchGithubProfile } from "../../data/remote/repos";
import type { GithubProfile, GithubRepos } from "../../domain/github";
import AppLoading from "./AppLoading";

const DynamicGithubRepoList = dynamic(() => import("../github/GithubRepoList"), {
  suspense: true,
  ssr: false,
});

export const AppMain: React.FC = () => {
  const [loadingGithubInfo, setLoadingGithubInfo] = React.useState<boolean>(true);
  const [githubUser, setGithubUser] = React.useState<GithubProfile>();
  const [githubRepos, setGithubRepos] = React.useState<GithubRepos[]>([]);

  async function loadGithubInformation(): Promise<void> {
    setLoadingGithubInfo(true);
    const githubUser = await fetchGithubProfile();
    const githubRepos = await fetchGithubRepos(githubUser.repos_url);

    setGithubUser(githubUser);
    setGithubRepos(githubRepos);
    setLoadingGithubInfo(false);
  }

  React.useEffect(() => {
    loadGithubInformation();
  }, []);

  return (
    <main className="p-4 flex flex-col justify-start space-y-4 h-full items-start">
      <section
        id="about"
        className="p-4 bg-transparent rounded h-96 w-full flex flex-col justify-center items-center md:justify-start md:items-start text-gray-600"
      >
        <h1 className="text-6xl text-center md:text-left">Whiteboard Dev</h1>
        <article>
          <p>Something nice about you</p>
        </article>
      </section>
      <section id="projects" data-testid="projects" className="p-4 bg-gray-200 rounded min-h-full w-full text-gray-600">
        <div className="flex justify-start items-center space-x-2 mb-4">
          <FontAwesomeIcon icon={faGithub} size="xl" />
          <h3 id="projects-title" data-testid="projects-title" className="text-2xl font-semibold">
            Whiteboard Repos
          </h3>
        </div>
        <React.Suspense fallback={<AppLoading id="loading-projects" />}>
          {loadingGithubInfo ? (
            <div className="h-24 flex justify-center items-center">
              <AppLoading id="loading-projects" />
            </div>
          ) : (
            <DynamicGithubRepoList repos={githubRepos} />
          )}
        </React.Suspense>
      </section>
      <section
        id="feed"
        className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
      >
        <p>Display your feed</p>
      </section>
      <section
        id="contact"
        className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
      >
        <p>Ways of contact You</p>
      </section>
    </main>
  );
};

export default AppMain;
