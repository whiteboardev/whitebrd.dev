import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faPatreon, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

const AppHeader: React.FC = () => {
  return (
    <header className="px-4 py-6 mb-4 w-full flex justify-between items-center">
      <Image alt="website logo" src="/images/logo.png" width={100} height={100} />
      <nav>
        <ul className="m-0 list-none flex justify-start items-center space-x-4">
          <li>
            <a
              className="flex justify-start items-center space-x-2"
              href="https://www.instagram.com/whiteboarddev/"
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
              <span className="hidden md:inline md:text-sm">Instagram</span>
            </a>
          </li>
          <li>
            <a
              className="flex justify-start items-center space-x-2"
              href="https://www.patreon.com/whiteboarddev"
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faPatreon} size="lg" />
              <span className="hidden md:inline md:text-sm">Patreon</span>
            </a>
          </li>
          <li>
            <a
              className="flex justify-start items-center space-x-2"
              href="https://www.youtube.com/channel/UCLxviggksYVTLzCS1TtEaYQ"
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" />
              <span className="hidden md:inline md:text-sm">Youtube</span>
            </a>
          </li>
          <li>
            <a
              className="flex justify-start items-center space-x-2"
              href="https://github.com/whiteboardev"
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <span className="hidden md:inline md:text-sm">Github</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
