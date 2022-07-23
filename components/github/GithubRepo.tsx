import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string;
  pushed_at: Date;
  repoUrl: string;
  openIssuesCount: number;
}

export default function GithubRepo(props: Props) {
  function humanizeDate(date: Date): string {
    return moment(date).locale("pt_br").format("DD  MMMM, YYYY");
  }

  return (
    <li className="bg-white shadow rounded py-2 px-4 w-full">
      <a href={props.repoUrl} rel="noreferrer" target="_blank">
        <div className="flex flex-col justify-start items-start">
          <p className="text-lg font-bold mb-2">
            <span className="mr-2 text-sm">
              <FontAwesomeIcon icon={faBookBookmark} />
            </span>
            <span>{props.name}</span>
          </p>
          <p className="text-sm">Atualizado em {humanizeDate(props.pushed_at)}</p>
          <p className="text-sm">Issues Abertos: {props.openIssuesCount}</p>
        </div>
      </a>
    </li>
  );
}
