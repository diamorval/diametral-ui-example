import mark from "diametral-ds/assets/diametral-mark.svg"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import "./index.css"
import { App } from "./App"

document.querySelector<HTMLLinkElement>("link[rel=icon]")!.href = mark

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
