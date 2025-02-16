import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";
import { PokeCard } from "./components/PokeCard";

function App() {
  return (
    <>
      <Header />
      <SideNav />
      <PokeCard />
    </>
  );
}

export default App;
