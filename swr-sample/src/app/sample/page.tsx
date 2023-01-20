import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default async function Home() {
  const data = await fetch("http://localhost:3001/api/post").then((res) =>
    res.json()
  );

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
