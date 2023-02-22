"use client";
import { Oval } from "react-loader-spinner";

export default function Home() {
  return (
    <>
      <Oval
        color="yellow"
        secondaryColor="tomato"
        strokeWidth={2}
        strokeWidthSecondary={2}
        visible={true}
        height={100}
        width={100}
      />
    </>
  );
}
