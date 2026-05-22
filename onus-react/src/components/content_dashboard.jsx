function ContentDashboard() {
    return (
        <div className="content-dashboard">     
            <h3
            style={{
              color: "black",
              textAlign: "center",
              padding: "10px",
              fontSize: "20px",
              fontFamily: "Poppins",
            }}
            >
            Contribution Dashboard
            </h3>
            <p>Current Streak: 7 days</p>
            <p>Longest Streak: 14 days</p>
        </div>
    )
}

export default ContentDashboard;