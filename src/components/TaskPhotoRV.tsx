export default function TaskPhotoReview() {
    return (
        <div
            style={{
                width: '800px',
                height: '300px',
                padding: '20px',
                margin: '0 auto',
                background: 'linear-gradient(to right, #c1dfc4,#deecdd)',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                border: '2px solid #ddd',
                marginTop: '15px',
                marginLeft: '500px'
            }}
        >




            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <img
                    src="https://via.placeholder.com/250x150" // Thay bằng URL ảnh đầu tiên
                    alt="Task Completion 1"
                    style={{
                        width: '220px',
                        height: '150px',
                        borderRadius: '8px',
                    }}
                />
                <img
                    src="https://via.placeholder.com/250x150" // Thay bằng URL ảnh thứ hai
                    alt="Task Completion 2"
                    style={{
                        width: '220px',
                        height: '150px',
                        borderRadius: '8px',
                    }}

                />

                <img
                    src="https://via.placeholder.com/250x150" // Thay bằng URL ảnh thứ hai
                    alt="Task Completion 3"
                    style={{
                        width: '220px',
                        height: '150px',
                        borderRadius: '8px',
                    }}

                />
            </div>

            {/* Khung review */}
            <div
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    width: '605px',
                    height: '98px',
                    margin: '0 auto',
                    marginTop: '15px'
                }}
            >
                <h2
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '10px',
                    }}
                >
                    Task Review
                </h2>
                <p
                    style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.6',
                    }}
                >
                    I have completed the task you assigned. Hope we will cooperate together in the following tasks.
                </p>
            </div>

        </div>
    );
}
