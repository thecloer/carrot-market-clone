import { getSession } from '@/modules/auth/lib/server-only';

// TODO: just for checking the session login status.
export default async function ProfilePage() {
  const session = await getSession();
  const sessionPayload = session.getPayload();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        {sessionPayload == null ? (
          <span>You are not logged in.</span>
        ) : (
          <span>Your user id is [ {sessionPayload.userId} ]</span>
        )}
      </p>
    </div>
  );
}
