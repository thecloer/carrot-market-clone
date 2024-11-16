import { getSession } from '@/modules/auth/lib/server-only';

// TODO: just for checking the session login status.
export default async function ProfilePage() {
  const session = await getSession();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        {session.isLoggedIn ? (
          <span>Your user id is [ {session.payload.userId} ]</span>
        ) : (
          <span>You are not logged in.</span>
        )}
      </p>
    </div>
  );
}
