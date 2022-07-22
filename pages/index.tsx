import React from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <header className="flex justify-content-between items-center">
        <img alt="website logo" src="/some/source" />
        <nav>
          <ul className="m-0 list-none flex justify-start items-center">
            <li>Instagram</li>
            <li>Patreon</li>
            <li>Youtube</li>
            <li>Github</li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="about">
          <p>Say something nice about me</p>
          <article>
            <p>Something nice about you</p>
          </article>
        </section>
        <section id="projects">
          <p>Something related to your projects</p>
        </section>
        <section id="feed">
          <p>Display your feed</p>
        </section>
        <section id="contact">
          <p>Ways of contact You</p>
        </section>
      </main>
    </>
  );
};

export default Home;
