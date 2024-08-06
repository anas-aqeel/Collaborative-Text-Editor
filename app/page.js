import { CollaborativeEditor } from "../components/CollaborativeEditor";
import { Room } from "./Room";

export default function Home() {
  return (
    <main>
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
