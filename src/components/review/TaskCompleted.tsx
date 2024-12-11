'use client'

export default function TaskCompleted() {
    return (
        <div
            style={{

                display: 'flex',

                marginBottom: '25px',
                marginLeft: '60px',
            }}
        >
            <h1
                style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    background: 'bg-gray-200',
                    color: 'rgb(20 90 45)',
                    marginTop: '25px',

                }}
            >
                Task Completed!
            </h1>
        </div>
    );
}
