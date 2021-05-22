import fetch from "isomorphic-unfetch";

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.Username}</h1>
      <img src={`${user.ProfilePic}`} alt={`${user.Username}`} />
      <p>{user.Description}</p>
    </div>
  );
};

export default function Profile({ profile }) {
  return (
    <>
      {profile
        ? profile.data.ProfilesFound.map((user) => (
            <User key={user.PublicKeyBase58Check} user={user} />
          ))
        : "No user found"}
    </>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.params;
  const req = await fetch(`/api/profile/${username}`, {
    method: "POST",
  });
  const profile = await req.json();

  return {
    props: {
      profile,
    },
  };
}
