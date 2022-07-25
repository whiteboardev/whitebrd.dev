import React from "react";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faHeartbeat } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string;
  description: string;
  pushed_at: Date;
  repoUrl: string;
  openIssuesCount: number;
}

export default function GithubRepo(props: Props) {
  function humanizeDate(date: Date): string {
    return moment(date).locale("pt_br").format("DD  MMMM, YYYY");
  }

  function getRepoLastPushedDateFromToday(): moment.Duration {
    const lastPushed = moment(props.pushed_at);
    const today = moment();
    return moment.duration(lastPushed.diff(today));
  }

  function wasRepoUpdatedLessThanAMonth(): boolean {
    const result = getRepoLastPushedDateFromToday();
    return result.asMonths() < 1;
  }

  function wasRepoUpdatedMoreThanAMonth(): boolean {
    const result = getRepoLastPushedDateFromToday();
    return result.asMonths() > 1;
  }

  function getRepoDescription(): string {
    if (props.description) {
      return _.trim(props.description, '30');
    }
    return "Sem descrição...";
  }

  const getRepoHealthColor = React.useCallback(
    function getCssClassesByLastUpdated() {
      if (wasRepoUpdatedLessThanAMonth()) {
        return "text-green-500";
      } else if (wasRepoUpdatedMoreThanAMonth()) {
        return "text-yellow-500";
      }
    },
    [props.pushed_at]
  );

  return (
    <li className="bg-white shadow rounded py-2 px-4 w-full ">
      <a href={props.repoUrl} rel="noreferrer" target="_blank">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col justify-start items-start">
            <p className=" mb-2">
              <span className="mr-2 text-sm">
                <FontAwesomeIcon icon={faBookBookmark} />
              </span>
              <span className="text-lg font-bold">{props.name}</span>
              <span className="block text-sm mt-2">{getRepoDescription()}</span>
            </p>
            <p className="text-sm">Atualizado em {humanizeDate(props.pushed_at)}</p>
            <p className="text-sm">Issues Abertos: {props.openIssuesCount}</p>
          </div>
          <FontAwesomeIcon className={`${getRepoHealthColor()} mt-1 animate-pulse`} icon={faHeartbeat} size="lg" />
        </div>
      </a>
    </li>
  );
}
