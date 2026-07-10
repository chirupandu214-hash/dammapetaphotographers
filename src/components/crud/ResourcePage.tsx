import { useParams } from "react-router-dom";

export default function ResourcePage() {
  const { resource } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>{resource}</h2>
      <p>CRUD Page</p>
    </div>
  );
}
