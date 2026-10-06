export const FeedFooter = ({ ref, isFetchingNextPage }) => {
    return <div ref={ref} style={{ height: "3px" }}>
        {isFetchingNextPage && <p>Loading more...</p>}
    </div>
}