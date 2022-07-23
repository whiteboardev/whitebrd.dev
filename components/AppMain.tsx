import React from "react";
import { GithubRepos } from "../domain/github";

interface Props {
  repos: GithubRepos[];
}

export const AppMain: React.FC<Props> = (props: Props) => {
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
      <section
        id="projects"
        className="p-4 bg-gray-200 rounded h-96 w-full flex flex-col justify-center items-center text-gray-600"
      >
        <ul>
          {props.repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
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
