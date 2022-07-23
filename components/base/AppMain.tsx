import React from "react";
import dynamic from "next/dynamic";
import { fetchGithubRepos } from "../../data/remote";
import { fetchGithubProfile } from "../../data/remote/repos";
import type { GithubProfile, GithubRepos } from "../../domain/github";

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
        className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
      >
        <p>Say something nice about me</p>
        <article>
          <p>Something nice about you</p>
        </article>
      </section>
      <section id="projects" className="p-4 bg-gray-200 rounded h-96 w-full text-gray-600">
        <React.Suspense fallback={<h3>Loading...</h3>}>
          {loadingGithubInfo ? <h3>Loading...</h3> : <DynamicGithubRepoList repos={githubRepos} />}
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
