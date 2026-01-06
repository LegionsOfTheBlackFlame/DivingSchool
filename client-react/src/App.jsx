import Page from "./components/page.jsx"; 

export default function App() {
  const page = {
    id: 1,
    sections: []
  } // temporary mock

  return (
    <div>
      <Page page={page} />
    </div>
  )
}
