import ProfileClientComp from "./components/ProfileClientComp";
import { fetchCurrentUser } from "../http/user.http";

export default async function ProfilePage() {
  const user = await fetchCurrentUser();
  return <ProfileClientComp user={user} />;
}
