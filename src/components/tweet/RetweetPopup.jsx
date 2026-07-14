import { useState } from "react";
import { RetweetIcon, QuoteIcon } from "../Icons";

const RetweetPopup = ({ setShowRepostMenu, handleRepost, handleQuoteRepost, retweeted }) => {
    const [showQuoteInput, setShowQuoteInput] = useState(false);
    const [quoteContent, setQuoteContent] = useState("");

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        if (quoteContent.trim()) {
            handleQuoteRepost(quoteContent);
            setShowRepostMenu(false);
        }
    };

    return (
        <div className="retweet-modal-overlay" onClick={() => setShowRepostMenu(false)}>
            <div className="retweet-modal-content" onClick={(e) => e.stopPropagation()}>
                {!showQuoteInput ? (
                    <>
                        <button
                            className="retweet-modal-option"
                            onClick={() => {
                                handleRepost();
                                setShowRepostMenu(false);
                            }}
                        >
                            <RetweetIcon size={18} filled={retweeted} />
                            <span>{retweeted ? "Undo Repost" : "Repost"}</span>
                        </button>

                        <button
                            className="retweet-modal-option"
                            onClick={() => {
                                setShowQuoteInput(true);
                            }}
                        >
                            <QuoteIcon />
                            <span>Quote</span>
                        </button>
                    </>
                ) : (
                    <form className="quote-modal-form" onSubmit={handleQuoteSubmit}>
                        <div className="quote-modal-header">
                            <h3>Quote Tweet</h3>
                            <button
                                type="button"
                                className="quote-modal-back"
                                onClick={() => setShowQuoteInput(false)}
                            >
                                Back
                            </button>
                        </div>
                        <textarea
                            className="quote-modal-textarea"
                            placeholder="Add a comment..."
                            value={quoteContent}
                            onChange={(e) => setQuoteContent(e.target.value)}
                            rows={3}
                            autoFocus
                        />
                        <div className="quote-modal-footer">
                            <button
                                type="submit"
                                className="quote-modal-submit-btn"
                                disabled={!quoteContent.trim()}
                            >
                                Quote
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RetweetPopup;