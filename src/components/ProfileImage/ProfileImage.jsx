function ProfileImage({ photoURL }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
      <img
        src={photoURL || "/default-avatar.png"}
        alt="User profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ProfileImage;
