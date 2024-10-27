export default function TaskCompleted() {
    return (
        <div
            style={{
                marginTop: '120px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <h1
                style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Task Completed!
            </h1>
        </div>
    );
}
