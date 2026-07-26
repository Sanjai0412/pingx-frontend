import { useState, useEffect } from "react";
import { searchUser, getSuggestedUsers } from "../services/userService";
import UserList from "../components/UserList";
import "./Search.css";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadSuggestedUsers = async () => {
        try {
            const data = await getSuggestedUsers();
            setSearchResults(data.data || []);
        } catch (err) {
            console.error("Failed to load suggested users:", err);
        }
    };
    useEffect(() => {
        loadSuggestedUsers();
    }, []);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (!query.trim()) {
            loadSuggestedUsers();
            return;
        }
        setLoading(true);
        try {
            const data = await searchUser(query);
            setSearchResults(data.data || []);
        } catch (err) {
            console.error("Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2 className="search-header">Search Users</h2>
            <div className="search-input-wrapper">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <UserList userList={searchResults} loading={loading} />
        </div>
    );
};

export default Search;