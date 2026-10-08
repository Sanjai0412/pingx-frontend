import { useEffect, useState } from "react";
import "./Announcement.css"

const Announcement = ({ UPDATE_KEY }) => {
    const [showUpdate, setShowUpdate] = useState(false);

    const handleClose = () => {
        localStorage.setItem(UPDATE_KEY, "true");
        setShowUpdate(false);
    };

    useEffect(() => {
        const alreadyShown = localStorage.getItem(UPDATE_KEY);

        if (!alreadyShown) {
            setShowUpdate(true);
        }
    }, []);
    return (
        <div>
            {showUpdate && (
                <div className="announcement-container">
                    <div className="announcement-body">
                        <h1 className="announcement-header">
                            What's new?
                        </h1>

                        <h2 className="announcement-sub-header">
                            Comment actions are unlocked
                        </h2>

                        <p className="announcement-content">
                            You can now like, reply, and interact with comments.
                        </p>

                        <button onClick={handleClose}>
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Announcement;