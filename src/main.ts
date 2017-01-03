import { GbMap } from "./app";

import "./style/style.scss";

document.addEventListener("DOMContentLoaded", () => new GbMap(document.getElementById("map")).init(), false);
