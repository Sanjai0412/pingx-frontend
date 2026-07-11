import UserCard from "./UserCard";

const UserList = ({ userList, loading }) => {
    if (loading) {
        return <div className="search-loading">Searching users...</div>;
    }
    if (userList.length === 0) {
        return <div className="search-empty-state">No users found.</div>;
    }

    return (
        <div className="user-list-container">
            <ul className="user-list">
                {userList.map((user) => (
                    <li key={user._id}>
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;