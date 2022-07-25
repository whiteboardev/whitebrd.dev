import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: string;
}

export default function AppLoading(props: Props) {
  return <FontAwesomeIcon id={props.id} icon={faEllipsisH} className="tex-gray-600 text-2xl animate-pulse" />;
}
