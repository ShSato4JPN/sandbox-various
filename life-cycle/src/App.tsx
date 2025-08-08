import { useAtom } from "jotai";
import { useRef } from "react";
import "./App.css";
import { allAtom, allUpdateAtom } from "./store";

function useFooAtomHook() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAll] = useAtom(allUpdateAtom);
  const [all] = useAtom(allAtom);

  return {
    all,
    setAll,
  };
}

function App() {

  return (
    <>
    </>
}

