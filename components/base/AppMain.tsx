import React from "react";
import dynamic from "next/dynamic";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {fetchGithubRepos} from "../../data/remote";
import {fetchGithubProfile} from "../../data/remote/repos";
import type {GithubProfile, GithubRepos} from "../../domain/github";
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
        <main className="p-4 flex flex-col justify-start space-y-8 min-h-screen h-auto items-start">
            {/* Find another way to format this code */}
            <code id="code-drop" className="text-transparent" hidden>
              {`function wait(value, seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, seconds * 1000)
  })
}

// Just to run the code.
wait("Hello World", 2).then(value => console.log(value))  
`}
            </code>
            <section
                id="about"
                className="p-4 mb-20 bg-transparent rounded h-96 w-full flex flex-col justify-start items-center md:justify-between md:flex-row md:items-start text-gray-600"
            >
                <article className="max-w-md">
                    <h1 className="text-4xl text-gray-800 text-center mb-4 md:text-left">Whiteboard Dev</h1>
                    <p className="text-center text-md mb-4 md:text-left"><strong>Hello, bem-vindo ao meu site</strong>,
                        e antes de mais nada, se você quer aprender ou
                        se aprofundar em software você achou o lugar certo.</p>
                    <p className="text-center text-md md:text-left">Pessoalmente sempre acreditei que conhecimento na
                        concentrado na cabeça de
                        uma pessoa só não é algo bom, por isso aquilo que eu aprendo eu também ensino! Este é um espaço
                        para você que está começando para você que já sabe e você que não sabe! </p>
                </article>
                <article className=" hidden bg-gray-200 p-4 rounded w-1/2 min-h-full overflow-auto text-gray-600 md:block">
                    <h3 className="text-2xl mb-4 font-semibold">
                        Snippet Da Semana
                    </h3>
                    <div id="code-display">
                    </div>
                </article>
            </section>
            <section id="projects" data-testid="projects"
                     className="p-4 bg-gray-200 rounded min-h-full w-full text-gray-600">
                <div className="flex justify-start items-center space-x-2 mb-4">
                    <FontAwesomeIcon icon={faGithub} size="xl"/>
                    <h3 id="projects-title" data-testid="projects-title" className="text-2xl font-semibold">
                        Whiteboard Repos
                    </h3>
                </div>
                <React.Suspense fallback={<AppLoading id="loading-projects"/>}>
                    {loadingGithubInfo ? (
                        <div className="h-24 flex justify-center items-center">
                            <AppLoading id="loading-projects"/>
                        </div>
                    ) : (
                        <DynamicGithubRepoList repos={githubRepos}/>
                    )}
                </React.Suspense>
            </section>
            <section
                id="feed"
                className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
            >
                {/* Instagram Feed */}
                <p>Ja ja, Uma nova Feature</p>
            </section>
            <section
                id="contact"
                className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
            >
                {/* Contact me form */}
                <p>Outra nova feature</p>
            </section>
        </main>
    );
};

export default AppMain;
