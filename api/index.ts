import kodepos from "../controllers/kodepos";
import sekolah from "../controllers/sekolah";
import { isEmpty, realEscapeString } from "../helpers";

export default function handler(req: Request) {
  const currentUrl = new URL(req.url);
  let searchQuery: string = currentUrl.searchParams.get("q")?.toString() ?? "";
  searchQuery = realEscapeString(searchQuery)!;

  if (!isEmpty(searchQuery) && currentUrl.pathname == "/kodepos/search") {
    return kodepos(searchQuery);
  }

  if (!isEmpty(searchQuery) && currentUrl.pathname == "/sekolah/search") {
    return sekolah(searchQuery);
  }

  return Response.redirect("https://s.id/aurakomputer");
}
