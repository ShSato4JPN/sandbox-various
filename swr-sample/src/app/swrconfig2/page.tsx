import SwrConfig from "./SwrConfing";
import Test from "./Test";

async function getEntries() {
  const res = await fetch(`http://localhost:3000/api/pages?page=0`, {
    next: { revalidate: 60 * 60 },
  });

  return res.json();
}

async function Home(): Promise<JSX.Element> {
  const entries = await getEntries();

  console.log(entries);

  return (
    <SwrConfig fallbackData={entries}>
      <Test />
    </SwrConfig>
  );
}

export default Home;
